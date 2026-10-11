/* OneCare Diagnostics — price estimator */
(function () {
  const P = window.ONECARE_PRICES;
  const byId = Object.fromEntries(P.tests.map(x => [x.id, x]));
  const peso = n => "₱" + Math.round(n).toLocaleString("en-PH");
  const t = (k, en) => window.OC.t(k, en);
  const isCeb = () => window.OC.lang === "ceb";

  let selected = new Set();
  let senior = false;
  try {
    const saved = JSON.parse(sessionStorage.getItem("oc-est") || "{}");
    (saved.ids || []).forEach(id => byId[id] && selected.add(id));
    senior = !!saved.senior;
  } catch (e) {}
  const photoUnsure = new Set(); // tests ticked from a photo where the handwriting was unclear
  const save = () => { try { sessionStorage.setItem("oc-est", JSON.stringify({ ids: [...selected], senior })); } catch (e) {} };

  const CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  const INFO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

  // ---------- calculations ----------
  function compute() {
    const covered = new Map(); // test id -> package name
    selected.forEach(id => (byId[id].includes || []).forEach(c => covered.set(c, byId[id].name)));
    const lines = [...selected].filter(id => !covered.has(id)).map(id => byId[id]);
    const subtotal = lines.reduce((s, x) => s + x.price, 0);
    // Senior / PWD gets 25% off and cannot also take the special promo; everyone else gets the 20% promo automatically
    const rate = senior ? P.seniorPwdDiscount : P.promoDiscount;
    const discount = Math.round(subtotal * rate);
    const prep = new Set();
    lines.forEach(x => {
      (x.prep || []).forEach(p => prep.add(p));
      (x.includes || []).forEach(c => (byId[c].prep || []).forEach(p => prep.add(p)));
    });
    return { covered, lines, subtotal, discount, rate, total: subtotal - discount, prep };
  }

  function prepNotes(prep) {
    const notes = [];
    if (prep.has("fast10")) notes.push(["amber", t("est.n.fast10", "Fast for 10–12 hours before your visit. You may take small sips of water if needed.")]);
    else if (prep.has("fast8")) notes.push(["amber", t("est.n.fast8", "Fast for 8–10 hours before your visit. You may take small sips of water if needed.")]);
    if (prep.has("period")) notes.push(["amber", t("est.n.period", "Urinalysis: please come 2–3 days after your period has ended.")]);
    if (prep.has("urine") || prep.has("stool")) notes.push(["", t("est.n.container", "Ask us for a clean sample container before collecting your sample.")]);
    if (prep.has("consent")) notes.push(["green", t("est.n.consent", "Some tests are confidential. We'll explain them and ask for your consent first.")]);
    return notes;
  }

  // ---------- list ----------
  function renderList() {
    const q = (document.getElementById("est-search").value || "").trim().toLowerCase();
    const { covered } = compute();
    const out = [];
    P.groups.forEach(g => {
      const items = P.tests.filter(x => x.group === g.id).filter(x => {
        if (!q) return true;
        return (x.name + " " + x.en + " " + x.ceb).toLowerCase().includes(q);
      });
      if (!items.length) return;
      const rows = items.map(x => {
        const on = selected.has(x.id);
        const inPkg = covered.get(x.id);
        const tags = (x.prep || []).map(p => {
          const d = P.prep[p];
          return `<span class="badge ${d.tone === "blue" ? "" : d.tone}">${isCeb() ? d.ceb : d.en}</span>`;
        });
        if (inPkg && !on) tags.push(`<span class="badge green">${t("est.inpkg", "Included in")} ${inPkg}</span>`);
        if (inPkg && on) tags.push(`<span class="badge green">${t("est.inpkg2", "Already in")} ${inPkg}</span>`);
        if (on && photoUnsure.has(x.id)) tags.push(`<span class="badge amber">${t("up.check", "From your photo: please check")}</span>`);
        if (x.confirm && P.DRAFT) tags.push(`<span class="badge draft">${t("est.confirm", "To confirm")}</span>`);
        return `
          <label class="est-row${on ? " on" : ""}">
            <input type="checkbox" value="${x.id}"${on ? " checked" : ""}>
            <span class="box">${CHECK}</span>
            <span>
              <span class="name">${x.name}</span>
              <span class="desc">${isCeb() ? x.ceb : x.en}</span>
              ${tags.length ? `<span class="tags">${tags.join("")}</span>` : ""}
            </span>
          </label>`;
      }).join("");
      out.push(`
        <div class="est-group">
          <h2>${isCeb() ? g.ceb : g.en}</h2>
          ${(isCeb() ? g.noteCeb : g.noteEn) ? `<p>${isCeb() ? g.noteCeb : g.noteEn}</p>` : ""}
          <div class="est-list">${rows}</div>
        </div>`);
    });
    document.getElementById("est-groups").innerHTML = out.length
      ? out.join("")
      : `<div class="est-list est-empty">${t("est.none", "No test matches your search. Call us and we'll help you find it.")}</div>`;
  }

  // ---------- summary ----------
  function summaryHTML() {
    const c = compute();
    const items = c.lines.map(x =>
      `<li><span>${x.name}</span></li>`
    ).join("");
    const notes = prepNotes(c.prep).map(([tone, txt]) =>
      `<div class="note-box ${tone}">${INFO}<span>${txt}</span></div>`).join("");
    return `
      <div class="print-only"><p><b>OneCare Diagnostics</b> · ${window.OC.CLINIC.phoneDisplay} · ${new Date().toLocaleDateString("en-PH")}</p></div>
      <h2>${t("est.sum.title", "Your estimate")}</h2>
      ${c.lines.length
        ? `<ul class="sum-list">${items}</ul>`
        : `<p class="sum-empty">${t("est.sum.empty", "Tick the tests you need and your estimated total will show here.")}</p>`}
      <div class="sum-row"><span>${t("est.sum.sub", "Subtotal")}</span><span>${peso(c.subtotal)}</span></div>
      <label class="toggle-line no-print">
        <input type="checkbox" data-senior${senior ? " checked" : ""}>
        <span>${t("est.sum.senior", "Senior Citizen / PWD (25% off)")}<small>${senior ? t("est.sum.seniorOn", "25% off replaces the special promo. Please bring your Senior Citizen or PWD ID.") : t("est.sum.seniorNote", "Please bring your Senior Citizen or PWD ID.")}</small></span>
      </label>
      ${c.discount ? `<div class="sum-row discount"><span>${senior ? t("est.sum.disc", "Senior / PWD discount (25%)") : t("est.sum.promo", "Special promo (20% off)")}</span><span>−${peso(c.discount)}</span></div>` : ""}
      <div class="sum-total"><span>${t("est.sum.total", "Estimated total")}</span><b>${peso(c.total)}</b></div>
      ${notes ? `<div class="est-prep">${notes}</div>` : ""}
      <div class="sum-actions">
        <button class="btn btn-primary" type="button" data-act="book"${c.lines.length ? "" : " disabled"}>${t("est.act.book", "Book these tests")}</button>
        <button class="btn btn-ghost" type="button" data-act="sms"${c.lines.length ? "" : " disabled"}>${t("est.act.sms", "Text this list to us")}</button>
        <div style="display:flex;gap:10px">
          <button class="btn btn-ghost btn-sm" style="flex:1" type="button" data-act="print"${c.lines.length ? "" : " disabled"}>${t("est.act.print", "Save / Print")}</button>
          <button class="btn btn-ghost btn-sm" style="flex:1" type="button" data-act="clear"${c.lines.length ? "" : " disabled"}>${t("est.act.clearAll", "Clear all")}</button>
        </div>
      </div>
      <p class="sum-note">${t("est.sum.note", "This is an estimate only. The final price is confirmed at the lab.")}${P.DRAFT ? " <b>" + t("est.sum.draft", "Prices shown are draft prices.") + "</b>" : ""}</p>`;
  }

  function renderSummary() {
    const html = summaryHTML();
    document.querySelectorAll("[data-summary]").forEach(el => (el.innerHTML = html));
    const c = compute();
    const n = c.lines.length;
    const count = document.getElementById("est-count");
    count.textContent = n ? (n === 1 ? t("est.count1", "1 test ticked") : t("est.countN", "{n} tests ticked").replace("{n}", n)) : t("est.countNone", "No tests ticked yet");
    count.classList.toggle("has", n > 0);
    document.querySelector(".est-listbar [data-act]").disabled = !n;
    const mb = document.getElementById("mobile-total");
    if (mb) {
      mb.textContent = peso(c.total);
      document.getElementById("mobile-count").textContent =
        c.lines.length + " " + (c.lines.length === 1 ? t("est.test", "test") : t("est.tests", "tests"));
    }
  }

  function renderAll() { renderList(); renderSummary(); }

  // ---------- actions ----------
  function listText() {
    const c = compute();
    const lines = c.lines.map(x => `- ${x.name}`);
    lines.push(`${t("est.sum.total", "Estimated total")}: ${peso(c.total)}${senior ? " (Senior/PWD 25% off)" : " (20% promo)"}`);
    return lines.join("\n");
  }

  function act(kind) {
    if (kind === "clear") { selected.clear(); photoUnsure.clear(); senior = false; save(); renderAll(); upStatus(""); return; }
    if (kind === "print") { window.print(); return; }
    if (kind === "sms") {
      const body = t("est.sms.hi", "Hi OneCare! I'd like to ask about these tests:") + "\n" + listText();
      location.href = `sms:${window.OC.CLINIC.phoneTel}?&body=${encodeURIComponent(body)}`;
      return;
    }
    if (kind === "book") {
      try { sessionStorage.setItem("oc-book", listText()); } catch (e) {}
      location.href = "contact.html#book";
    }
  }

  // ---------- photo of the doctor's request ----------
  const WARN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function sendHref() {
    const C = window.OC.CLINIC;
    if (C.messenger) return C.messenger;
    const body = t("up.smsBody", "Hi OneCare! I'll send you a photo of my doctor's request. Can you tell me the total?");
    return `sms:${C.phoneTel}?&body=${encodeURIComponent(body)}`;
  }

  function upStatus(html) { document.getElementById("up-status").innerHTML = html; }

  // Shrink the photo before sending: smaller upload, still sharp enough to read
  function shrink(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const max = 1600;
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL("image/jpeg", 0.85).split(",")[1]);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("load")); };
      img.src = url;
    });
  }

  async function readPhoto(file) {
    const sendBtn = `<a class="btn btn-ghost btn-sm" href="${esc(sendHref())}">${t("up.send", "Send it to us instead")}</a>`;
    upStatus(`<div class="note-box"><span class="spinner" aria-hidden="true"></span><span>${t("up.reading", "Reading your photo… this takes a few seconds.")}</span></div>`);
    try {
      const image = await shrink(file);
      const r = await fetch("/api/read-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, mediaType: "image/jpeg", tests: P.tests.map(x => ({ id: x.id, name: x.name })) })
      });
      if (!r.ok) throw new Error("http " + r.status);
      const out = await r.json();

      if (!out.readable || !out.found.length) {
        upStatus(`<div class="note-box amber">${WARN}<div><b>${t("up.noneH", "We couldn't read the tests on this photo.")}</b><p>${t("up.noneP", "Try a clearer photo in good light, with the whole request in the frame. Or send it to us and we'll read it for you.")}</p><div class="up-more">${sendBtn}</div></div></div>`);
        return;
      }

      out.found.forEach(f => {
        selected.add(f.id);
        f.sure ? photoUnsure.delete(f.id) : photoUnsure.add(f.id);
      });
      save(); renderAll();

      const n = out.found.length;
      const unsure = out.found.filter(f => !f.sure).map(f => esc(byId[f.id].name));
      const unclear = (out.unclear || []).map(esc);
      upStatus(`
        <div class="note-box amber">${WARN}<div>
          <b>${n === 1 ? t("up.found1", "We ticked 1 test from your photo.") : t("up.foundN", "We ticked {n} tests from your photo.").replace("{n}", n)}</b>
          <p>${t("up.warn", "Doctors' handwriting can be hard to read, so this total may have mistakes. Please check the ticked tests below. The lab will confirm your tests and final total.")}</p>
          ${unsure.length ? `<p><b>${t("up.unsure", "Please double-check:")}</b> ${unsure.join(", ")}</p>` : ""}
          ${unclear.length ? `<p><b>${t("up.unclear", "We couldn't read or match:")}</b> ${unclear.join("; ")}</p>` : ""}
          <div class="up-more">${sendBtn}</div>
        </div></div>`);
    } catch (e) {
      upStatus(`<div class="note-box amber">${WARN}<div><b>${t("up.errH", "Photo reading isn't working right now.")}</b><p>${t("up.errP", "Please tick your tests below, or send the photo to us and we'll help you.")}</p><div class="up-more">${sendBtn}</div></div></div>`);
    }
  }

  function bind() {
    document.getElementById("up-send").href = sendHref();
    document.getElementById("up-file").addEventListener("change", e => {
      const f = e.target.files && e.target.files[0];
      e.target.value = "";
      if (f) readPhoto(f);
    });

    document.getElementById("est-groups").addEventListener("change", e => {
      const box = e.target.closest('input[type="checkbox"]');
      if (!box) return;
      box.checked ? selected.add(box.value) : selected.delete(box.value);
      save(); renderAll();
    });
    document.getElementById("est-search").addEventListener("input", renderList);
    document.addEventListener("change", e => {
      if (e.target.matches("[data-senior]")) { senior = e.target.checked; save(); renderSummary(); }
    });
    document.addEventListener("click", e => {
      const a = e.target.closest("[data-act]");
      if (a && !a.disabled) act(a.dataset.act);
      const tog = e.target.closest("[data-sheet]");
      if (tog) {
        const open = document.querySelector(".mobile-sum").classList.toggle("open");
        tog.setAttribute("aria-expanded", String(open));
        tog.textContent = open ? t("est.hide", "Hide") : t("est.view", "View estimate");
      }
    });
    if (P.DRAFT) document.querySelectorAll("[data-draft]").forEach(el => (el.hidden = false));
    document.body.classList.add("has-mobile-sum");
  }

  document.addEventListener("oc:lang", () => {
    if (!document.getElementById("est-groups").dataset.bound) {
      document.getElementById("est-groups").dataset.bound = "1";
      bind();
    }
    renderAll();
    const tog = document.querySelector("[data-sheet]");
    if (tog) tog.textContent = document.querySelector(".mobile-sum").classList.contains("open") ? t("est.hide", "Hide") : t("est.view", "View estimate");
  });
})();
