/* OneCare Diagnostics — shared header, footer, language toggle and helpers */
(function () {
  // ===== Clinic details: edit here and every page updates =====
  const CLINIC = {
    phoneDisplay: "+63 985 188 8881",
    phoneTel: "+639851888881",
    email: "onecarediagnostics@gmail.com",
    address: "Poblacion Central, Dumanjug, Cebu",
    hoursEn: "Mon–Sat, 7:30AM–5:00PM",
    facebook: "",            // paste the Facebook page link here to show the icon
    mapQuery: "Poblacion Central, Dumanjug, Cebu",
    license: "07-160-26-CL-2",
    licenseValid: "Jan 1 – Dec 31, 2026",
    // Paste the GoHighLevel form link here (the iframe "src"); leave "" to show call/text instead.
    bookingFormUrl: "",
    // Name of the GoHighLevel field that should receive the selected tests (if the form supports pre-fill).
    bookingTestsField: "tests"
  };

  const NAV = [
    { href: "index.html", key: "nav.home", en: "Home" },
    { href: "tests.html", key: "nav.tests", en: "Tests &amp; Prices" },
    { href: "before-your-test.html", key: "nav.prep", en: "Before Your Test" },
    { href: "test-guide.html", key: "nav.guide", en: "Test Guide" },
    { href: "patient-care.html", key: "nav.care", en: "Patient Care" },
    { href: "about.html", key: "nav.about", en: "About &amp; Contact" }
  ];

  const ICON = {
    phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    cal: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    shield: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    fb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9V7c0-.9.6-1 1-1h3V2h-4c-3.3 0-4 2.4-4 4v3H7v4h3v9h4v-9h3.3l.7-4z"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  const here = (location.pathname.split("/").pop() || "index.html").replace(/\?.*$/, "") || "index.html";

  // ---------- Language ----------
  const DICT = window.ONECARE_CEB || {};
  let lang = "en";
  try { lang = localStorage.getItem("oc-lang") === "ceb" ? "ceb" : "en"; } catch (e) {}
  // ?lang=ceb or ?lang=en in a link picks the language (handy for sharing Bisaya links)
  const qLang = new URLSearchParams(location.search).get("lang");
  if (qLang === "ceb" || qLang === "en") {
    lang = qLang;
    try { localStorage.setItem("oc-lang", lang); } catch (e) {}
  }

  function t(key, en) {
    return lang === "ceb" && DICT[key] ? DICT[key] : en;
  }

  function applyLang() {
    document.documentElement.lang = lang === "ceb" ? "ceb" : "en";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      const v = DICT[el.dataset.i18n];
      el.innerHTML = lang === "ceb" && v ? v : el.dataset.en;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.getAttribute("placeholder") || "";
      const v = DICT[el.dataset.i18nPh];
      el.setAttribute("placeholder", lang === "ceb" && v ? v : el.dataset.enPh);
    });
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.dispatchEvent(new CustomEvent("oc:lang", { detail: { lang } }));
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem("oc-lang", lang); } catch (e) {}
    applyLang();
  }

  // ---------- Header / footer / mobile bar ----------
  function header() {
    const links = NAV.map(n =>
      `<li><a href="${n.href}" data-i18n="${n.key}"${n.href === here ? ' aria-current="page"' : ""}>${n.en}</a></li>`
    ).join("");
    return `
      <div class="wrap nav">
        <a href="index.html" class="logo" aria-label="OneCare Diagnostics home"><img src="assets/logo.png" alt="OneCare Diagnostics" width="180" height="56"></a>
        <nav aria-label="Main"><ul class="menu" id="menu">${links}</ul></nav>
        <div class="nav-right">
          <div class="lang" role="group" aria-label="Language">
            <button type="button" data-lang="en" aria-pressed="true">EN</button>
            <button type="button" data-lang="ceb" aria-pressed="false">BIS</button>
          </div>
          <a class="btn btn-primary btn-sm call-btn" href="tel:${CLINIC.phoneTel}">${ICON.phone}<span data-i18n="cta.call">Call Us</span></a>
          <button class="burger" type="button" aria-label="Open menu" aria-controls="menu" aria-expanded="false">${ICON.menu}</button>
        </div>
      </div>`;
  }

  function footer() {
    const fb = CLINIC.facebook
      ? `<li>${ICON.fb}<a href="${CLINIC.facebook}" target="_blank" rel="noopener">Facebook</a></li>` : "";
    return `
      <div class="wrap">
        <div class="foot">
          <div>
            <a href="index.html" class="logo"><img src="assets/logo.png" alt="OneCare Diagnostics" width="170" height="52"></a>
            <p data-i18n="foot.tag">Accurate lab results from people who welcome you, close to home. Serving Dumanjug and nearby towns since 2024.</p>
          </div>
          <div>
            <h4 data-i18n="foot.pages">Pages</h4>
            <ul>${NAV.map(n => `<li><a href="${n.href}" data-i18n="${n.key}">${n.en}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4 data-i18n="foot.services">Services</h4>
            <ul>
              <li data-i18n="svc.lab">Laboratory Tests</li>
              <li data-i18n="svc.ecg">ECG</li>
              <li data-i18n="svc.home">Home Collection</li>
              <li data-i18n="svc.health">Health Packages</li>
              <li data-i18n="svc.corp">Corporate Packages</li>
            </ul>
          </div>
          <div>
            <h4 data-i18n="foot.contact">Visit or Contact Us</h4>
            <ul>
              <li>${ICON.pin}<span>${CLINIC.address}</span></li>
              <li>${ICON.phone}<a href="tel:${CLINIC.phoneTel}">${CLINIC.phoneDisplay}</a></li>
              <li>${ICON.mail}<a href="mailto:${CLINIC.email}">${CLINIC.email}</a></li>
              <li>${ICON.clock}<span data-i18n="hours">${CLINIC.hoursEn}</span></li>
              <li>${ICON.shield}<span><span data-i18n="foot.license">DOH License No.</span> ${CLINIC.license}</span></li>
              ${fb}
            </ul>
          </div>
        </div>
        <p class="copy">© <span data-year></span> OneCare Diagnostics · Dumanjug, Cebu</p>
      </div>`;
  }

  function mobileBar() {
    return `
      <a class="btn btn-ghost" href="tel:${CLINIC.phoneTel}">${ICON.phone}<span data-i18n="cta.call">Call Us</span></a>
      <a class="btn btn-primary" href="about.html#book">${ICON.cal}<span data-i18n="cta.book">Book a Visit</span></a>`;
  }

  function mount() {
    const h = document.getElementById("site-header");
    if (h) { h.className = "site-header"; h.innerHTML = header(); }
    const f = document.getElementById("site-footer");
    if (f) { f.className = "site-footer"; f.innerHTML = footer(); }
    if (!document.querySelector(".mobile-bar")) {
      const m = document.createElement("div");
      m.className = "mobile-bar";
      m.innerHTML = mobileBar();
      document.body.appendChild(m);
    }

    // fill clinic details anywhere on the page
    document.querySelectorAll("[data-tel]").forEach(a => a.setAttribute("href", "tel:" + CLINIC.phoneTel));
    document.querySelectorAll("[data-sms]").forEach(a => a.setAttribute("href", "sms:" + CLINIC.phoneTel));
    document.querySelectorAll("[data-phone]").forEach(el => (el.textContent = CLINIC.phoneDisplay));
    document.querySelectorAll("[data-email]").forEach(el => { el.textContent = CLINIC.email; if (el.tagName === "A") el.href = "mailto:" + CLINIC.email; });
    document.querySelectorAll("[data-license]").forEach(el => (el.textContent = CLINIC.license));
    document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

    // menu
    const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
    if (burger && menu) burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

    // reveal on scroll
    const items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { threshold: .1 });
      items.forEach(el => io.observe(el));
    } else items.forEach(el => el.classList.add("in"));

    applyLang();
  }

  window.OC = { CLINIC, ICON, t, get lang() { return lang; }, setLang };
  // Wait for DOMContentLoaded so page scripts loaded after this one (estimator, guide) are listening first.
  if (document.readyState === "complete") mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
