/*
  OneCare Diagnostics — TEST MENU & PRICES
  =========================================
  ⚠️ DRAFT PRICES. These are sample prices until the real price list is added.
  Set DRAFT to false once the prices below are the real ones.

  How to edit:
  - price: the price in pesos (number only, no commas).
  - Remove a whole { ... } block to take a test off the website.
  - prep: preparation reminders shown with the test. Options:
      "fast8"   fasting 8–10 hours
      "fast10"  fasting 10–12 hours
      "period"  not during menstruation
      "stool"   stool sample container
      "urine"   first-morning urine is best
      "consent" confidential test, consent first
  - includes (packages only): the ids of the tests inside the package.
*/
window.ONECARE_PRICES = {
  DRAFT: true,
  updated: "October 2026",
  seniorPwdDiscount: 0.20,

  groups: [
    { id: "hema",  en: "Hematology",            ceb: "Hematology (Dugo)",
      noteEn: "Blood tests that look at your blood cells.", noteCeb: "Mga test sa dugo nga motan-aw sa imong blood cells." },
    { id: "chem",  en: "Clinical Chemistry",    ceb: "Clinical Chemistry",
      noteEn: "Blood sugar, cholesterol, kidney and liver tests.", noteCeb: "Asukar sa dugo, kolesterol, kidney ug atay." },
    { id: "micro", en: "Urine & Stool",         ceb: "Ihi ug Tae",
      noteEn: "Clinical microscopy, including pregnancy tests.", noteCeb: "Clinical microscopy, apil ang pregnancy test." },
    { id: "sero",  en: "Rapid Screening Tests", ceb: "Rapid Screening Tests",
      noteEn: "Quick screening tests for infections.", noteCeb: "Paspas nga screening test para sa mga impeksyon." },
    { id: "heart", en: "Heart",                 ceb: "Kasingkasing",
      noteEn: "Checks the rhythm of your heart.", noteCeb: "Motan-aw sa ritmo sa imong kasingkasing." },
    { id: "other", en: "Other Services",        ceb: "Ubang Serbisyo",
      noteEn: "", noteCeb: "" },
    { id: "pkg",   en: "Packages",              ceb: "Mga Package",
      noteEn: "Common test bundles at one price.", noteCeb: "Mga kasagarang test nga gi-bundle sa usa ka presyo." }
  ],

  tests: [
    // ----- Hematology -----
    { id: "cbc", group: "hema", name: "CBC with Platelet Count", price: 250,
      en: "Counts your red and white blood cells and platelets.",
      ceb: "Ihapon ang imong red ug white blood cells ug platelets." },
    { id: "btype", group: "hema", name: "Blood Typing (ABO & Rh)", price: 150,
      en: "Finds your blood type.",
      ceb: "Mahibal-an ang imong blood type." },
    { id: "ctbt", group: "hema", name: "Clotting & Bleeding Time", price: 150,
      en: "Checks how well your blood clots. Often asked before surgery.",
      ceb: "Motan-aw kung unsa ka maayo mo-clot ang dugo. Kasagaran gipangayo sa dili pa operahan." },
    { id: "esr", group: "hema", name: "ESR", price: 150,
      en: "A general test that can show inflammation in the body.",
      ceb: "Kinatibuk-ang test nga makapakita og inflammation sa lawas." },

    // ----- Clinical Chemistry -----
    { id: "fbs", group: "chem", name: "FBS (Fasting Blood Sugar)", price: 150, prep: ["fast8"],
      en: "Measures your blood sugar after fasting.",
      ceb: "Sukdon ang asukar sa dugo human sa pagpuasa." },
    { id: "rbs", group: "chem", name: "RBS (Random Blood Sugar)", price: 150,
      en: "Measures your blood sugar at any time of day. No fasting needed.",
      ceb: "Sukdon ang asukar sa dugo bisan unsang orasa. Dili kinahanglan mopuasa." },
    { id: "lipid", group: "chem", name: "Lipid Profile", price: 600, prep: ["fast10"],
      en: "Cholesterol (total, good and bad) and triglycerides.",
      ceb: "Kolesterol (total, maayo ug dili maayo) ug triglycerides." },
    { id: "chol", group: "chem", name: "Total Cholesterol", price: 150, prep: ["fast10"],
      en: "Measures the total cholesterol in your blood.",
      ceb: "Sukdon ang kinatibuk-ang kolesterol sa dugo." },
    { id: "trig", group: "chem", name: "Triglycerides", price: 180, prep: ["fast10"],
      en: "Measures a type of fat in your blood.",
      ceb: "Sukdon ang usa ka klase sa tambok sa dugo." },
    { id: "bun", group: "chem", name: "BUN", price: 180,
      en: "Helps check how well your kidneys are working.",
      ceb: "Motabang pagtan-aw kung maayo ba ang trabaho sa imong kidney." },
    { id: "crea", group: "chem", name: "Creatinine", price: 180,
      en: "Helps check how well your kidneys are working.",
      ceb: "Motabang pagtan-aw kung maayo ba ang trabaho sa imong kidney." },
    { id: "bua", group: "chem", name: "Uric Acid", price: 180,
      en: "Often checked for gout and kidney health.",
      ceb: "Kasagaran gisusi para sa gout ug sa kidney." },
    { id: "sgpt", group: "chem", name: "SGPT / ALT", price: 200,
      en: "A liver test.",
      ceb: "Test para sa atay." },
    { id: "sgot", group: "chem", name: "SGOT / AST", price: 200,
      en: "A liver test, often done with SGPT.",
      ceb: "Test para sa atay, kasagaran uban sa SGPT." },

    // ----- Clinical Microscopy -----
    { id: "ua", group: "micro", name: "Urinalysis", price: 100, prep: ["period", "urine"],
      en: "Checks your urine for signs of infection, sugar, protein and more.",
      ceb: "Susihon ang ihi para sa timailhan sa impeksyon, asukar, protina ug uban pa." },
    { id: "fa", group: "micro", name: "Fecalysis", price: 100, prep: ["stool"],
      en: "Checks your stool for parasites, blood and infection.",
      ceb: "Susihon ang tae para sa bitok, dugo ug impeksyon." },
    { id: "preg", group: "micro", name: "Pregnancy Test (Urine)", price: 150, prep: ["urine"],
      en: "Checks for pregnancy using a urine sample.",
      ceb: "Susihon kung buntis gamit ang ihi." },
    { id: "fobt", group: "micro", name: "Fecal Occult Blood Test", price: 250, prep: ["stool"],
      en: "Looks for hidden blood in the stool.",
      ceb: "Mangita og tinago nga dugo sa tae." },

    // ----- Immunology / Serology (rapid) -----
    { id: "dengue", group: "sero", name: "Dengue Rapid Test", price: 1200,
      en: "A rapid screening test for dengue.",
      ceb: "Rapid screening test para sa dengue." },
    { id: "hbsag", group: "sero", name: "Hepatitis B Screening (HBsAg)", price: 250,
      en: "A rapid screening test for Hepatitis B.",
      ceb: "Rapid screening test para sa Hepatitis B." },
    { id: "syph", group: "sero", name: "Syphilis Screening", price: 250, prep: ["consent"],
      en: "A rapid screening test for syphilis. Kept private.",
      ceb: "Rapid screening test para sa syphilis. Pribado." },
    { id: "hiv", group: "sero", name: "HIV Screening", price: 300, prep: ["consent"],
      en: "A rapid screening test for HIV. Confidential.",
      ceb: "Rapid screening test para sa HIV. Kumpidensyal." },

    // ----- Heart (confirm: not part of the lab license) -----
    { id: "ecg", group: "heart", name: "ECG (Electrocardiogram)", price: 350, confirm: true,
      en: "Records your heart's rhythm. Painless and quick to do.",
      ceb: "Irekord ang ritmo sa imong kasingkasing. Walay sakit." },

    // ----- Other (confirm) -----
    { id: "home", group: "other", name: "Home Collection Fee", price: 200, confirm: true,
      en: "We collect your sample at home. Call us to check if your area is covered.",
      ceb: "Kuhaon namo ang sample sa inyong balay. Tawag una para mahibal-an kung sakop ang inyong lugar." },

    // ----- Packages -----
    { id: "p-basic", group: "pkg", name: "Basic Health Check", price: 450, includes: ["cbc", "fbs", "ua"],
      en: "CBC, FBS and Urinalysis.",
      ceb: "CBC, FBS ug Urinalysis." },
    { id: "p-diab", group: "pkg", name: "Diabetes Check", price: 950, includes: ["fbs", "lipid", "crea", "ua"],
      en: "FBS, Lipid Profile, Creatinine and Urinalysis.",
      ceb: "FBS, Lipid Profile, Creatinine ug Urinalysis." },
    { id: "p-kidney", group: "pkg", name: "Kidney Check", price: 550, includes: ["bun", "crea", "bua", "ua"],
      en: "BUN, Creatinine, Uric Acid and Urinalysis.",
      ceb: "BUN, Creatinine, Uric Acid ug Urinalysis." },
    { id: "p-heart", group: "pkg", name: "Heart Check", price: 1000, includes: ["lipid", "fbs", "ecg"], confirm: true,
      en: "Lipid Profile, FBS and ECG.",
      ceb: "Lipid Profile, FBS ug ECG." },
    { id: "p-employ", group: "pkg", name: "Pre-Employment Basic", price: 500, includes: ["cbc", "ua", "fa", "btype"],
      en: "CBC, Urinalysis, Fecalysis and Blood Typing. Ask us what your employer requires.",
      ceb: "CBC, Urinalysis, Fecalysis ug Blood Typing. Pangutana kung unsa ang gikinahanglan sa imong employer." }
  ],

  prep: {
    fast8:   { en: "Fasting 8–10 hrs",        ceb: "Puasa 8–10 ka oras",      tone: "amber" },
    fast10:  { en: "Fasting 10–12 hrs",       ceb: "Puasa 10–12 ka oras",     tone: "amber" },
    period:  { en: "Not during menstruation", ceb: "Dili samtang adunay regla", tone: "amber" },
    stool:   { en: "Stool container",         ceb: "Sudlanan sa tae",          tone: "blue" },
    urine:   { en: "First-morning urine",     ceb: "Unang ihi sa buntag",      tone: "blue" },
    consent: { en: "Confidential",            ceb: "Kumpidensyal",             tone: "green" }
  }
};
