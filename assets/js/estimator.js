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
  const save = () => { try { sessionStorage.setItem("oc-est", JSON.stringify({ ids: [...selected], senior })); } catch (e) {} };

  const CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  const INFO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';

  // ---------- calculations ----------
  function compute() {
    const covered = new Map(); // test id -> package name
    selected.forEach(id => (byId[id].includes || []).forEach(c => covered.set(c, byId[id].name)));
    const lines = [...selected].filter(id => !covered.has(id)).map(id => byId[id]);
    const subtotal = lines.reduce((s, x) => s + x.price, 0);
    const discount = senior ? Math.round(subtotal * P.seniorPwdDiscount) : 0;
    const prep = new Set();
    lines.forEach(x => {
      (x.prep || []).forEach(p => prep.add(p));
      (x.includes || []).forEach(c => (byId[c].prep || []).forEach(p => prep.add(p)));
    });
    return { covered, lines, subtotal, discount, total: subtotal - discount, prep };
  }

  function prepNotes(prep) {
    const notes = [];
    if (prep.has("fast10")) notes.push(["amber", t("est.n.fast10", "Fast for 10–12 hours before your visit. Water is okay.")]);
    else if (prep.has("fast8")) notes.push(["amber", t("est.n.fast8", "Fast for 8–10 hours before your visit. Water is okay.")]);
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
            <span class="price">${peso(x.price)}</span>
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
      `<li><span>${x.name} <button class="rm" type="button" data-rm="${x.id}" aria-label="Remove ${x.name}">×</button></span><span>${peso(x.price)}</span></li>`
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
        <span>${t("est.sum.senior", "Senior Citizen / PWD (20% off)")}<small>${t("est.sum.seniorNote", "Please bring your Senior Citizen or PWD ID.")}</small></span>
      </label>
      ${c.discount ? `<div class="sum-row discount"><span>${t("est.sum.disc", "Senior / PWD discount")}</span><span>−${peso(c.discount)}</span></div>` : ""}
      <div class="sum-total"><span>${t("est.sum.total", "Estimated total")}</span><b>${peso(c.total)}</b></div>
      ${notes ? `<div class="est-prep">${notes}</div>` : ""}
      <div class="sum-actions">
        <button class="btn btn-primary" type="button" data-act="book"${c.lines.length ? "" : " disabled"}>${t("est.act.book", "Book these tests")}</button>
        <button class="btn btn-ghost" type="button" data-act="sms"${c.lines.length ? "" : " disabled"}>${t("est.act.sms", "Text this list to us")}</button>
        <div style="display:flex;gap:10px">
          <button class="btn btn-ghost btn-sm" style="flex:1" type="button" data-act="print"${c.lines.length ? "" : " disabled"}>${t("est.act.print", "Save / Print")}</button>
          <button class="btn btn-ghost btn-sm" style="flex:1" type="button" data-act="clear"${c.lines.length ? "" : " disabled"}>${t("est.act.clear", "Clear")}</button>
        </div>
      </div>
      <p class="sum-note">${t("est.sum.note", "This is an estimate only. The final price is confirmed at the lab.")}${P.DRAFT ? " <b>" + t("est.sum.draft", "Prices shown are draft prices.") + "</b>" : ""}</p>`;
  }

  function renderSummary() {
    const html = summaryHTML();
    document.querySelectorAll("[data-summary]").forEach(el => (el.innerHTML = html));
    const c = compute();
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
    const lines = c.lines.map(x => `- ${x.name} (${peso(x.price)})`);
    lines.push(`${t("est.sum.total", "Estimated total")}: ${peso(c.total)}${senior ? " (Senior/PWD)" : ""}`);
    return lines.join("\n");
  }

  function act(kind) {
    if (kind === "clear") { selected.clear(); senior = false; save(); renderAll(); return; }
    if (kind === "print") { window.print(); return; }
    if (kind === "sms") {
      const body = t("est.sms.hi", "Hi OneCare! I'd like to ask about these tests:") + "\n" + listText();
      location.href = `sms:${window.OC.CLINIC.phoneTel}?&body=${encodeURIComponent(body)}`;
      return;
    }
    if (kind === "book") {
      try { sessionStorage.setItem("oc-book", listText()); } catch (e) {}
      location.href = "about.html#book";
    }
  }

  function bind() {
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
      const rm = e.target.closest("[data-rm]");
      if (rm) { selected.delete(rm.dataset.rm); save(); renderAll(); return; }
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
