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
    112: {
        title: "Conus és cauda syndroma",
        quizFile: "Vizsgálómódszerek, alap klinikum/111-115. SPINGYÖK_CONUSCAUDA_ALSÓVÉGTAG_TARDIV_ACM.html",
        questionFilter: (question) => {
            const keywords = ["conus", "cauda", "equina", "sphincter", "nyeregérzés"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    113: {
        title: "Alsóvégtagi érszűkület",
        quizFile: "Vizsgálómódszerek, alap klinikum/111-115. SPINGYÖK_CONUSCAUDA_ALSÓVÉGTAG_TARDIV_ACM.html",
        questionFilter: (question) => {
            const keywords = ["alsóvégtag", "érszűkület", "claudicatio", "fontaine", "kritikus ischaemia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    114: {
        title: "Tardív dyskinesia",
        quizFile: "Vizsgálómódszerek, alap klinikum/111-115. SPINGYÖK_CONUSCAUDA_ALSÓVÉGTAG_TARDIV_ACM.html",
        questionFilter: (question) => {
            const keywords = ["tardív", "dyskinesia", "neuroleptikum", "dopamin receptor", "aims"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    115: {
        title: "Az arteria cerebri media (ACM) szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/111-115. SPINGYÖK_CONUSCAUDA_ALSÓVÉGTAG_TARDIV_ACM.html",
        questionFilter: (question) => {
            const keywords = ["acm", "arteria cerebri media", "hemiparesis", "aphasia", "neglect"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 116-119: Brain stem, border zone, lacunar, steal
    116: {
        title: "Agytörzsi szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/116-119. AGYTÖRZS_HATÁRTER_LACUNA_STEAL.html",
        questionFilter: (question) => {
            const keywords = ["agytörzs", "wallenberg", "weber", "millard-gubler", "alternáló"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    117: {
        title: "Határterületi infarktusok",
        quizFile: "Vizsgálómódszerek, alap klinikum/116-119. AGYTÖRZS_HATÁRTER_LACUNA_STEAL.html",
        questionFilter: (question) => {
            const keywords = ["határterület", "watershed", "vérellátási határ", "hipoperfúzió"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    118: {
        title: "Lacunaris infarktusok",
        quizFile: "Vizsgálómódszerek, alap klinikum/116-119. AGYTÖRZS_HATÁRTER_LACUNA_STEAL.html",
        questionFilter: (question) => {
            const keywords = ["lacunaris", "kisér", "silent stroke", "pure motor", "pure sensory"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    119: {
        title: "Steal szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/116-119. AGYTÖRZS_HATÁRTER_LACUNA_STEAL.html",
        questionFilter: (question) => {
            const keywords = ["steal", "subclavian", "ellopás", "reverz áramlás", "vertebralis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 120-124: Craniocervical, atherogen, cerebrovascular, primary prevention, ischemic stroke
    120: {
        title: "Craniocervicalis átmenet szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html",
        questionFilter: (question) => {
            const keywords = ["craniocervicalis", "atlanto-axialis", "foramen magnum", "arnold-chiari"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    121: {
        title: "Atherogén stroke",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html",
        questionFilter: (question) => {
            const keywords = ["atherogen", "atherosclerosis", "plakk", "carotis", "nagyér"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    122: {
        title: "Cerebrovascularis betegségek",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html",
        questionFilter: (question) => {
            const keywords = ["cerebrovascularis", "stroke", "tia", "érkatasztrófa"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    123: {
        title: "Stroke primer prevenció",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html",
        questionFilter: (question) => {
            const keywords = ["primer prevenció", "rizikófaktor", "hypertonia", "diabetes", "életmód"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    124: {
        title: "Ischaemiás stroke",
        quizFile: "Vizsgálómódszerek, alap klinikum/120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html",
        questionFilter: (question) => {
            const keywords = ["ischaemiás stroke", "thrombolysis", "rtpa", "nihss", "toast"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 125-129: TIA, cardiac embolism, young stroke, coagulation
    125: {
        title: "TIA (Tranziens ischaemiás attack)",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html",
        questionFilter: (question) => {
            const keywords = ["tia", "tranziens", "átmeneti", "abcd2", "minor stroke"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    126: {
        title: "Cardiális embolizáció",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html",
        questionFilter: (question) => {
            const keywords = ["cardiális", "embólia", "pitvarfibrilláció", "chads", "antikoaguláns"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    127: {
        title: "Agyi ischaemia",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html",
        questionFilter: (question) => {
            const keywords = ["ischaemia", "penumbra", "core", "mismatch", "kollaterális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    128: {
        title: "Fiatalok stroke-ja",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html",
        questionFilter: (question) => {
            const keywords = ["fiatal", "dissectio", "antiphospholipid", "fabry", "moya-moya"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    129: {
        title: "Coagulopathiák",
        quizFile: "Vizsgálómódszerek, alap klinikum/125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html",
        questionFilter: (question) => {
            const keywords = ["coagulopathia", "thrombophilia", "protein c", "protein s", "factor v leiden"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 130-134: Anticoagulation, reperfusion, ICH, SAH, vessel development
    130: {
        title: "Antikoaguláns kezelés",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. ANTIKOAG_REPERF_INTRACEREBRVÉRZ_SAV_EREKFEJL.html",
        questionFilter: (question) => {
            const keywords = ["antikoaguláns", "warfarin", "noak", "inr", "vérzésveszély"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    131: {
        title: "Reperfúziós kezelés",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. ANTIKOAG_REPERF_INTRACEREBRVÉRZ_SAV_EREKFEJL.html",
        questionFilter: (question) => {
            const keywords = ["reperfúzió", "thrombectomia", "tici", "door-to-needle", "endovaszkuláris"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    132: {
        title: "Intracerebrális vérzés",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. ANTIKOAG_REPERF_INTRACEREBRVÉRZ_SAV_EREKFEJL.html",
        questionFilter: (question) => {
            const keywords = ["intracerebrális", "ich", "hematoma", "spot sign", "vérnyomás kontroll"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    133: {
        title: "Subarachnoideális vérzés (SAV)",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. ANTIKOAG_REPERF_INTRACEREBRVÉRZ_SAV_EREKFEJL.html",
        questionFilter: (question) => {
            const keywords = ["subarachnoideális", "sav", "aneurysma", "vasospasmus", "xanthochromia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    134: {
        title: "Agyi erek fejlődési rendellenességei",
        quizFile: "Vizsgálómódszerek, alap klinikum/130-134. ANTIKOAG_REPERF_INTRACEREBRVÉRZ_SAV_EREKFEJL.html",
        questionFilter: (question) => {
            const keywords = ["avm", "cavernoma", "aneurysma", "fejlődési", "malformáció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 135-139: GV vascular, epilepsy
    135: {
        title: "Gerincvelő vaszkuláris betegségei",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. GVVASC_EPILEPI.html",
        questionFilter: (question) => {
            const keywords = ["gerincvelő", "vaszkuláris", "spinális stroke", "arteria spinalis anterior"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    136: {
        title: "Epilepszia alapok",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. GVVASC_EPILEPI.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia", "roham", "ictalis", "interictalis", "eeg"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    137: {
        title: "Fokális epilepsziák",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. GVVASC_EPILEPI.html",
        questionFilter: (question) => {
            const keywords = ["fokális", "parciális", "temporalis", "frontális", "aura"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    138: {
        title: "Generalizált epilepsziák",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. GVVASC_EPILEPI.html",
        questionFilter: (question) => {
            const keywords = ["generalizált", "absence", "myoclonusos", "tónusos-klónusos", "grand mal"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    139: {
        title: "Epilepszia szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/135-139. GVVASC_EPILEPI.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia szindróma", "west", "lennox-gastaut", "rolandicus", "jme"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 140-145: Epilepsy, antiepileptics, status epilepticus, consciousness
    140: {
        title: "Epilepszia diagnosztika",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia diagnózis", "video-eeg", "mri", "pet", "pseudoroham"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    141: {
        title: "Antiepileptikumok",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html",
        questionFilter: (question) => {
            const keywords = ["antiepileptikum", "carbamazepin", "valproát", "lamotrigin", "levetiracetam"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    142: {
        title: "Status epilepticus",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html",
        questionFilter: (question) => {
            const keywords = ["status epilepticus", "konvulzív", "non-konvulzív", "benzodiazepine", "propofol"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    143: {
        title: "Eszméletzavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html",
        questionFilter: (question) => {
            const keywords = ["eszmélet", "tudatzavar", "gcs", "kóma", "vegetatív"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    144: {
        title: "Rövid eszméletvesztések",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html",
        questionFilter: (question) => {
            const keywords = ["syncope", "ájulás", "kollapsz", "vasovagalis", "ortostatikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    145: {
        title: "Epilepszia műtéti kezelése",
        quizFile: "Vizsgálómódszerek, alap klinikum/140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html",
        questionFilter: (question) => {
            const keywords = ["epilepszia műtét", "resectio", "lobectomia", "vns", "dbs"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 146-150: Neurosurgery epilepsy, encephalitis, EEG, myelo, peripheral
    146: {
        title: "Idegsebészeti vonatkozású epilepsziák",
        quizFile: "Vizsgálómódszerek, alap klinikum/146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KISÉR.html",
        questionFilter: (question) => {
            const keywords = ["tumor", "avm", "cavernoma", "poszttraumás", "epileptogén"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    147: {
        title: "Encephalitisek",
        quizFile: "Vizsgálómódszerek, alap klinikum/146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KISÉR.html",
        questionFilter: (question) => {
            const keywords = ["encephalitis", "hsv", "autoimmun", "nmda", "limbikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    148: {
        title: "EEG speciális alkalmazásai",
        quizFile: "Vizsgálómódszerek, alap klinikum/146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KISÉR.html",
        questionFilter: (question) => {
            const keywords = ["eeg monitoring", "agyhalál", "burst suppression", "triphasicus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    149: {
        title: "Myelopathiák",
        quizFile: "Vizsgálómódszerek, alap klinikum/146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KISÉR.html",
        questionFilter: (question) => {
            const keywords = ["myelopathia", "cervicalis", "spondylosis", "syringomyelia", "kompresszió"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    150: {
        title: "Kisér betegségek",
        quizFile: "Vizsgálómódszerek, alap klinikum/146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KISÉR.html",
        questionFilter: (question) => {
            const keywords = ["kisér", "mikroangiopathia", "fehérállomány", "binswanger", "cadasil"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 151-156: White matter, PRES, autoimmune, demyelinating, MS
    151: {
        title: "Fehérállományi betegségek",
        quizFile: "Vizsgálómódszerek, alap klinikum/151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html",
        questionFilter: (question) => {
            const keywords = ["fehérállomány", "leukoencephalopathia", "leukodystrophia", "demyelinizáció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    152: {
        title: "PRES (Posterior reversible encephalopathy syndrome)",
        quizFile: "Vizsgálómódszerek, alap klinikum/151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html",
        questionFilter: (question) => {
            const keywords = ["pres", "posterior", "reversibilis", "hypertensiv", "eclampsia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    153: {
        title: "Autoimmun neurológiai betegségek",
        quizFile: "Vizsgálómódszerek, alap klinikum/151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html",
        questionFilter: (question) => {
            const keywords = ["autoimmun", "vasculitis", "lupus", "sjögren", "antifoszfolipid"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    154: {
        title: "Demyelinizációs betegségek",
        quizFile: "Vizsgálómódszerek, alap klinikum/151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html",
        questionFilter: (question) => {
            const keywords = ["demyelinizáció", "adem", "nmo", "mog", "oligoclonalis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    155: {
        title: "Sclerosis multiplex alapok",
        quizFile: "Vizsgálómódszerek, alap klinikum/151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html",
        questionFilter: (question) => {
            const keywords = ["sclerosis multiplex", "sm", "mcdonald", "disszemináció", "relapsus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    156: {
        title: "Sclerosis multiplex kezelése",
        quizFile: "Vizsgálómódszerek, alap klinikum/151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html",
        questionFilter: (question) => {
            const keywords = ["sm kezelés", "interferon", "glatiramer", "fingolimod", "natalizumab"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 157-161: Inflammatory GV, GBS, MG, IVIG
    157: {
        title: "Gerincvelő gyulladásos betegségei",
        quizFile: "Vizsgálómódszerek, alap klinikum/157-161. GVGYULL_GBS_MG_IVIG.html",
        questionFilter: (question) => {
            const keywords = ["myelitis", "transverz", "poliomyelitis", "htlv", "gerincvelő gyulladás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    158: {
        title: "Guillain-Barré szindróma",
        quizFile: "Vizsgálómódszerek, alap klinikum/157-161. GVGYULL_GBS_MG_IVIG.html",
        questionFilter: (question) => {
            const keywords = ["guillain-barré", "gbs", "aidp", "miller-fisher", "albuminocitológiai"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    159: {
        title: "Myasthenia gravis",
        quizFile: "Vizsgálómódszerek, alap klinikum/157-161. GVGYULL_GBS_MG_IVIG.html",
        questionFilter: (question) => {
            const keywords = ["myasthenia", "acetilkolin receptor", "musk", "thymoma", "pyridostigmin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    160: {
        title: "IVIG kezelés neurológiában",
        quizFile: "Vizsgálómódszerek, alap klinikum/157-161. GVGYULL_GBS_MG_IVIG.html",
        questionFilter: (question) => {
            const keywords = ["ivig", "immunglobulin", "plazmaferezis", "immunmoduláció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    161: {
        title: "CIDP és egyéb krónikus neuropathiák",
        quizFile: "Vizsgálómódszerek, alap klinikum/157-161. GVGYULL_GBS_MG_IVIG.html",
        questionFilter: (question) => {
            const keywords = ["cidp", "krónikus", "demyelinizáló", "polyneuropathia", "mmn"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 162-166: Immunotherapy, glioma, space occupying, neurocutaneous
    162: {
        title: "Immunoterápiák neurológiában",
        quizFile: "Vizsgálómódszerek, alap klinikum/162-166. IMMUNTH_GLIOMA_TÉRFOGL_NEUROCUTAN.html",
        questionFilter: (question) => {
            const keywords = ["immunoterápia", "monoklonális", "rituximab", "ocrelizumab", "checkpoint"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    163: {
        title: "Gliomák",
        quizFile: "Vizsgálómódszerek, alap klinikum/162-166. IMMUNTH_GLIOMA_TÉRFOGL_NEUROCUTAN.html",
        questionFilter: (question) => {
            const keywords = ["glioma", "glioblastoma", "astrocytoma", "oligodendroglioma", "idh"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    164: {
        title: "Térfoglaló folyamatok",
        quizFile: "Vizsgálómódszerek, alap klinikum/162-166. IMMUNTH_GLIOMA_TÉRFOGL_NEUROCUTAN.html",
        questionFilter: (question) => {
            const keywords = ["térfoglaló", "tumor", "metasztázis", "agynyomás", "herniation"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    165: {
        title: "Neurocutan szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/162-166. IMMUNTH_GLIOMA_TÉRFOGL_NEUROCUTAN.html",
        questionFilter: (question) => {
            const keywords = ["neurocutan", "neurofibromatosis", "tuberosus sclerosis", "von hippel-lindau"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    166: {
        title: "Agydaganatok kezelése",
        quizFile: "Vizsgálómódszerek, alap klinikum/162-166. IMMUNTH_GLIOMA_TÉRFOGL_NEUROCUTAN.html",
        questionFilter: (question) => {
            const keywords = ["tumor kezelés", "resectio", "sugárterápia", "kemoterápia", "temozolomid"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 167-170: Brain tumor, immune, neurocutaneous, sella, ICP
    167: {
        title: "Agydaganatok osztályozása",
        quizFile: "Vizsgálómódszerek, alap klinikum/167-170. AGYDAGANAT_IMMUN_NEUROKUTAN_SELLA_ICP.html",
        questionFilter: (question) => {
            const keywords = ["who grade", "primer tumor", "szekunder", "meningeoma", "ependymoma"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    168: {
        title: "Immun-mediált agydaganatok",
        quizFile: "Vizsgálómódszerek, alap klinikum/167-170. AGYDAGANAT_IMMUN_NEUROKUTAN_SELLA_ICP.html",
        questionFilter: (question) => {
            const keywords = ["primer cns lymphoma", "pcnsl", "immunszuppresszió", "aids"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    169: {
        title: "Sella turcica régiós daganatok",
        quizFile: "Vizsgálómódszerek, alap klinikum/167-170. AGYDAGANAT_IMMUN_NEUROKUTAN_SELLA_ICP.html",
        questionFilter: (question) => {
            const keywords = ["hypophysis", "adenoma", "craniopharyngeoma", "chiasma", "bitemporális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    170: {
        title: "Intracranialis nyomásfokozódás (ICP)",
        quizFile: "Vizsgálómódszerek, alap klinikum/167-170. AGYDAGANAT_IMMUN_NEUROKUTAN_SELLA_ICP.html",
        questionFilter: (question) => {
            const keywords = ["icp", "agynyomás", "monro-kellie", "cushing reflex", "papillaödéma"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 171-175: Endocrine, salt-water, hypoglycemia, vitamins
    171: {
        title: "Belső elválasztású mirigyek neurológiai vonatkozásai",
        quizFile: "Vizsgálómódszerek, alap klinikum/171-175. MIRIGY_SÓVIZ_HYPOGLYK_VITAMIN.html",
        questionFilter: (question) => {
            const keywords = ["endokrin", "hypophysis", "thyreoidea", "mellékpajzsmirigy", "mellékvese"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    172: {
        title: "Só-víz háztartás zavarai",
        quizFile: "Vizsgálómódszerek, alap klinikum/171-175. MIRIGY_SÓVIZ_HYPOGLYK_VITAMIN.html",
        questionFilter: (question) => {
            const keywords = ["hyponatraemia", "hypernatraemia", "siadh", "diabetes insipidus", "osmolalitás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    173: {
        title: "Hypoglycaemia neurológiai tünetei",
        quizFile: "Vizsgálómódszerek, alap klinikum/171-175. MIRIGY_SÓVIZ_HYPOGLYK_VITAMIN.html",
        questionFilter: (question) => {
            const keywords = ["hypoglycaemia", "neuroglycopenia", "whipple", "insulinoma", "tudatzavar"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    174: {
        title: "Vitaminhiány neurológiai tünetei",
        quizFile: "Vizsgálómódszerek, alap klinikum/171-175. MIRIGY_SÓVIZ_HYPOGLYK_VITAMIN.html",
        questionFilter: (question) => {
            const keywords = ["b12", "tiamin", "wernicke", "korsakoff", "folsav", "niacin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    175: {
        title: "Táplálkozási és anyagcsere zavarok",
        quizFile: "Vizsgálómódszerek, alap klinikum/171-175. MIRIGY_SÓVIZ_HYPOGLYK_VITAMIN.html",
        questionFilter: (question) => {
            const keywords = ["malnutríció", "anorexia", "refeeding", "porfíria", "wilson"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 176-179: Hematology, paraneoplastic, oncology, drugs
    176: {
        title: "Hematológiai betegségek neurológiai vonatkozásai",
        quizFile: "Vizsgálómódszerek, alap klinikum/176-179. HEMAT_PARANEO_ONKO_GYSZ.html",
        questionFilter: (question) => {
            const keywords = ["anaemia", "polycythaemia", "thrombocytopenia", "sarlósejtes", "leukémia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    177: {
        title: "Paraneoplasztikus szindrómák",
        quizFile: "Vizsgálómódszerek, alap klinikum/176-179. HEMAT_PARANEO_ONKO_GYSZ.html",
        questionFilter: (question) => {
            const keywords = ["paraneoplasztikus", "anti-hu", "anti-yo", "limbikus encephalitis", "opsoclonus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    178: {
        title: "Onkológiai kezelések neurológiai mellékhatásai",
        quizFile: "Vizsgálómódszerek, alap klinikum/176-179. HEMAT_PARANEO_ONKO_GYSZ.html",
        questionFilter: (question) => {
            const keywords = ["kemoterápia", "sugárterápia", "neuropathia", "leukoencephalopathia", "car-t"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    179: {
        title: "Gyógyszerek neurológiai mellékhatásai",
        quizFile: "Vizsgálómódszerek, alap klinikum/176-179. HEMAT_PARANEO_ONKO_GYSZ.html",
        questionFilter: (question) => {
            const keywords = ["gyógyszer mellékhatás", "neuroleptikum", "szerotonin", "lithium", "sztatin"];
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
        console.log(`[getQuestionsForClinicalTopic] No filter for topic ${topicNumber}, returning all ${allQuestions.length} questions`);
        return allQuestions;
    }

    // Filter questions based on the topic's keywords
    const filtered = allQuestions.filter((q, index) => {
        const matches = mapping.questionFilter(q.question);
        if (matches && index < 3) {
            console.log(`[getQuestionsForClinicalTopic] Topic ${topicNumber} matched question: "${q.question.substring(0, 100)}..."`);
        }
        return matches;
    });
    
    console.log(`[getQuestionsForClinicalTopic] Topic ${topicNumber} (${mapping.title}) matched ${filtered.length} out of ${allQuestions.length} questions`);
    return filtered;
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