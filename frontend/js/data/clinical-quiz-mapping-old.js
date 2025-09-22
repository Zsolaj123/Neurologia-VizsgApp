/**
 * Clinical Quiz Topic Mapping
 * Maps individual clinical topics (60-179) to their quiz files and specific questions
 */

export const clinicalQuizMapping = {
    // Topics 60-64: EEG, sleep, urination, plasticity, genetics
    60: {
        title: "Az EEG élettani alapjai",
        quizFile: "Vizsgálómódszerek, alap klinikum/60-64. EEG, alvás, ürítés, plasztic, genetika.html",
        questionFilter: (question) => {
            const keywords = ["eeg", "elektroencefalográf", "hullám", "ritmus", "alpha", "beta", "theta", "delta", "gamma", "10-20", "elvezetés", "artefaktum"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    61: {
        title: "Az alvás fiziológiája",
        quizFile: "Vizsgálómódszerek, alap klinikum/60-64. EEG, alvás, ürítés, plasztic, genetika.html",
        questionFilter: (question) => {
            const keywords = ["alvás", "rem", "nrem", "melatonin", "cirkadián", "alvási ciklus", "k-komplex", "alvási orsó", "orexin", "növekedési hormon"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    62: {
        title: "A vizelet- és székletürítés szabályozása",
        quizFile: "Vizsgálómódszerek, alap klinikum/60-64. EEG, alvás, ürítés, plasztic, genetika.html",
        questionFilter: (question) => {
            const keywords = ["vizelet", "széklet", "ürítés", "hólyag", "sphincter", "kontinencia", "inkontinencia", "detrusor"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    63: {
        title: "Az idegrendszeri szerkezetek plaszticitása",
        quizFile: "Vizsgálómódszerek, alap klinikum/60-64. EEG, alvás, ürítés, plasztic, genetika.html",
        questionFilter: (question) => {
            const keywords = ["plaszticitás", "szinapszis", "neuroplaszticitás", "regeneráció", "sprouting", "ltp", "long-term potentiation"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    64: {
        title: "Genetikai alapismeretek és genetikai tanácsadás a neurológiában",
        quizFile: "Vizsgálómódszerek, alap klinikum/60-64. EEG, alvás, ürítés, plasztic, genetika.html",
        questionFilter: (question) => {
            const keywords = ["genetika", "öröklés", "mutáció", "kromoszóma", "autoszomális", "x-hez kötött", "mitokondriális", "penetrancia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 65-69: Drug interactions, CSF, EEG, EP
    65: {
        title: "Gyógyszerinterakciók a neurológiai therápiában",
        quizFile: "Vizsgálómódszerek, alap klinikum/65-69. gyógyszer, liquor, EEG, EP.html",
        questionFilter: (question) => {
            const keywords = ["gyógyszer", "interakció", "cyp", "enzim", "indukció", "inhibíció", "farmakokinetika"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    66: {
        title: "Liquorkémiai, -cytológiai és -keringési vizsgálatok",
        quizFile: "Vizsgálómódszerek, alap klinikum/65-69. gyógyszer, liquor, EEG, EP.html",
        questionFilter: (question) => {
            const keywords = ["liquor", "cerebrospinalis", "csf", "fehérje", "glükóz", "sejt", "lumbal", "punctio"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    67: {
        title: "A véres liquor",
        quizFile: "Vizsgálómódszerek, alap klinikum/65-69. gyógyszer, liquor, EEG, EP.html",
        questionFilter: (question) => {
            const keywords = ["véres liquor", "xanthochromia", "subarachnoidalis", "sav", "vörösvértest", "hemoglobin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    68: {
        title: "Az EEG vizsgálat indikációja",
        quizFile: "Vizsgálómódszerek, alap klinikum/65-69. gyógyszer, liquor, EEG, EP.html",
        questionFilter: (question) => {
            const keywords = ["eeg indikáció", "epilepszia", "tudatzavar", "encephalopathia", "agyhalál"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    69: {
        title: "A kiváltott válasz vizsgálatok",
        quizFile: "Vizsgálómódszerek, alap klinikum/65-69. gyógyszer, liquor, EEG, EP.html",
        questionFilter: (question) => {
            const keywords = ["kiváltott", "evoked", "vep", "baep", "ssep", "latencia", "amplitúdó"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 70-75: EMG, ENG, CT, MR, Angio, Ultrasound
    70: {
        title: "Az EMG",
        quizFile: "Vizsgálómódszerek, alap klinikum/70-75 EMG_ENG_CT_MR_ANGIO_UH.html",
        questionFilter: (question) => {
            const keywords = ["emg", "elektromiográfia", "izom", "motor unit", "fibrillatio", "fascikuláció", "denervatio"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    71: {
        title: "Az ENG",
        quizFile: "Vizsgálómódszerek, alap klinikum/70-75 EMG_ENG_CT_MR_ANGIO_UH.html",
        questionFilter: (question) => {
            const keywords = ["eng", "elektroneurográfia", "vezetési sebesség", "distalis latencia", "f-hullám", "h-reflex"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    72: {
        title: "CT és MR vizsgálatok a neurológiában",
        quizFile: "Vizsgálómódszerek, alap klinikum/70-75 EMG_ENG_CT_MR_ANGIO_UH.html",
        questionFilter: (question) => {
            const keywords = ["ct", "mr", "mri", "hounsfield", "kontraszt", "t1", "t2", "flair", "dwi", "gadolinium"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    73: {
        title: "Angiographia, DSA, MRA",
        quizFile: "Vizsgálómódszerek, alap klinikum/70-75 EMG_ENG_CT_MR_ANGIO_UH.html",
        questionFilter: (question) => {
            const keywords = ["angiográfia", "dsa", "mra", "ér", "stenosis", "aneurysma", "katéter"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    74: {
        title: "Funkcionális képalkotó vizsgálatok a neurológiában",
        quizFile: "Vizsgálómódszerek, alap klinikum/70-75 EMG_ENG_CT_MR_ANGIO_UH.html",
        questionFilter: (question) => {
            const keywords = ["funkcionális", "fmri", "pet", "spect", "bold", "metabolizmus", "aktiváció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    75: {
        title: "A nyaki és intracranialis erek ultrahang vizsgálata",
        quizFile: "Vizsgálómódszerek, alap klinikum/70-75 EMG_ENG_CT_MR_ANGIO_UH.html",
        questionFilter: (question) => {
            const keywords = ["ultrahang", "doppler", "carotis", "tcd", "transcranialis", "imt", "stenosis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 76-79: Hemorheology, smell, gaze, pupil
    76: {
        title: "Haemorheológiai és véralvadás vizsgálatok cerebrovascularis betegségekben",
        quizFile: "Vizsgálómódszerek, alap klinikum/76-79. HEMAT_SZAGLÁS_TEKINTÉS_PUPILLA.html",
        questionFilter: (question) => {
            const keywords = ["hemorheológia", "véralvadás", "viskozitás", "hematokrit", "fibrinogén", "thrombocyta"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    77: {
        title: "Szaglászavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/76-79. HEMAT_SZAGLÁS_TEKINTÉS_PUPILLA.html",
        questionFilter: (question) => {
            const keywords = ["szaglás", "anosmia", "hyposmia", "olfactorius", "upsit", "parkinson"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    78: {
        title: "Tekintés- és szemmozgászavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/76-79. HEMAT_SZAGLÁS_TEKINTÉS_PUPILLA.html",
        questionFilter: (question) => {
            const keywords = ["tekintés", "szemmozgás", "szakkád", "smooth pursuit", "optokinetikus", "paréz"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    79: {
        title: "A pupilla beidegzésének zavarai",
        quizFile: "Vizsgálómódszerek, alap klinikum/76-79. HEMAT_SZAGLÁS_TEKINTÉS_PUPILLA.html",
        questionFilter: (question) => {
            const keywords = ["pupilla", "mydriasis", "miosis", "horner", "anisocoria", "fényreflex"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 80-84: Diplopia, nystagmus, facial, Bell, dysarthria
    80: {
        title: "Diplopia",
        quizFile: "Vizsgálómódszerek, alap klinikum/80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html",
        questionFilter: (question) => {
            const keywords = ["diplopia", "kettőslátás", "binokuláris", "monokuláris", "szemmozgató"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    81: {
        title: "A nystagmus",
        quizFile: "Vizsgálómódszerek, alap klinikum/80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html",
        questionFilter: (question) => {
            const keywords = ["nystagmus", "vestibularis", "optokinetikus", "horizontális", "vertikális", "rotatorius"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    82: {
        title: "N. facialis laesiok",
        quizFile: "Vizsgálómódszerek, alap klinikum/80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html",
        questionFilter: (question) => {
            const keywords = ["facialis", "arcideg", "központi", "perifériás", "mimikai", "lagophthalmus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    83: {
        title: "A bell paresis diagnózisa és kezelése",
        quizFile: "Vizsgálómódszerek, alap klinikum/80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html",
        questionFilter: (question) => {
            const keywords = ["bell", "idiopathiás facialis", "prednisolon", "szteroid", "house-brackmann"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    84: {
        title: "Dysarthria, dysphagia",
        quizFile: "Vizsgálómódszerek, alap klinikum/80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html",
        questionFilter: (question) => {
            const keywords = ["dysarthria", "dysphagia", "beszédzavar", "nyelészavar", "bulbaris", "pseudobulbaris"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 85-89: Muscle weakness, sensory, reflexes, cerebellum
    85: {
        title: "Izomgyengeség neurológiai okai",
        quizFile: "Vizsgálómódszerek, alap klinikum/85-89. IZOMGYEENG_ÉRZÉS_DISSZOC_REFLEX_KISAGY.html",
        questionFilter: (question) => {
            const keywords = ["izomgyengeség", "paresis", "plegia", "motoneuron", "myopathia", "neuropathia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    86: {
        title: "Érzészavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/85-89. IZOMGYEENG_ÉRZÉS_DISSZOC_REFLEX_KISAGY.html",
        questionFilter: (question) => {
            const keywords = ["érzészavar", "hypaesthesia", "paraesthesia", "allodynia", "hyperalgesia", "dermatomák"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    87: {
        title: "Disszociált érzészavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/85-89. IZOMGYEENG_ÉRZÉS_DISSZOC_REFLEX_KISAGY.html",
        questionFilter: (question) => {
            const keywords = ["disszociált", "sziringo", "brown-séquard", "spinothalamicus", "hátulsó kötél"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    88: {
        title: "Reflexeltérések",
        quizFile: "Vizsgálómódszerek, alap klinikum/85-89. IZOMGYEENG_ÉRZÉS_DISSZOC_REFLEX_KISAGY.html",
        questionFilter: (question) => {
            const keywords = ["reflex", "hyperreflexia", "areflexia", "babinski", "klonus", "saját reflex"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    89: {
        title: "A kisagy károsodásának tünetei és a kisagy károsodásával járó kórképek",
        quizFile: "Vizsgálómódszerek, alap klinikum/85-89. IZOMGYEENG_ÉRZÉS_DISSZOC_REFLEX_KISAGY.html",
        questionFilter: (question) => {
            const keywords = ["kisagy", "cerebellum", "ataxia", "dysmetria", "tremor", "dysdiadochokinesis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 90-95: Ataxia, aphasia, neglect, apraxia, executive
    90: {
        title: "Végtag- és törzsataxiák",
        quizFile: "Vizsgálómódszerek, alap klinikum/90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html",
        questionFilter: (question) => {
            const keywords = ["ataxia", "végtag", "törzs", "koordináció", "romberg", "tandem járás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    91: {
        title: "Folyamatos aphasiák",
        quizFile: "Vizsgálómódszerek, alap klinikum/90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html",
        questionFilter: (question) => {
            const keywords = ["aphasia", "broca", "wernicke", "globális", "kondukciós", "anómia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    92: {
        title: "Aphasia vizsgálata a betegágy mellett",
        quizFile: "Vizsgálómódszerek, alap klinikum/90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html",
        questionFilter: (question) => {
            const keywords = ["aphasia vizsgálat", "beszédértés", "ismétlés", "megnevezés", "olvasás", "írás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    93: {
        title: "Neglect",
        quizFile: "Vizsgálómódszerek, alap klinikum/90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html",
        questionFilter: (question) => {
            const keywords = ["neglect", "elhanyagolás", "hemineglekt", "térfél", "extinctio", "anosognosia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    94: {
        title: "Apraxia, agnosia",
        quizFile: "Vizsgálómódszerek, alap klinikum/90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html",
        questionFilter: (question) => {
            const keywords = ["apraxia", "agnosia", "ideomotoros", "ideatorikus", "konstrukciós", "vizuális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    95: {
        title: "Exekutiv zavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html",
        questionFilter: (question) => {
            const keywords = ["exekutív", "végrehajtó", "frontális", "tervezés", "gátlás", "flexibilitás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 96-99: Liberation signs, unconscious, confused, hypnoid
    96: {
        title: "A liberációs jelek",
        quizFile: "Vizsgálómódszerek, alap klinikum/96-99. LIBERÁCIÓS_ESZMÉLETLEN_ZAVART_HYPNOID.html",
        questionFilter: (question) => {
            const keywords = ["liberációs", "primitív reflex", "szopó", "fogó", "palmomentallis", "glabella"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    97: {
        title: "Az eszméletlen beteg",
        quizFile: "Vizsgálómódszerek, alap klinikum/96-99. LIBERÁCIÓS_ESZMÉLETLEN_ZAVART_HYPNOID.html",
        questionFilter: (question) => {
            const keywords = ["eszméletlen", "kóma", "gcs", "glasgow", "tudatzavar", "stupor"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    98: {
        title: "A zavart beteg",
        quizFile: "Vizsgálómódszerek, alap klinikum/96-99. LIBERÁCIÓS_ESZMÉLETLEN_ZAVART_HYPNOID.html",
        questionFilter: (question) => {
            const keywords = ["zavart", "konfúzió", "delírium", "dezorientáció", "agitáció", "hallucinatio"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    99: {
        title: "Hypnoid tudatzavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/96-99. LIBERÁCIÓS_ESZMÉLETLEN_ZAVART_HYPNOID.html",
        questionFilter: (question) => {
            const keywords = ["hypnoid", "aluszékonyság", "somnolentia", "sopor", "letargia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 100-105: Non-hypnoid, hernia, dementia, memory
    100: {
        title: "Nem hypnoid tudatzavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html",
        questionFilter: (question) => {
            const keywords = ["nem hypnoid", "tudatzavar", "konfúzió", "delírium", "pszichózis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    101: {
        title: "Herniációs szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html",
        questionFilter: (question) => {
            const keywords = ["herniáció", "beékelődés", "tentorialis", "uncus", "foramen magnum"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    102: {
        title: "Demencia szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html",
        questionFilter: (question) => {
            const keywords = ["demencia", "alzheimer", "vaszkuláris", "lewy", "frontotemporális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    103: {
        title: "Az emlékezés és zavarai",
        quizFile: "Vizsgálómódszerek, alap klinikum/100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html",
        questionFilter: (question) => {
            const keywords = ["emlékezés", "memória", "amnézia", "hippocampus", "korsakoff"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    104: {
        title: "Kognitív funkciók vizsgálata",
        quizFile: "Vizsgálómódszerek, alap klinikum/100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html",
        questionFilter: (question) => {
            const keywords = ["kognitív", "mmse", "moca", "órajz", "neuropszichológia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    105: {
        title: "Demencia differenciáldiagnózisa",
        quizFile: "Vizsgálómódszerek, alap klinikum/100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html",
        questionFilter: (question) => {
            const keywords = ["pseudodemencia", "depresszió", "reverzibilis", "differenciál"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 106-110: Thalamus, spinal, GV trauma, peripheral, back pain
    106: {
        title: "Thalamus szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DERÉK.html",
        questionFilter: (question) => {
            const keywords = ["thalamus", "déjerine", "roussy", "centrális fájdalom", "szenzoros"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    107: {
        title: "Spinalis érkatasztrófák",
        quizFile: "Vizsgálómódszerek, alap klinikum/106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DERÉK.html",
        questionFilter: (question) => {
            const keywords = ["spinalis", "gerincvelői", "arteria spinalis", "myelopathia", "ischaemia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    108: {
        title: "Gerincvelő trauma",
        quizFile: "Vizsgálómódszerek, alap klinikum/106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DERÉK.html",
        questionFilter: (question) => {
            const keywords = ["gerincvelő trauma", "sérülés", "spinális shock", "tetraplegia", "paraplegia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    109: {
        title: "Főverőér perifériás betegségei",
        quizFile: "Vizsgálómódszerek, alap klinikum/106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DERÉK.html",
        questionFilter: (question) => {
            const keywords = ["főverőér", "perifériás", "artériás", "claudicatio", "kritikus végtagi"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    110: {
        title: "Derékfájás",
        quizFile: "Vizsgálómódszerek, alap klinikum/106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DERÉK.html",
        questionFilter: (question) => {
            const keywords = ["derékfájás", "lumbago", "ischialgia", "porckorong", "facet"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 111-115: Spinal roots, conus/cauda, lower limb, tardive, ACM
    111: {
        title: "Spinális gyökök és sérüléseik",
        quizFile: "Vizsgálómódszerek, alap klinikum/111-115. SPINGYÖK_CONUSCAUDA_ALSÓVÉGTAG_TARDIV_ACM.html",
        questionFilter: (question) => {
            const keywords = ["spinális gyök", "radiculopathia", "gyöki", "dermatoma", "myotoma"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    111: {
        title: "Stroke szekunder prevenció",
        quizFile: "Vizsgálómódszerek, alap klinikum/110-114. stroke prev_cerebrovascularis.html",
        questionFilter: (question) => {
            const keywords = ["szekunder prevenció", "aspirin", "clopidogrel", "statin", "antikoaguláns"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    112: {
        title: "Extracranialis nagyérstenosis",
        quizFile: "Vizsgálómódszerek, alap klinikum/110-114. stroke prev_cerebrovascularis.html",
        questionFilter: (question) => {
            const keywords = ["carotis stenosis", "extracranialis", "cea", "cas", "endarterectomia", "stent"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    113: {
        title: "Intracranialis nagyérstenosis",
        quizFile: "Vizsgálómódszerek, alap klinikum/110-114. stroke prev_cerebrovascularis.html",
        questionFilter: (question) => {
            const keywords = ["intracranialis stenosis", "wasid", "sammpris", "angioplasztika", "kollaterális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    114: {
        title: "Különleges okok miatt kialakuló cerebrovascularis kórképek",
        quizFile: "Vizsgálómódszerek, alap klinikum/110-114. stroke prev_cerebrovascularis.html",
        questionFilter: (question) => {
            const keywords = ["vasculitis", "dissectio", "moyamoya", "cadasil", "ritka stroke ok"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 115-119: Sinus thrombosis, epilepsy basics
    115: {
        title: "Agyi vénás sinus thrombosis",
        quizFile: "Vizsgálómódszerek, alap klinikum/115-119. VÉNÁS SINUS TROMB_EPILEPSY.html",
        questionFilter: (question) => {
            const keywords = ["sinus thrombosis", "vénás", "cvst", "heparin", "d-dimer", "mr venográfia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    116: {
        title: "Az epilepszia definíciója, epidemiológiája és klasszifikációja",
        quizFile: "Vizsgálómódszerek, alap klinikum/115-119. VÉNÁS SINUS TROMB_EPILEPSY.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia definíció", "epidemiológia", "klasszifikáció", "ilae", "roham típus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    117: {
        title: "Epilepsziás rohamformák I",
        quizFile: "Vizsgálómódszerek, alap klinikum/115-119. VÉNÁS SINUS TROMB_EPILEPSY.html",
        questionFilter: (question) => {
            const keywords = ["fokális roham", "generalizált", "tónusos-klónusos", "absence", "myoclonusos"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    118: {
        title: "Epilepsziás rohamformák II",
        quizFile: "Vizsgálómódszerek, alap klinikum/115-119. VÉNÁS SINUS TROMB_EPILEPSY.html",
        questionFilter: (question) => {
            const keywords = ["komplex fokális", "szekunder generalizáció", "aura", "postictalis", "todd"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    119: {
        title: "Epilepszia szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/115-119. VÉNÁS SINUS TROMB_EPILEPSY.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia szindróma", "west", "lennox", "rolandicus", "juvenilis myoclonusos"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 120-124: Epilepsy treatment
    120: {
        title: "Az epilepszia diagnózisa",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. EPILEPSIA DIAGNÓZIS_TERÁPIA.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia diagnózis", "eeg", "video-eeg", "mri", "interictalis", "ictalis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    121: {
        title: "Epilepszia és teherbeállítás",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. EPILEPSIA DIAGNÓZIS_TERÁPIA.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia terhesség", "teratogén", "folsav", "valproat", "lamotrigin", "eurap"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    122: {
        title: "Status epilepticus",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. EPILEPSIA DIAGNÓZIS_TERÁPIA.html",
        questionFilter: (question) => {
            const keywords = ["status epilepticus", "konvulzív", "non-konvulzív", "diazepam", "midazolam", "propofol"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    123: {
        title: "Az epilepszia gyógyszeres therápiája I",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. EPILEPSIA DIAGNÓZIS_TERÁPIA.html",
        questionFilter: (question) => {
            const keywords = ["antiepileptikum", "carbamazepin", "valproat", "lamotrigin", "levetiracetam"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    124: {
        title: "Az epilepszia gyógyszeres therápiája II",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. EPILEPSIA DIAGNÓZIS_TERÁPIA.html",
        questionFilter: (question) => {
            const keywords = ["új antiepileptikum", "perampanel", "brivaracetam", "lacosamid", "mellékhatás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 125-129: Epilepsy surgery, headache
    125: {
        title: "Az epilepszia sebészi kezelése és VNS",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129. EPILEPSIA MŰTÉT_FEJFÁJÁS.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia műtét", "resectio", "temporális", "vns", "vagus", "dbs"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    126: {
        title: "A fejfájás epidemiológiája és klasszifikációja",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129. EPILEPSIA MŰTÉT_FEJFÁJÁS.html",
        questionFilter: (question) => {
            const keywords = ["fejfájás epidemiológia", "klasszifikáció", "ichd", "primer", "szekunder"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    127: {
        title: "A migrén",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129. EPILEPSIA MŰTÉT_FEJFÁJÁS.html",
        questionFilter: (question) => {
            const keywords = ["migrén", "aura", "fotofóbia", "fonofóbia", "hányinger", "pulzáló"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    128: {
        title: "A fejfájások therápiája",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129. EPILEPSIA MŰTÉT_FEJFÁJÁS.html",
        questionFilter: (question) => {
            const keywords = ["fejfájás terápia", "triptan", "nsaid", "profilaxis", "beta-blokkoló", "cgrp"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    129: {
        title: "A tenziós fejfájás",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129. EPILEPSIA MŰTÉT_FEJFÁJÁS.html",
        questionFilter: (question) => {
            const keywords = ["tenziós fejfájás", "szorító", "kétoldali", "izomfeszülés", "stressz"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 130-134: Cluster, trigeminal, infections
    130: {
        title: "A cluster fejfájás",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. CLUSTER_TRIGEMIN_FERTŐZÉS.html",
        questionFilter: (question) => {
            const keywords = ["cluster", "hortoni", "egyoldali", "periódusok", "oxigén", "verapamil"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    131: {
        title: "Trigeminusneuralgia és egyéb craniális neuralgiformis fájdalmak",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. CLUSTER_TRIGEMIN_FERTŐZÉS.html",
        questionFilter: (question) => {
            const keywords = ["trigeminus neuralgia", "villanó fájdalom", "trigger", "carbamazepin", "mikrovascularis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    132: {
        title: "Bakteriális neuroinfekciók - meningitis I",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. CLUSTER_TRIGEMIN_FERTŐZÉS.html",
        questionFilter: (question) => {
            const keywords = ["bakteriális meningitis", "pneumococcus", "meningococcus", "purulens", "kernig", "brudzinski"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    133: {
        title: "Bakteriális neuroinfekciók - meningitis II",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. CLUSTER_TRIGEMIN_FERTŐZÉS.html",
        questionFilter: (question) => {
            const keywords = ["meningitis terápia", "ceftriaxon", "vancomycin", "dexamethason", "liquor lelet"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    134: {
        title: "Agyabscessus, egyéb bakteriális fertőzések",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. CLUSTER_TRIGEMIN_FERTŐZÉS.html",
        questionFilter: (question) => {
            const keywords = ["agyabscessus", "tályog", "gyűrű enhancement", "antibiotikum", "sebészi"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 135-139: Viral infections, encephalitis
    135: {
        title: "Vírusos meningitisek",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. VÍRUS_ENCEPHALITIS.html",
        questionFilter: (question) => {
            const keywords = ["vírusos meningitis", "enterovirus", "lymphocytás", "jóindulatú", "tüneti"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    136: {
        title: "Encephalitisek I (HSV, VZV)",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. VÍRUS_ENCEPHALITIS.html",
        questionFilter: (question) => {
            const keywords = ["hsv encephalitis", "herpes", "varicella", "temporalis", "acyclovir", "pcr"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    137: {
        title: "Encephalitisek II (egyéb vírusos)",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. VÍRUS_ENCEPHALITIS.html",
        questionFilter: (question) => {
            const keywords = ["kullancs encephalitis", "tbe", "west nile", "enterovirus", "arbovirus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    138: {
        title: "Autoimmun encephalitisek",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. VÍRUS_ENCEPHALITIS.html",
        questionFilter: (question) => {
            const keywords = ["autoimmun encephalitis", "nmda", "lgi1", "caspr2", "plazmaferezis", "immunoterápia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    139: {
        title: "Prion betegségek",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. VÍRUS_ENCEPHALITIS.html",
        questionFilter: (question) => {
            const keywords = ["prion", "creutzfeldt", "jakob", "14-3-3", "myoclonus", "rapidly progressive"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 140-144: Multiple sclerosis
    140: {
        title: "Sclerosis multiplex - epidemiológia, etiológia",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-144. SCLEROSIS MULTIPLEX.html",
        questionFilter: (question) => {
            const keywords = ["sclerosis multiplex", "sm", "epidemiológia", "földrajzi", "genetika", "környezeti"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    141: {
        title: "Sclerosis multiplex - klinikum, diagnosztika",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-144. SCLEROSIS MULTIPLEX.html",
        questionFilter: (question) => {
            const keywords = ["sm klinikum", "opticus neuritis", "myelitis", "mcdonald", "oligoclonalis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    142: {
        title: "Sclerosis multiplex - differenciáldiagnosztika",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-144. SCLEROSIS MULTIPLEX.html",
        questionFilter: (question) => {
            const keywords = ["sm differenciál", "nmo", "adem", "sarcoidosis", "lupus", "sjögren"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    143: {
        title: "Sclerosis multiplex - terápia I (akut)",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-144. SCLEROSIS MULTIPLEX.html",
        questionFilter: (question) => {
            const keywords = ["sm akut", "relapsus", "metilprednizolon", "plazmaferezis", "kortikoszteroid"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    144: {
        title: "Sclerosis multiplex - terápia II (betegségmódosító)",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-144. SCLEROSIS MULTIPLEX.html",
        questionFilter: (question) => {
            const keywords = ["betegségmódosító", "interferon", "glatiramer", "fingolimod", "natalizumab", "ocrelizumab"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 145-149: NMO, ADEM, Parkinson basics
    145: {
        title: "Neuromyelitis optica (NMO)",
        quizFile: "Vizsgálómódszerek, alap klinikum/145-149. NMO_ADEM_PARKINSON.html",
        questionFilter: (question) => {
            const keywords = ["nmo", "neuromyelitis", "aquaporin", "aqp4", "devic", "hosszú myelitis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    146: {
        title: "ADEM és egyéb demyelinizációs kórképek",
        quizFile: "Vizsgálómódszerek, alap klinikum/145-149. NMO_ADEM_PARKINSON.html",
        questionFilter: (question) => {
            const keywords = ["adem", "akut disszeminált", "monofázisos", "posztinfekciós", "gyermek"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    147: {
        title: "Parkinson-kór - epidemiológia, pathológia",
        quizFile: "Vizsgálómódszerek, alap klinikum/145-149. NMO_ADEM_PARKINSON.html",
        questionFilter: (question) => {
            const keywords = ["parkinson epidemiológia", "lewy", "alfa-synuclein", "substantia nigra", "dopamin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    148: {
        title: "Parkinson-kór - klinikum, diagnózis",
        quizFile: "Vizsgálómódszerek, alap klinikum/145-149. NMO_ADEM_PARKINSON.html",
        questionFilter: (question) => {
            const keywords = ["parkinson klinikum", "tremor", "rigiditás", "bradykinesia", "poszturális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    149: {
        title: "Parkinson-kór - gyógyszeres terápia",
        quizFile: "Vizsgálómódszerek, alap klinikum/145-149. NMO_ADEM_PARKINSON.html",
        questionFilter: (question) => {
            const keywords = ["parkinson terápia", "levodopa", "dopamin agonista", "mao-b", "comt", "dyskinesia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 150-154: Parkinson advanced, atypical
    150: {
        title: "Parkinson-kór - nem motoros tünetek",
        quizFile: "Vizsgálómódszerek, alap klinikum/150-154. PARKINSON_ATÍPUSOS.html",
        questionFilter: (question) => {
            const keywords = ["parkinson nem motoros", "konstipáció", "depresszió", "rem alvászavar", "hyposmia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    151: {
        title: "Parkinson-kór - sebészi kezelés (DBS)",
        quizFile: "Vizsgálómódszerek, alap klinikum/150-154. PARKINSON_ATÍPUSOS.html",
        questionFilter: (question) => {
            const keywords = ["dbs", "mély agyi", "stimuláció", "stn", "gpi", "parkinson műtét"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    152: {
        title: "Atípusos parkinsonizmus - MSA",
        quizFile: "Vizsgálómódszerek, alap klinikum/150-154. PARKINSON_ATÍPUSOS.html",
        questionFilter: (question) => {
            const keywords = ["msa", "multiszisztémás", "atrófia", "autonóm", "olivopontocerebelláris"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    153: {
        title: "Atípusos parkinsonizmus - PSP",
        quizFile: "Vizsgálómódszerek, alap klinikum/150-154. PARKINSON_ATÍPUSOS.html",
        questionFilter: (question) => {
            const keywords = ["psp", "progresszív szupranukleáris", "vertikális", "tekintésbénulás", "tau"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    154: {
        title: "Atípusos parkinsonizmus - CBD",
        quizFile: "Vizsgálómódszerek, alap klinikum/150-154. PARKINSON_ATÍPUSOS.html",
        questionFilter: (question) => {
            const keywords = ["cbd", "corticobasalis", "degeneráció", "alien limb", "apraxia", "aszimmetrikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 155-159: Movement disorders
    155: {
        title: "Esszenciális tremor",
        quizFile: "Vizsgálómódszerek, alap klinikum/155-159. MOZGÁSZAVAROK.html",
        questionFilter: (question) => {
            const keywords = ["esszenciális tremor", "akciós", "poszturális", "propranolol", "primidon"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    156: {
        title: "Dystonia",
        quizFile: "Vizsgálómódszerek, alap klinikum/155-159. MOZGÁSZAVAROK.html",
        questionFilter: (question) => {
            const keywords = ["dystonia", "torticollis", "blepharospasmus", "író görcs", "botulinum"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    157: {
        title: "Chorea",
        quizFile: "Vizsgálómódszerek, alap klinikum/155-159. MOZGÁSZAVAROK.html",
        questionFilter: (question) => {
            const keywords = ["chorea", "huntington", "cag", "sydenham", "tetrabenazin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    158: {
        title: "Tic-ek és Tourette szindróma",
        quizFile: "Vizsgálómódszerek, alap klinikum/155-159. MOZGÁSZAVAROK.html",
        questionFilter: (question) => {
            const keywords = ["tic", "tourette", "motoros", "vokális", "coprolalia", "haloperidol"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    159: {
        title: "Myoclonus",
        quizFile: "Vizsgálómódszerek, alap klinikum/155-159. MOZGÁSZAVAROK.html",
        questionFilter: (question) => {
            const keywords = ["myoclonus", "rándulás", "kortikális", "szubkortikális", "clonazepam"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 160-164: Dementia
    160: {
        title: "Demencia - általános jellemzők, epidemiológia",
        quizFile: "Vizsgálómódszerek, alap klinikum/160-164. DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["demencia", "kognitív", "prevalencia", "rizikófaktor", "mmse", "moca"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    161: {
        title: "Alzheimer-kór",
        quizFile: "Vizsgálómódszerek, alap klinikum/160-164. DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["alzheimer", "béta-amyloid", "tau", "apoe4", "hippocampus", "kolineszteráz"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    162: {
        title: "Vaszkuláris demencia",
        quizFile: "Vizsgálómódszerek, alap klinikum/160-164. DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["vaszkuláris demencia", "multi-infarkt", "binswanger", "cadasil", "stroke"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    163: {
        title: "Frontotemporális demencia",
        quizFile: "Vizsgálómódszerek, alap klinikum/160-164. DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["frontotemporális", "ftd", "pick", "magatartás", "nyelvi variáns", "tdp-43"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    164: {
        title: "Lewy-testes demencia",
        quizFile: "Vizsgálómódszerek, alap klinikum/160-164. DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["lewy test", "dlb", "fluktuáció", "vizuális hallucináció", "parkinsonizmus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 165-169: ALS, myasthenia, neuropathies
    165: {
        title: "Amyotrophiás lateralsclerosis (ALS)",
        quizFile: "Vizsgálómódszerek, alap klinikum/165-169. ALS_MYASTHENIA_NEUROPATHIA.html",
        questionFilter: (question) => {
            const keywords = ["als", "motoneuron", "fasciculatio", "riluzol", "bulbaris", "spinális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    166: {
        title: "Myasthenia gravis",
        quizFile: "Vizsgálómódszerek, alap klinikum/165-169. ALS_MYASTHENIA_NEUROPATHIA.html",
        questionFilter: (question) => {
            const keywords = ["myasthenia", "acetilkolin receptor", "fáradékonyság", "pyridostigmin", "thymoma"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    167: {
        title: "Polyneuropathiák - általános jellemzők",
        quizFile: "Vizsgálómódszerek, alap klinikum/165-169. ALS_MYASTHENIA_NEUROPATHIA.html",
        questionFilter: (question) => {
            const keywords = ["polyneuropathia", "axonális", "demyelinizáló", "zsibbadás", "distalis", "szimmetrikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    168: {
        title: "Diabeteses neuropathia",
        quizFile: "Vizsgálómódszerek, alap klinikum/165-169. ALS_MYASTHENIA_NEUROPATHIA.html",
        questionFilter: (question) => {
            const keywords = ["diabeteses neuropathia", "szenzoros", "autonóm", "mononeuropathia", "glükózkontroll"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    169: {
        title: "Guillain-Barré szindróma",
        quizFile: "Vizsgálómódszerek, alap klinikum/165-169. ALS_MYASTHENIA_NEUROPATHIA.html",
        questionFilter: (question) => {
            const keywords = ["guillain-barré", "gbs", "aidp", "felszálló", "albuminocitológiai", "ivig"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 170-174: Myopathies, sleep disorders
    170: {
        title: "Myopathiák - általános jellemzők",
        quizFile: "Vizsgálómódszerek, alap klinikum/170-174. MYOPATHIA_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["myopathia", "proximális", "ck", "izombiopszia", "dystrophia", "myositis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    171: {
        title: "Duchenne és Becker izomdystrophia",
        quizFile: "Vizsgálómódszerek, alap klinikum/170-174. MYOPATHIA_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["duchenne", "becker", "dystrophin", "gowers", "pseudohypertrophia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    172: {
        title: "Polymyositis, dermatomyositis",
        quizFile: "Vizsgálómódszerek, alap klinikum/170-174. MYOPATHIA_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["polymyositis", "dermatomyositis", "heliotrope", "gottron", "kortikoszteroid"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    173: {
        title: "Alvászavarok - insomnia",
        quizFile: "Vizsgálómódszerek, alap klinikum/170-174. MYOPATHIA_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["insomnia", "álmatlanság", "alvási higiénia", "zolpidem", "melatonin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    174: {
        title: "Alvási apnoe szindróma",
        quizFile: "Vizsgálómódszerek, alap klinikum/170-174. MYOPATHIA_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["alvási apnoe", "osas", "cpap", "horkolás", "ahi", "poliszomnográfia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 175-179: Narcolepsy, restless legs, tumors
    175: {
        title: "Narcolepsia",
        quizFile: "Vizsgálómódszerek, alap klinikum/175-179. NARCOLEPSIA_RLS_TUMOR.html",
        questionFilter: (question) => {
            const keywords = ["narcolepsia", "cataplexia", "orexin", "hypocretin", "mslt", "modafinil"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    176: {
        title: "Nyugtalan láb szindróma",
        quizFile: "Vizsgálómódszerek, alap klinikum/175-179. NARCOLEPSIA_RLS_TUMOR.html",
        questionFilter: (question) => {
            const keywords = ["nyugtalan láb", "rls", "willis-ekbom", "dopamin agonista", "vas", "ferritin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    177: {
        title: "Agydaganatok - általános jellemzők",
        quizFile: "Vizsgálómódszerek, alap klinikum/175-179. NARCOLEPSIA_RLS_TUMOR.html",
        questionFilter: (question) => {
            const keywords = ["agydaganat", "primer", "metasztázis", "tünetek", "agynyomás", "görcs"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    178: {
        title: "Gliomák",
        quizFile: "Vizsgálómódszerek, alap klinikum/175-179. NARCOLEPSIA_RLS_TUMOR.html",
        questionFilter: (question) => {
            const keywords = ["glioma", "glioblastoma", "astrocytoma", "oligodendroglioma", "idh", "mgmt"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    179: {
        title: "Meningeoma és egyéb agydaganatok",
        quizFile: "Vizsgálómódszerek, alap klinikum/175-179. NARCOLEPSIA_RLS_TUMOR.html",
        questionFilter: (question) => {
            const keywords = ["meningeoma", "schwannoma", "akusztikus neurinoma", "hypophysis", "adenoma"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    }
};

/**
 * Get quiz questions for a specific clinical topic
 * @param {number} topicNumber - Topic number (60-179)
 * @param {Array} allQuestions - All questions from the quiz file
 * @returns {Array} Filtered questions for the topic
 */
export function getQuestionsForClinicalTopic(topicNumber, allQuestions) {
    const mapping = clinicalQuizMapping[topicNumber];
    if (!mapping) {
        console.warn(`No mapping found for clinical topic ${topicNumber}`);
        return [];
    }

    if (!mapping.questionFilter) {
        // Return all questions if no filter specified
        return allQuestions;
    }

    // Filter questions based on the topic's keywords
    return allQuestions.filter(q => mapping.questionFilter(q.question));
}

/**
 * Get all available clinical topics
 * @returns {Array} Array of topic objects with number and title
 */
export function getAvailableClinicalTopics() {
    return Object.entries(clinicalQuizMapping).map(([number, data]) => ({
        number: parseInt(number),
        title: data.title,
        quizFile: data.quizFile
    }));
}