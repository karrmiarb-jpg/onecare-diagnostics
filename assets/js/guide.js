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
      en: { what: "Measures the sugar (glucose) in your blood after fasting.", checks: "Your blood sugar level when you haven't eaten.", why: "Used to screen for and monitor diabetes.", prep: "Fast for 8–10 hours. You may take small sips of water if needed." },
      ceb: { what: "Sukdon ang asukar (glucose) sa imong dugo human sa pagpuasa.", checks: "Ang lebel sa asukar sa dugo kung wala pa ka mokaon.", why: "Gamiton sa pag-screen ug pagbantay sa diabetes.", prep: "Puasa og 8–10 ka oras. Pwede ka muinum og ginagmay nga higop sa tubig kung kinahanglan." } },
    { topic: "sugar", name: "RBS (Random Blood Sugar)",
      en: { what: "Measures your blood sugar at any time of day.", checks: "Your blood sugar level at the time of the test.", why: "A quick check when fasting isn't possible, or when your doctor wants a reading right away.", prep: "No fasting needed." },
      ceb: { what: "Sukdon ang asukar sa dugo bisan unsang orasa.", checks: "Ang lebel sa asukar sa dugo sa oras sa test.", why: "Dali nga check kung dili makapuasa, o kung gusto sa doktor makita dayon.", prep: "Dili kinahanglan mopuasa." } },
    { topic: "sugar", name: "Lipid Profile",
      en: { what: "A group of tests on the fats in your blood.", checks: "Total cholesterol, HDL (the 'good' cholesterol), LDL (the 'bad' cholesterol) and triglycerides.", why: "Helps your doctor check your heart and blood vessel health.", prep: "Fast for 10–12 hours. You may take small sips of water if needed." },
      ceb: { what: "Grupo sa mga test sa tambok sa imong dugo.", checks: "Total cholesterol, HDL (ang 'maayo' nga kolesterol), LDL (ang 'dili maayo' nga kolesterol) ug triglycerides.", why: "Motabang sa doktor pagsusi sa kahimsog sa kasingkasing ug ugat.", prep: "Puasa og 10–12 ka oras. Pwede ka muinum og ginagmay nga higop sa tubig kung kinahanglan." } },

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


  // ---------- "Tell us what you feel" ----------
  // Guide test name -> ids on the Prices page
  const PRICE_IDS = {
    "CBC (Complete Blood Count)": ["cbc"], "Blood Typing (ABO & Rh)": ["btype"], "Clotting & Bleeding Time": ["ctbt"], "ESR": ["esr"],
    "FBS (Fasting Blood Sugar)": ["fbs"], "RBS (Random Blood Sugar)": ["rbs"], "Lipid Profile": ["lipid"],
    "BUN & Creatinine": ["bun", "crea"], "Uric Acid": ["bua"], "SGPT / ALT & SGOT / AST": ["sgpt", "sgot"],
    "Urinalysis": ["ua"], "Fecalysis": ["fa"], "Fecal Occult Blood Test": ["fobt"], "Pregnancy Test (Urine)": ["preg"],
    "Dengue Rapid Test": ["dengue"], "Hepatitis B Screening (HBsAg)": ["hbsag"], "Syphilis Screening": ["syph"],
    "HIV Screening": ["hiv"], "ECG (Electrocardiogram)": ["ecg"]
  };

  // Words people might type (English, Bisaya, some Tagalog) -> tests doctors commonly ask for.
  // Kept simple and conservative on purpose. To be reviewed by our RMT.
  const SYMPTOMS = [
    { words: ["fever", "feverish", "hilanat", "hilantan", "gihilantan", "hilanaton", "init", "inito", "kainit", "init akong lawas", "lagnat", "nilalagnat", "chills", "katugnaw"],
      en: "Fever", ceb: "Hilanat",
      tests: ["CBC (Complete Blood Count)", "Dengue Rapid Test", "Urinalysis"] },
    { words: ["dengue", "rashes", "pantal", "pula sa panit", "bleeding gums"],
      en: "Possible dengue", ceb: "Basin dengue",
      tests: ["Dengue Rapid Test", "CBC (Complete Blood Count)"] },
    { words: ["tired", "weak", "fatigue", "pale", "dizzy", "anemia", "anemic", "kapoy", "luya", "kaluya", "luspad", "lipong", "malipong", "hilo", "pagod", "nahihilo", "maputla"],
      en: "Tired, weak, pale or dizzy", ceb: "Kapoy, luya, luspad o malipong",
      tests: ["CBC (Complete Blood Count)", "FBS (Fasting Blood Sugar)"] },
    { words: ["thirst", "uhaw", "giuhaw", "frequent urin", "pee a lot", "pee often", "kanunay mangihi", "permi mangihi", "diabetes", "diabetic", "sugar", "asukar", "tam-is", "weight loss", "niwang"],
      en: "Thirst, frequent peeing or sugar concerns", ceb: "Uhaw, kanunay mangihi o asukar",
      tests: ["FBS (Fasting Blood Sugar)", "RBS (Random Blood Sugar)", "Urinalysis"] },
    { words: ["painful urin", "burning urin", "pain when pee", "uti", "hapdos", "sakit mangihi", "sakit pag-ihi", "cloudy urine", "ihi nga lubog", "masakit umihi"],
      en: "Pain or burning when peeing", ceb: "Sakit o hapdos pag-ihi",
      tests: ["Urinalysis", "CBC (Complete Blood Count)"] },
    { words: ["stomach", "tummy", "abdominal", "diarrhea", "diarrhoea", "lbm", "loose stool", "worm", "tiyan", "libang", "kalibang", "nagkalibang", "bitok", "tae", "sakit ng tiyan", "pagtatae"],
      en: "Stomach pain, diarrhea or worms", ceb: "Sakit sa tiyan, kalibang o bitok",
      tests: ["Fecalysis", "CBC (Complete Blood Count)"] },
    { words: ["blood in stool", "bloody stool", "black stool", "dugo sa tae", "itom nga tae", "itom ang tae"],
      en: "Blood in the stool or black stool", ceb: "Dugo sa tae o itom nga tae",
      tests: ["Fecal Occult Blood Test", "CBC (Complete Blood Count)"] },
    { words: ["joint", "knee", "gout", "big toe", "rayuma", "arthritis", "lutahan", "tuhod", "kasu-kasuan"],
      en: "Joint pain or gout", ceb: "Sakit sa lutahan o gout",
      tests: ["Uric Acid", "ESR"] },
    { words: ["yellow skin", "yellow eyes", "jaundice", "dalag", "naninilaw", "liver", "atay", "hepatitis", "alcohol", "drink a lot", "palahubog", "hubog"],
      en: "Liver concerns or yellow skin or eyes", ceb: "Atay o nagdalag ang panit o mata",
      tests: ["SGPT / ALT & SGOT / AST", "Hepatitis B Screening (HBsAg)"] },
    { words: ["kidney", "bato sa kidney", "swollen feet", "swelling", "manas", "hubag ang tiil", "high blood", "hypertension", "alta presyon", "highblood"],
      en: "Kidney concerns, swelling or high blood pressure", ceb: "Kidney, manas o high blood",
      tests: ["BUN & Creatinine", "Urinalysis", "Lipid Profile"] },
    { words: ["palpitat", "heart", "chest", "kulba", "kasingkasing", "dughan", "dibdib", "kumakabog"],
      en: "Heart or chest discomfort", ceb: "Kasingkasing o dughan",
      tests: ["ECG (Electrocardiogram)", "Lipid Profile"] },
    { words: ["cholesterol", "kolesterol", "overweight", "obese", "tambok", "fatty food", "taba"],
      en: "Cholesterol or weight concerns", ceb: "Kolesterol o katambok",
      tests: ["Lipid Profile", "FBS (Fasting Blood Sugar)"] },
    { words: ["pregnan", "buntis", "late period", "missed period", "delayed period", "nalangan", "wala regla", "wala pa regla", "wala ko regla", "prenatal", "nagdadalang"],
      en: "Possible pregnancy or prenatal check-up", ceb: "Basin buntis o prenatal check-up",
      tests: ["Pregnancy Test (Urine)", "CBC (Complete Blood Count)", "Blood Typing (ABO & Rh)", "Urinalysis", "Hepatitis B Screening (HBsAg)", "Syphilis Screening", "HIV Screening"] },
    { words: ["surgery", "operation", "opera", "operahan", "tooth extraction", "bunot", "ibot ngipon", "ibton", "procedure"],
      en: "Before surgery or a procedure", ceb: "Sa dili pa operahan o procedure",
      tests: ["CBC (Complete Blood Count)", "Clotting & Bleeding Time", "Blood Typing (ABO & Rh)", "ECG (Electrocardiogram)"] },
    { words: ["sti", "std", "unprotected", "exposed", "exposure", "discharge", "sore down there", "nana", "sex"],
      en: "Possible exposure to an infection (private and confidential)", ceb: "Tingali na-expose sa impeksyon (pribado ug kumpidensyal)",
      tests: ["HIV Screening", "Syphilis Screening", "Hepatitis B Screening (HBsAg)"] },
    { words: ["headache", "head ache", "sakit ulo", "sakit akong ulo", "sakit sa ulo", "labad", "gilabdan", "sakit ng ulo", "masakit ulo", "migraine"],
      en: "Headache", ceb: "Sakit sa ulo",
      tests: ["CBC (Complete Blood Count)", "RBS (Random Blood Sugar)"] },
    { words: ["cough", "ubo", "inubo", "giubo", "colds", "sipon", "sip-on", "flu", "trangkaso", "sore throat", "sakit tutunlan", "tutunlan", "tonsil"],
      en: "Cough, colds or sore throat", ceb: "Ubo, sip-on o sakit sa tutunlan",
      tests: ["CBC (Complete Blood Count)"] },
    { words: ["body pain", "body ache", "muscle pain", "sakit lawas", "sakit akong lawas", "sakit kalawasan", "pangalawas", "sakit ng katawan", "nanakit"],
      en: "Body or muscle pain", ceb: "Sakit sa lawas",
      tests: ["CBC (Complete Blood Count)"] },
    { words: ["vomit", "nausea", "nauseous", "nagsuka", "pagsuka", "sukaon", "luod", "giluod", "nasusuka"],
      en: "Vomiting or nausea", ceb: "Pagsuka o luod",
      tests: ["CBC (Complete Blood Count)", "Urinalysis", "Fecalysis"] },
    { words: ["back pain", "lower back", "flank", "sakit hawak", "sakit akong hawak", "sakit sa hawak", "hawak", "balakang", "sakit ng likod"],
      en: "Lower back or side pain", ceb: "Sakit sa hawak",
      tests: ["Urinalysis", "BUN & Creatinine"] },
    { words: ["blurry", "blurred", "labo akong mata", "labo ang mata", "slow healing", "wound won't heal", "samad dugay maayo", "dugay maayo ang samad", "tingling", "pangimgim", "tusok-tusok"],
      en: "Blurry eyes, slow-healing wounds or tingling", ceb: "Labo nga mata, samad nga dugay maayo o pangimgim",
      tests: ["FBS (Fasting Blood Sugar)", "RBS (Random Blood Sugar)"] },
    { words: ["bruise", "bruising", "pasa", "nosebleed", "nose bleed", "nagdugo ilong", "nagdugo ang ilong", "dugo sa ilong", "easy bleeding"],
      en: "Easy bruising or nosebleeds", ceb: "Dali mapasa o nagdugo ang ilong",
      tests: ["CBC (Complete Blood Count)", "Clotting & Bleeding Time"] },
    { words: ["heavy period", "heavy menstruation", "daghang regla", "taas nga regla", "dugay mahuman regla", "malakas ang regla"],
      en: "Heavy periods", ceb: "Daghan o dugay nga regla",
      tests: ["CBC (Complete Blood Count)"] },
    { words: ["check-up", "checkup", "check up", "annual", "pre-employment", "requirement", "work", "school", "trabaho", "eskwelahan", "medical"],
      en: "Check-up or work and school requirements", ceb: "Check-up o requirements sa trabaho ug eskwelahan",
      tests: ["CBC (Complete Blood Count)", "Urinalysis", "Fecalysis", "FBS (Fasting Blood Sugar)"] }
  ];

  // Signs that need a doctor or hospital now, not a lab visit
  const URGENT = ["chest pain", "sakit dughan", "sakit akong dughan", "sakit sa dughan", "hard to breathe", "can't breathe", "cant breathe", "shortness of breath", "difficulty breathing",
    "lisod ginhawa", "lisod moginhawa", "hirap huminga", "faint", "nakuyapan", "kuyapan", "nawalan ng malay", "seizure", "kombulsyon", "kumbulsyon",
    "vomiting blood", "nagsuka dugo", "suka dugo", "heavy bleeding", "daghang dugo", "unconscious", "stroke", "sudden numb", "face drooping", "slurred", "ngiwi", "severe", "grabe kasakit", "dili makaginhawa"];

  // One word: short words must match whole (plural ok); longer ones may sit inside a word (hilantan -> gihilantan).
  // A phrase matches when its words appear in order, close together ("nagdugo akong ilong" = "nagdugo ilong").
  const JOINERS = ["and", "ug", "og", "at", "but", "pero", "unya", "with", "then"];
  const tokMatch = (tok, w) => w.length <= 4 ? tok === w || tok === w + "s" : tok.includes(w);
  const has = (text, w) => {
    const toks = text.trim().split(" ");
    const parts = w.split(" ").filter(p => p.length > 2 || !w.includes(" "));
    if (!w.includes(" ")) return w.includes("-") ? text.includes(w) : toks.some(tk => tokMatch(tk, w));
    if (text.includes(w)) return true;
    // each next word within 3 words of the one before
    const go = (pi, from) => {
      if (pi === parts.length) return true;
      for (let i = from; i < toks.length && (pi === 0 || i <= from + 2); i++) {
        if (pi > 0 && JOINERS.includes(toks[i])) break; // "high fever and blood" is not "high blood"
        if (tokMatch(toks[i], parts[pi]) && go(pi + 1, i + 1)) return true;
      }
      return false;
    };
    return go(0, 0);
  };

  // Built-in word list: always available, free, and used when the AI reader is off
  function keywordResult(raw) {
    const text = " " + raw.toLowerCase().replace(/[^a-z0-9ñ'\- ]+/g, " ").replace(/\s+/g, " ") + " ";
    const hits = SYMPTOMS.filter(s => s.words.some(w => has(text, w)));
    const items = new Map(); // test name -> symptoms that point to it
    hits.forEach(s => s.tests.forEach(n => {
      if (!items.has(n)) items.set(n, []);
      items.get(n).push(s);
    }));
    return { urgent: URGENT.some(w => has(text, w)), items: [...items].map(([name, syms]) => ({ name, syms })) };
  }

  let aiOff = false; // set when the AI reader isn't set up, so we stop asking
  async function aiResult(raw) {
    if (aiOff) return null;
    try {
      const r = await fetch("/api/suggest-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: raw.slice(0, 500), lang: window.OC.lang, tests: TESTS.map(x => ({ name: x.name, checks: x.en.checks })) })
      });
      if ([404, 405, 501, 503].includes(r.status)) { aiOff = true; return null; }
      if (!r.ok) return null;
      const out = await r.json();
      return { urgent: !!out.urgent, items: out.suggestions.map(sg => ({ name: sg.name, reason: sg.reason })) };
    } catch (e) { return null; }
  }

  let last = null;
  async function suggest(raw) {
    const out = document.getElementById("feel-out");
    if (!raw.trim()) { out.innerHTML = ""; last = null; return; }
    const kw = keywordResult(raw);
    if (!aiOff) out.innerHTML = `<div class="note-box"><span class="spinner" aria-hidden="true"></span><span>${t("feel.thinking", "Finding tests that may help…")}</span></div>`;
    const ai = await aiResult(raw);
    // Use the AI's answer when it found something; keep the built-in danger-word check either way
    last = ai && ai.items.length ? { urgent: ai.urgent || kw.urgent, items: ai.items } : { urgent: kw.urgent || !!(ai && ai.urgent), items: kw.items };
    showResult();
  }

  function showResult() {
    const out = document.getElementById("feel-out");
    if (!last) return;
    const ceb = window.OC.lang === "ceb";
    const urgentBox = last.urgent ? `
      <div class="note-box amber feel-urgent"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>
        <span><b>${t("feel.urgH", "This may need a doctor right away.")}</b> ${t("feel.urgP", "If it is severe or sudden, go to the nearest hospital or call 911 now. Don't wait for a lab test.")}</span></div>` : "";

    if (!last.items.length) {
      out.innerHTML = urgentBox + `<p class="feel-none">${t("feel.none", "We couldn't match that to a test. Try simple words like \"fever\", \"sakit tiyan\" or \"always thirsty\", or call us and we'll help you.")}</p>`;
      return;
    }

    const esc = v => String(v).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const cards = last.items.map(it => {
      const x = TESTS.find(tt => tt.name === it.name);
      const c = ceb ? x.ceb : x.en;
      const why = it.reason ? esc(it.reason) : `${t("feel.for", "For:")} ${it.syms.map(sy => ceb ? sy.ceb : sy.en).join(", ")}`;
      return `<li><b>${x.name}</b><small>${c.what}</small><span class="feel-why">${why}</span></li>`;
    }).join("");
    const names = last.items.map(it => it.name);
    out.innerHTML = urgentBox + `
      <h3>${t("feel.resH", "Tests doctors often ask for")}</h3>
      <ul class="feel-list">${cards}</ul>
      <div class="feel-actions">
        <button class="btn btn-primary btn-sm" type="button" data-feel-prices="${esc(names.join("|"))}">${t("feel.prices", "See prices for these tests")}</button>
      </div>`;
  }

  // Tick the suggested tests on the Prices page (the estimator restores them from this)
  function openPrices(names) {
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem("oc-est") || "{}"); } catch (e) {}
    const ids = new Set(saved.ids || []);
    names.forEach(n => (PRICE_IDS[n] || []).forEach(id => ids.add(id)));
    try { sessionStorage.setItem("oc-est", JSON.stringify({ ids: [...ids], senior: !!saved.senior })); } catch (e) {}
    location.href = "tests.html";
  }

  const t = (k, en) => window.OC.t(k, en);

  let topic = "all";

  function render() {
    const ceb = window.OC.lang === "ceb";
    document.getElementById("guide-filter").innerHTML = TOPICS.map(tp =>
      `<button class="chip-btn" type="button" data-topic="${tp.id}" aria-pressed="${tp.id === topic}">${ceb ? tp.ceb : tp.en}</button>`
    ).join("");
    document.getElementById("guide").innerHTML = TESTS
      .filter(x => topic === "all" || x.topic === topic)
      .filter(x => {
        const q = (document.getElementById("guide-search").value || "").trim().toLowerCase();
        if (!q) return true;
        const c = ceb ? x.ceb : x.en;
        return [x.name, c.what, c.checks, c.why, x.en.what, x.en.why].join(" ").toLowerCase().includes(q);
      })
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
      }).join("") || `<p class="feel-none">${t("guide.noMatch", "No test matches your search. Try another word, or call us and we'll help you.")}</p>`;
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-topic]");
    if (b) { topic = b.dataset.topic; render(); }
    const p = e.target.closest("[data-feel-prices]");
    if (p) openPrices(p.dataset.feelPrices.split("|"));
  });
  document.getElementById("guide-search").addEventListener("input", render);
  document.getElementById("feel-form").addEventListener("submit", e => {
    e.preventDefault();
    suggest(document.getElementById("feel-input").value);
  });
  document.addEventListener("oc:lang", () => {
    render();
    showResult();
  });
})();
