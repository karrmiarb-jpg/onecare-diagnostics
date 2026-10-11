/* OneCare Diagnostics — reads a photo of a doctor's lab request and matches it to our test list.
   Needs ANTHROPIC_API_KEY set in Vercel → Settings → Environment Variables.
   The photo is sent to Claude to be read and is not stored anywhere. */
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const MAX_IMAGE_CHARS = 4_000_000; // base64 length; the page shrinks photos well below this
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const client = new Anthropic();

const SYSTEM = `You read photos of doctors' laboratory request forms for a clinical laboratory in Dumanjug, Cebu, Philippines.
Doctors' handwriting is often hard to read and they use abbreviations (for example CBC, FBS, RBS, BUA, Crea, SGPT, SGOT, Chole, TG, HbA1c, U/A, F/A, HBsAg, PT test).
Match what is written to the lab's test list you are given. Only use ids from that list.
- Put a test in "found" only if you can actually see it written on the request. Set "sure" to false when the handwriting is unclear or you are guessing between similar tests.
- If the request names a package's tests, you may match the individual tests; do not invent a package that is not written.
- Put anything written as a test request that you cannot read, or that is not on the list, in "unclear" as a short note in plain English (for example "one word after CBC, unreadable" or "Thyroid test (not on our list)").
- Ignore patient names, addresses, signatures, license numbers and diagnoses. Never repeat personal details in your answer.
- If the photo is not a lab request or is too blurry to read, set "readable" to false and leave "found" empty.`;

function schemaFor(ids) {
  return {
    type: "object",
    additionalProperties: false,
    required: ["readable", "found", "unclear"],
    properties: {
      readable: { type: "boolean" },
      found: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "written_as", "sure"],
          properties: {
            id: { type: "string", enum: ids },
            written_as: { type: "string" },
            sure: { type: "boolean" }
          }
        }
      },
      unclear: { type: "array", items: { type: "string" } }
    }
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: "not_configured" });

  const { image, mediaType, tests } = req.body || {};
  if (typeof image !== "string" || !image || image.length > MAX_IMAGE_CHARS) return res.status(400).json({ error: "image" });
  if (!IMAGE_TYPES.includes(mediaType)) return res.status(400).json({ error: "image_type" });
  if (!Array.isArray(tests) || !tests.length || tests.length > 200) return res.status(400).json({ error: "tests" });

  const list = tests
    .filter(t => t && typeof t.id === "string" && typeof t.name === "string")
    .map(t => ({ id: t.id.slice(0, 40), name: t.name.slice(0, 120) }));
  const ids = list.map(t => t.id);

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4000,
      ...(MODEL.includes("haiku") ? {} : { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" }),
      system: SYSTEM,
      output_config: { effort: "low", format: { type: "json_schema", schema: schemaFor(ids) } },
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: image } },
          { type: "text", text: "Lab test list (id: name):\n" + list.map(t => `${t.id}: ${t.name}`).join("\n") + "\n\nWhich of these tests does this request ask for?" }
        ]
      }]
    });

    if (response.stop_reason === "refusal") return res.status(200).json({ readable: false, found: [], unclear: [] });

    const text = response.content.filter(b => b.type === "text").map(b => b.text).join("");
    const out = JSON.parse(text);
    const valid = new Set(ids);
    const seen = new Set();
    out.found = (out.found || []).filter(f => valid.has(f.id) && !seen.has(f.id) && seen.add(f.id));
    return res.status(200).json(out);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(429).json({ error: "busy" });
    if (err instanceof Anthropic.APIError) {
      console.error("Claude API error", err.status, err.message);
      return res.status(502).json({ error: "read_failed" });
    }
    console.error("read-request failed", err);
    return res.status(500).json({ error: "read_failed" });
  }
}
