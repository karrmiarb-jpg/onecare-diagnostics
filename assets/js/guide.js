/* OneCare Diagnostics — "What each test means" content.
   Plain-language explanations only. No normal ranges or result interpretation:
   your doctor reads results with the patient. To be reviewed by our RMT. */
(function () {
  const TOPICS = [
    { id: "all",   en: "All tests",           ceb: "Tanang test" },
    { id: "blood", en: "Blood count",         ceb: "Blood count" },
    { id: "sugar", en: "Sugar & cholesterol", ceb: "Asukar ug kolesterol" },
    { id: "organ", en: "Kidney & liver",      ceb: "Kidney ug atay" },
    { id: "ustool",en: "Urine & stool",       ceb: "Ihi ug tae" },
    { id: "screen",en: "Screening tests",     ceb: "Screening tests" },
    { id: "heart", en: "Heart",               ceb: "Kasingkasing" }
  ];

  const TESTS = [
    { topic: "blood", name: "CBC (Complete Blood Count)",
      en: { what: "Counts the different cells in your blood.", checks: "Red blood cells (which carry oxygen), white blood cells (which fight infection) and platelets (which help stop bleeding).", why: "Doctors use it to look for infection, anemia, dengue and many other conditions, and to follow up treatment.", prep: "No preparation needed." },
      ceb: { what: "Ihapon ang lain-laing cells sa imong dugo.", checks: "Red blood cells (nagdala og oxygen), white blood cells (nakig-away sa impeksyon) ug platelets (motabang pagpahunong sa pagdugo).", why: "Gamiton sa doktor aron tan-awon kung adunay impeksyon, anemia, dengue ug uban pa, ug aron sundan ang pagtambal.", prep: "Walay kinahanglan nga pangandam." } },
    { topic: "blood", name: "Blood Typing (ABO & Rh)",
      en: { what: "Finds out your blood type, like A, B, AB or O, positive or negative.", checks: "The markers on your red blood cells.", why: "Needed before blood transfusions, surgery, pregnancy check-ups, and for many job and school requirements.", prep: "No preparation needed." },
      ceb: { what: "Mahibal-an ang imong blood type, sama sa A, B, AB o O, positive o negative.", checks: "Ang mga marka sa imong red blood cells.", why: "Kinahanglan sa dili pa mag-transfusion, operahan, pag-check-up sa pagmabdos, ug sa daghang requirements sa trabaho ug eskwelahan.", prep: "Walay kinahanglan nga pangandam." } },
    { topic: "blood", name: "Clotting & Bleeding Time",
      en: { what: "Checks how long it takes your blood to stop flowing and to clot.", checks: "How well your blood forms a clot.", why: "Often asked before surgery, tooth extraction or other procedures.", prep: "Tell us if you take blood thinners or aspirin." },
      ceb: { what: "Susihon kung unsa ka dugay mohunong ang pagdugo ug mo-clot ang dugo.", checks: "Kung unsa ka maayo mo-clot ang imong dugo.", why: "Kasagaran gipangayo sa dili pa operahan, ibton ang ngipon, o ubang procedure.", prep: "Sultihi mi kung nag-inom ka og blood thinner o aspirin." } },
    { topic: "blood", name: "ESR",
      en: { what: "A general blood test.", checks: "How fast red blood cells settle in a tube. This can be faster when there's inflammation.", why: "Doctors use it together with other tests to look for or follow inflammation.", prep: "No preparation needed." },
      ceb: { what: "Usa ka kinatibuk-ang test sa dugo.", checks: "Kung unsa ka paspas mo-settle ang red blood cells sa tubo. Mahimong mas paspas kung adunay inflammation.", why: "Gamiton sa doktor uban sa ubang test aron tan-awon o sundan ang inflammation.", prep: "Walay kinahanglan nga pangandam." } },

    { topic: "sugar", name: "FBS (Fasting Blood Sugar)",
      en: { what: "Measures the sugar (glucose) in your blood after fasting.", checks: "Your blood sugar level when you haven't eaten.", why: "Used to screen for and monitor diabetes.", prep: "Fast for 8–10 hours. Plain water is okay." },
      ceb: { what: "Sukdon ang asukar (glucose) sa imong dugo human sa pagpuasa.", checks: "Ang lebel sa asukar sa dugo kung wala pa ka mokaon.", why: "Gamiton sa pag-screen ug pagbantay sa diabetes.", prep: "Puasa og 8–10 ka oras. Pwede ang tubig." } },
    { topic: "sugar", name: "RBS (Random Blood Sugar)",
      en: { what: "Measures your blood sugar at any time of day.", checks: "Your blood sugar level at the time of the test.", why: "A quick check when fasting isn't possible, or when your doctor wants a reading right away.", prep: "No fasting needed." },
      ceb: { what: "Sukdon ang asukar sa dugo bisan unsang orasa.", checks: "Ang lebel sa asukar sa dugo sa oras sa test.", why: "Dali nga check kung dili makapuasa, o kung gusto sa doktor makita dayon.", prep: "Dili kinahanglan mopuasa." } },
    { topic: "sugar", name: "Lipid Profile",
      en: { what: "A group of tests on the fats in your blood.", checks: "Total cholesterol, HDL (the 'good' cholesterol), LDL (the 'bad' cholesterol) and triglycerides.", why: "Helps your doctor check your heart and blood vessel health.", prep: "Fast for 10–12 hours. Plain water is okay." },
      ceb: { what: "Grupo sa mga test sa tambok sa imong dugo.", checks: "Total cholesterol, HDL (ang 'maayo' nga kolesterol), LDL (ang 'dili maayo' nga kolesterol) ug triglycerides.", why: "Motabang sa doktor pagsusi sa kahimsog sa kasingkasing ug ugat.", prep: "Puasa og 10–12 ka oras. Pwede ang tubig." } },

    { topic: "organ", name: "BUN & Creatinine",
      en: { what: "Two blood tests about your kidneys.", checks: "Waste products that healthy kidneys remove from the blood.", why: "Used to check how well your kidneys are working, especially if you have diabetes or high blood pressure.", prep: "Usually no preparation needed." },
      ceb: { what: "Duha ka test sa dugo bahin sa imong kidney.", checks: "Mga hugaw nga gitangtang sa himsog nga kidney gikan sa dugo.", why: "Gamiton aron tan-awon kung maayo ba ang trabaho sa kidney, labi na kung adunay diabetes o high blood.", prep: "Kasagaran walay kinahanglan nga pangandam." } },
    { topic: "organ", name: "Uric Acid",
      en: { what: "Measures uric acid in your blood.", checks: "A natural waste product. High levels can build up in the joints.", why: "Often checked for gout and kidney health.", prep: "Usually no preparation needed. Ask us if your doctor said otherwise." },
      ceb: { what: "Sukdon ang uric acid sa imong dugo.", checks: "Usa ka natural nga hugaw sa lawas. Kung taas, mahimong motapok sa lutahan.", why: "Kasagaran gisusi para sa gout ug sa kidney.", prep: "Kasagaran walay pangandam. Pangutana kung lahi ang giingon sa imong doktor." } },
    { topic: "organ", name: "SGPT / ALT & SGOT / AST",
      en: { what: "Blood tests about your liver.", checks: "Enzymes that are mostly found in the liver.", why: "Used to check liver health, and to monitor people taking certain medicines.", prep: "Usually no preparation needed." },
      ceb: { what: "Mga test sa dugo bahin sa imong atay.", checks: "Mga enzyme nga kasagaran makita sa atay.", why: "Gamiton aron susihon ang kahimsog sa atay, ug bantayan ang mga nag-inom og pipila ka tambal.", prep: "Kasagaran walay kinahanglan nga pangandam." } },

    { topic: "ustool", name: "Urinalysis",
      en: { what: "Checks a sample of your urine.", checks: "Color, clarity, sugar, protein, blood, and cells that can point to infection.", why: "Used to look for urinary tract infection, kidney problems and diabetes, and for check-ups and job requirements.", prep: "Not during your period. Please come 2–3 days after it ends. First-morning, midstream urine is best." },
      ceb: { what: "Susihon ang sample sa imong ihi.", checks: "Kolor, kalinaw, asukar, protina, dugo, ug cells nga mahimong timailhan sa impeksyon.", why: "Gamiton sa pagpangita og UTI, problema sa kidney ug diabetes, ug para sa check-up ug requirements sa trabaho.", prep: "Dili samtang adunay regla. Anhi 2–3 ka adlaw human kini mahuman. Labing maayo ang unang ihi sa buntag, ang tunga nga bahin." } },
    { topic: "ustool", name: "Fecalysis",
      en: { what: "Checks a small sample of your stool.", checks: "Parasites, blood and signs of infection.", why: "Used when you have stomach pain, diarrhea or worms, and for job and school requirements.", prep: "A small, fresh sample in a clean container. Bring it within 1–2 hours." },
      ceb: { what: "Susihon ang gamay nga sample sa imong tae.", checks: "Bitok, dugo ug timailhan sa impeksyon.", why: "Gamiton kung sakit ang tiyan, nagkalibang o adunay bitok, ug para sa requirements sa trabaho ug eskwelahan.", prep: "Gamay ug presko nga sample sa limpyo nga sudlanan. Dad-a sulod sa 1–2 ka oras." } },
    { topic: "ustool", name: "Fecal Occult Blood Test",
      en: { what: "Looks for blood in the stool that you can't see.", checks: "Hidden (occult) blood.", why: "Doctors use it to look into stomach or bowel problems.", prep: "A small, fresh stool sample in a clean container." },
      ceb: { what: "Mangita og dugo sa tae nga dili makita sa mata.", checks: "Tinago (occult) nga dugo.", why: "Gamiton sa doktor aron susihon ang problema sa tiyan o tinai.", prep: "Gamay ug presko nga sample sa tae sa limpyo nga sudlanan." } },
    { topic: "ustool", name: "Pregnancy Test (Urine)",
      en: { what: "Checks if you are pregnant using a urine sample.", checks: "A pregnancy hormone in the urine.", why: "To confirm pregnancy, or before certain procedures and medicines.", prep: "The first urine of the morning is best." },
      ceb: { what: "Susihon kung buntis gamit ang ihi.", checks: "Usa ka hormone sa pagmabdos sa ihi.", why: "Aron masiguro ang pagmabdos, o sa dili pa ang pipila ka procedure ug tambal.", prep: "Labing maayo ang unang ihi sa buntag." } },

    { topic: "screen", name: "Dengue Rapid Test",
      en: { what: "A quick screening test for dengue.", checks: "Signs of the dengue virus or the body's response to it.", why: "Used when someone has fever and the doctor suspects dengue. Often done with a CBC.", prep: "No preparation needed. Tell us how many days you've had fever." },
      ceb: { what: "Dali nga screening test para sa dengue.", checks: "Timailhan sa dengue virus o sa tubag sa lawas niini.", why: "Gamiton kung adunay hilanat ug nagduda ang doktor nga dengue. Kasagaran uban sa CBC.", prep: "Walay pangandam. Sultihi mi pila na ka adlaw ang imong hilanat." } },
    { topic: "screen", name: "Hepatitis B Screening (HBsAg)",
      en: { what: "A quick screening test for Hepatitis B.", checks: "A marker of the Hepatitis B virus in the blood.", why: "For check-ups, pregnancy, work requirements, or if you may have been exposed.", prep: "No preparation needed." },
      ceb: { what: "Dali nga screening test para sa Hepatitis B.", checks: "Usa ka marka sa Hepatitis B virus sa dugo.", why: "Para sa check-up, pagmabdos, requirements sa trabaho, o kung tingali na-expose.", prep: "Walay kinahanglan nga pangandam." } },
    { topic: "screen", name: "Syphilis Screening",
      en: { what: "A quick, private screening test for syphilis.", checks: "The body's response to the infection.", why: "For check-ups, pregnancy, or if you may have been exposed. Syphilis is treatable.", prep: "No preparation needed. Your result is kept private." },
      ceb: { what: "Dali ug pribado nga screening test para sa syphilis.", checks: "Ang tubag sa lawas sa impeksyon.", why: "Para sa check-up, pagmabdos, o kung tingali na-expose. Matambalan ang syphilis.", prep: "Walay pangandam. Pribado ang imong resulta." } },
    { topic: "screen", name: "HIV Screening",
      en: { what: "A quick, confidential screening test for HIV.", checks: "Signs of HIV infection in the blood.", why: "Knowing early means treatment can start early. Treatment today helps people live long, healthy lives.", prep: "We explain the test and ask for your consent first. Your result is confidential." },
      ceb: { what: "Dali ug kumpidensyal nga screening test para sa HIV.", checks: "Timailhan sa HIV infection sa dugo.", why: "Kung sayo mahibal-an, sayo usab masugdan ang pagtambal. Ang tambal karon makatabang nga taas ug himsog ang kinabuhi.", prep: "Ipasabot namo ang test ug pangayoon ang imong pagtugot una. Kumpidensyal ang imong resulta." } },

    { topic: "heart", name: "ECG (Electrocardiogram)",
      en: { what: "Records the electrical activity of your heart.", checks: "Your heart's rhythm and rate.", why: "Used for check-ups, before surgery, for work requirements, and when there's chest discomfort or palpitations.", prep: "No preparation needed. Wear a top that's easy to open or lift." },
      ceb: { what: "Irekord ang electrical activity sa imong kasingkasing.", checks: "Ang ritmo ug paspas sa imong kasingkasing.", why: "Para sa check-up, sa dili pa operahan, requirements sa trabaho, ug kung adunay kasakit sa dughan o palpitasyon.", prep: "Walay pangandam. Pagsul-ob og sinina nga dali ablihan o ipataas." } }
  ];

  const L = {
    checks: { en: "What it checks", ceb: "Unsa ang gisusi" },
    why:    { en: "Why doctors ask for it", ceb: "Nganong gipangayo sa doktor" },
    prep:   { en: "Before the test", ceb: "Sa dili pa ang test" }
  };

  const CHEV = '<svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const ICONS = {
    blood: '<path d="M12 2.7s-6 6.6-6 11.3a6 6 0 0 0 12 0c0-4.7-6-11.3-6-11.3z"/>',
    sugar: '<path d="M9 2v6l-5 9a3 3 0 0 0 2.6 4.5h10.8A3 3 0 0 0 20 17l-5-9V2"/><path d="M8 2h8M6.5 14h11"/>',
    organ: '<path d="M9 2v6l-5 9a3 3 0 0 0 2.6 4.5h10.8A3 3 0 0 0 20 17l-5-9V2"/><path d="M8 2h8M6.5 14h11"/>',
    ustool: '<path d="M8 2h8l-1 5v13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V7z"/><path d="M9 12h6"/>',
    screen: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    heart: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'
  };

  let topic = "all";

  function render() {
    const ceb = window.OC.lang === "ceb";
    document.getElementById("guide-filter").innerHTML = TOPICS.map(tp =>
      `<button class="chip-btn" type="button" data-topic="${tp.id}" aria-pressed="${tp.id === topic}">${ceb ? tp.ceb : tp.en}</button>`
    ).join("");
    document.getElementById("guide").innerHTML = TESTS
      .filter(x => topic === "all" || x.topic === topic)
      .map((x, i) => {
        const c = ceb ? x.ceb : x.en;
        const green = ["sugar", "ustool", "heart"].includes(x.topic) ? " green" : "";
        return `
          <details${i === 0 && topic === "all" ? "" : ""}>
            <summary>
              <span class="ic-box${green}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[x.topic]}</svg></span>
              <span class="t"><b>${x.name}</b><small>${c.what}</small></span>
              ${CHEV}
            </summary>
            <div class="body">
              <div><h4>${ceb ? L.checks.ceb : L.checks.en}</h4><p>${c.checks}</p></div>
              <div><h4>${ceb ? L.why.ceb : L.why.en}</h4><p>${c.why}</p></div>
              <div><h4>${ceb ? L.prep.ceb : L.prep.en}</h4><p>${c.prep}</p></div>
            </div>
          </details>`;
      }).join("");
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-topic]");
    if (b) { topic = b.dataset.topic; render(); }
  });
  document.addEventListener("oc:lang", render);
})();
