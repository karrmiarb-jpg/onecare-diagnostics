/* OneCare Diagnostics — suggests lab tests from what a patient says they feel.
   Uses the same ANTHROPIC_API_KEY as read-request.js. Nothing the patient types is stored.
   The page falls back to its built-in word list if this is unavailable. */
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const client = new Anthropic();

const SYSTEM = `You help patients of a small clinical laboratory in Dumanjug, Cebu, Philippines find which of the lab's tests a doctor might commonly ask for, based on what they say they feel.
Patients write in English, Cebuano/Bisaya, Tagalog or a mix, often with typos and informal words. Understand their meaning.
Rules:
- Only suggest tests from the list you are given, using their exact names. Suggest at most 5, most relevant first. Suggest none if no test on the list fits.
- You are not diagnosing. Never name a disease the person has; describe what the test checks for in plain words (for example "checks for signs of infection").
- Write each reason as one short, simple sentence in the requested language (en = English, ceb = Cebuano/Bisaya). Use simple words a farmer or grandparent would understand.
- Set "urgent" to true for signs that need a doctor or hospital now: chest pain, trouble breathing, fainting, seizures, vomiting or coughing blood, heavy bleeding, signs of stroke, severe pain, dengue warning signs (bleeding gums, severe stomach pain, vomiting non-stop, very weak), very high fever in a baby, or thoughts of self-harm.
- If the message is not about health or feelings, return no suggestions.`;

function schemaFor(names) {
  return {
    type: "object",
    additionalProperties: false,
    required: ["urgent", "suggestions"],
    properties: {
      urgent: { type: "boolean" },
      suggestions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["name", "reason"],
          properties: {
            name: { type: "string", enum: names },
            reason: { type: "string" }
          }
        }
      }
    }
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: "not_configured" });

  const { text, lang, tests } = req.body || {};
  if (typeof text !== "string" || !text.trim() || text.length > 500) return res.status(400).json({ error: "text" });
  if (!Array.isArray(tests) || !tests.length || tests.length > 100) return res.status(400).json({ error: "tests" });

  const list = tests
    .filter(t => t && typeof t.name === "string")
    .map(t => ({ name: t.name.slice(0, 120), checks: String(t.checks || "").slice(0, 300) }));
  const names = list.map(t => t.name);

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4000,
      ...(MODEL.includes("haiku") ? {} : { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" }),
      system: SYSTEM,
      output_config: { effort: "low", format: { type: "json_schema", schema: schemaFor(names) } },
      messages: [{
        role: "user",
        content: "Lab tests (name: what it checks):\n" + list.map(t => `${t.name}: ${t.checks}`).join("\n") +
          `\n\nReply language: ${lang === "ceb" ? "ceb" : "en"}\n\nWhat the patient wrote:\n<patient>${text}</patient>`
      }]
    });

    if (response.stop_reason === "refusal") return res.status(200).json({ urgent: false, suggestions: [] });

    const out = JSON.parse(response.content.filter(b => b.type === "text").map(b => b.text).join(""));
    const valid = new Set(names);
    const seen = new Set();
    out.suggestions = (out.suggestions || []).filter(s => valid.has(s.name) && !seen.has(s.name) && seen.add(s.name)).slice(0, 5);
    return res.status(200).json(out);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return res.status(429).json({ error: "busy" });
    if (err instanceof Anthropic.APIError) {
      console.error("Claude API error", err.status, err.message);
      return res.status(502).json({ error: "failed" });
    }
    console.error("suggest-tests failed", err);
    return res.status(500).json({ error: "failed" });
  }
}
