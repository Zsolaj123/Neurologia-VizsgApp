/**
 * Klinikum Quiz Topic Mapping
 * Maps individual klinikum topics (180-259) to their quiz files and specific questions
 */

export const klinikumQuizMapping = {
    // Topics 180-187: Transplantation, Parkinson, OSAS, Sleep
    180: {
        title: "Szervátültetés a neurológiában",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["transzplantáció", "szervátültetés", "átültet", "beültet", "graft", "rejekció", "immunszuppr"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    181: {
        title: "Parkinson-kór pathophysiologia",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["parkinson", "dopamin", "substantia nigra", "lewy", "alfa-synuclein"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    182: {
        title: "Parkinson-kór klinikai jellemzők",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["tremor", "rigiditás", "bradykinesia", "posturalis", "hoehn", "yahr"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    183: {
        title: "Parkinson-kór kezelése",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["levodopa", "dopamin agonista", "mao-b", "comt", "dbs", "apomorfin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    184: {
        title: "OSAS, obstruktív alvási apnoe",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["osas", "apnoe", "cpap", "ahi", "hypopnoe", "obstruktív alvás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    185: {
        title: "Alvászavarok",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["alvászavar", "inszomnia", "hipersomnia", "narkolepszia", "parasomnia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    186: {
        title: "REM alvás viselkedészavar",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["rem alvás", "viselkedészavar", "rbd", "álomban", "izomatónia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    187: {
        title: "Alvás és neurológiai betegségek",
        quizFile: "Klinikum/180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html",
        questionFilter: (question) => {
            const keywords = ["alvás neurológia", "epilepszia alvás", "stroke alvás", "circadian"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 188-194: Parkinson Plus, Dystonia, Wilson, Tremor
    188: {
        title: "Parkinson-plus szindrómák",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["msa", "psp", "cbd", "multiszisztémás", "progresszív szupranukleáris", "kortikobasalis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    189: {
        title: "Dystonia",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["dystonia", "torticollis", "blefarospazmus", "dyt", "generalizált dystonia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    190: {
        title: "Wilson-kór",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["wilson", "réz", "ceruloplasmin", "kayser-fleischer", "hepatolenticularis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    191: {
        title: "Tremor",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["tremor", "esszenciális", "nyugalmi", "intenciós", "posturalis tremor"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    192: {
        title: "Chorea",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["chorea", "huntington", "sydenham", "ballismus", "hemiballismus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    193: {
        title: "Tic betegségek",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["tic", "tourette", "coprolalia", "echolalia", "motoros tic"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    194: {
        title: "Ataxia",
        quizFile: "Klinikum/188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html",
        questionFilter: (question) => {
            const keywords = ["ataxia", "friedreich", "spinocerebelláris", "sca", "cerebellaris"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 195-199: Botox, Idegsebészet, Meningitis
    195: {
        title: "Botulinumtoxin kezelés",
        quizFile: "Klinikum/195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html",
        questionFilter: (question) => {
            const keywords = ["botulinum", "botox", "dysport", "xeomin", "spaszticitás", "injekció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    196: {
        title: "Járászavarok",
        quizFile: "Klinikum/195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html",
        questionFilter: (question) => {
            const keywords = ["járás", "gait", "steppage", "antalgikus", "ataxiás járás", "parkinson járás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    197: {
        title: "Idegsebészet neurológiai vonatkozásai",
        quizFile: "Klinikum/195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html",
        questionFilter: (question) => {
            const keywords = ["idegsebészet", "neurosurgery", "műtét", "vp shunt", "kraniotómia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    198: {
        title: "Bakteriális meningitis",
        quizFile: "Klinikum/195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html",
        questionFilter: (question) => {
            const keywords = ["meningitis", "meningococcus", "pneumococcus", "haemophilus", "kernig", "brudzinski"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    199: {
        title: "Vírusos meningitis és encephalitis",
        quizFile: "Klinikum/195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html",
        questionFilter: (question) => {
            const keywords = ["vírusos meningitis", "asepticus", "enterovirus", "herpes encephalitis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 200-206: Antibiotics, Neuroinfections, Prion, Encephalitis
    200: {
        title: "Antibiotikus kezelés neuroinfekciókban",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["antibiotikum", "penicillin", "ceftriaxon", "vancomycin", "meropenem"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    201: {
        title: "Az AIDS neurológiai vonatkozásai",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["aids", "hiv", "toxoplasma", "cryptococcus", "pml", "hiv demencia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    202: {
        title: "Neuroborreliosis és Neurosyphilis",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["borrelia", "lyme", "neurosyphilis", "tabes dorsalis", "argyll robertson"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    203: {
        title: "Tuberkulózis és egyéb mycobakteriális fertőzések",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["tbc", "tuberkulózis", "mycobacterium", "tuberculoma", "pott"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    204: {
        title: "Idegrendszeri parazitózisok, protozoonózisok",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["parazita", "toxoplasma", "cysticercosis", "malária", "amőba"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    205: {
        title: "Lassú vírusfertőzések és Prion betegségek",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["prion", "creutzfeldt", "jakob", "kuru", "bse", "vcjd", "sspe"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    206: {
        title: "Autoimmun és paraneoplasztikus encephalitisek",
        quizFile: "Klinikum/200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html",
        questionFilter: (question) => {
            const keywords = ["autoimmun encephalitis", "nmda", "lgi1", "caspr2", "paraneoplasztikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 207-212: Encephalitis, Bell, Mononeuritis, Polyneuritis
    207: {
        title: "Akut vírusos encephalitisek",
        quizFile: "Klinikum/207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html",
        questionFilter: (question) => {
            const keywords = ["encephalitis", "herpes simplex", "varicella", "cmv", "ebv"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    208: {
        title: "Bell-paresis",
        quizFile: "Klinikum/207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html",
        questionFilter: (question) => {
            const keywords = ["bell", "facialis paresis", "idiopátiás facialis", "house-brackmann"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    209: {
        title: "Mononeuritisek",
        quizFile: "Klinikum/207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html",
        questionFilter: (question) => {
            const keywords = ["mononeuritis", "mononeuropathia", "nervus medianus", "ulnaris", "radialis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    210: {
        title: "Mononeuritis multiplex",
        quizFile: "Klinikum/207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html",
        questionFilter: (question) => {
            const keywords = ["mononeuritis multiplex", "vasculitis", "multifokális", "aszimmetrikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    211: {
        title: "Akut polyneuritisek",
        quizFile: "Klinikum/207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html",
        questionFilter: (question) => {
            const keywords = ["guillain", "barré", "gbs", "miller fisher", "akut polyneuritis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    212: {
        title: "Krónikus polyneuropathiák",
        quizFile: "Klinikum/207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html",
        questionFilter: (question) => {
            const keywords = ["cidp", "krónikus polyneuropathia", "demyelinizáló", "axonális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 213-219: Polyneuropathy, Tunnel syndromes, Motor neuron, Muscle dystrophy
    213: {
        title: "Diabeteses polyneuropathia",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["diabeteses neuropathia", "diabetic", "disztális", "szimmetrikus", "autonóm neuropathia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    214: {
        title: "Alkoholos és táplálkozási polyneuropathiák",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["alkoholos neuropathia", "b1", "thiamin", "b12", "kobalamin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    215: {
        title: "Alagút szindrómák",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["carpalis", "cubitalis", "tarsalis", "alagút", "tunnel", "kompresszió"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    216: {
        title: "Motoneuron betegségek",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["als", "amiotrófiás", "laterálszklerózis", "motoneuron", "bulbáris"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    217: {
        title: "Spinális izomatrófiák",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["sma", "spinális izomatrófia", "werdnig", "hoffmann", "kugelberg"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    218: {
        title: "Izomdisztrófiák",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["duchenne", "becker", "dystrophin", "izomdisztrófia", "myotoniás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    219: {
        title: "Mitokondriális myopathiák",
        quizFile: "Klinikum/213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html",
        questionFilter: (question) => {
            const keywords = ["mitokondriális", "melas", "merrf", "cpeo", "ragged red"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 220-225: Myopathia, Fájdalom, Migrén, Tension, Neuralgia
    220: {
        title: "Gyulladásos myopathiák",
        quizFile: "Klinikum/220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html",
        questionFilter: (question) => {
            const keywords = ["polymyositis", "dermatomyositis", "inklúziós", "gyulladásos myopathia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    221: {
        title: "Fájdalom szindrómák",
        quizFile: "Klinikum/220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html",
        questionFilter: (question) => {
            const keywords = ["neuropátiás fájdalom", "crps", "fantom", "centrális fájdalom"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    222: {
        title: "Migrén",
        quizFile: "Klinikum/220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html",
        questionFilter: (question) => {
            const keywords = ["migrén", "aura", "hemikránia", "triptan", "cgrp"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    223: {
        title: "Tenziós fejfájás",
        quizFile: "Klinikum/220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html",
        questionFilter: (question) => {
            const keywords = ["tenziós", "feszültség", "epizodikus", "krónikus fejfájás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    224: {
        title: "Cluster fejfájás",
        quizFile: "Klinikum/220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html",
        questionFilter: (question) => {
            const keywords = ["cluster", "horton", "oxigén", "autonomy", "periódus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    225: {
        title: "Trigeminusneuralgia és egyéb neuralgiaformák",
        quizFile: "Klinikum/220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html",
        questionFilter: (question) => {
            const keywords = ["trigeminus", "neuralgia", "carbamazepin", "mikrovascularis", "glossopharyngeus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 226-230: Neuropathia, Pseudotumor, Alzheimer, Demencia
    226: {
        title: "Herediter neuropathiák",
        quizFile: "Klinikum/226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["cmt", "charcot-marie", "hmsn", "herediter", "pmp22"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    227: {
        title: "Pseudotumor cerebri",
        quizFile: "Klinikum/226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["pseudotumor", "idiopathiás intracranialis", "iih", "papillaödéma"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    228: {
        title: "Alzheimer-kór",
        quizFile: "Klinikum/226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["alzheimer", "beta-amyloid", "tau", "apoe", "donepezil"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    229: {
        title: "Vaszkuláris demencia",
        quizFile: "Klinikum/226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["vaszkuláris demencia", "multi-infarkt", "binswanger", "cadasil"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    230: {
        title: "Frontotemporális demencia",
        quizFile: "Klinikum/226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html",
        questionFilter: (question) => {
            const keywords = ["frontotemporális", "ftd", "pick", "tdp-43", "viselkedés"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 231-239: FTD, NPH, Neuropsychiatric, Mitochondrial, Trinucleotide, Neurogenetics
    231: {
        title: "Normál nyomású hydrocephalus",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["nph", "normál nyomású", "hydrocephalus", "hakim", "triász"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    232: {
        title: "Neuropszichiátriai betegségek",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["neuropszichiátria", "skizofrénia", "bipoláris", "pszichózis", "depresszió"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    233: {
        title: "Mitokondriális betegségek",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["mitokondriális", "melas", "merrf", "lhon", "leigh"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    234: {
        title: "Trinukleotid ismétlődéses betegségek",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["trinukleotid", "cag", "polyglutamin", "anticipáció", "repeat"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    235: {
        title: "Neurogenetikai vizsgálatok",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["genetikai vizsgálat", "pcr", "szekvenálás", "array", "penetrancia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    236: {
        title: "Örökletes ataxiák",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["friedreich", "sca", "spinocerebelláris", "ataxin", "autoszomális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    237: {
        title: "Leukodisztrófiák",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["leukodisztrófia", "metachromátiás", "krabbe", "alexander", "myelin"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    238: {
        title: "Lizoszomális tárolási betegségek",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["gaucher", "fabry", "niemann", "pick", "lizoszomális"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    239: {
        title: "Genetikai tanácsadás",
        quizFile: "Klinikum/231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html",
        questionFilter: (question) => {
            const keywords = ["genetikai tanácsadás", "öröklődés", "rizikó", "prenatális", "preszimptomatikus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 240-247: Neurorehab, Koponyasér, Posttrauma, GV kár
    240: {
        title: "Neurorehabilitáció alapelvei",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["neurorehabilitáció", "plaszticitás", "funkcionális", "adl", "rehabilitáció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    241: {
        title: "Stroke rehabilitáció",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["stroke rehabilitáció", "hemiparesis", "afázia rehab", "neglect terápia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    242: {
        title: "Koponyasérülések",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["koponyatrauma", "tbi", "contusio", "diffúz axonális", "gcs"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    243: {
        title: "Posttraumás következmények",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["posttraumás", "poszt-kommóciós", "krónikus traumás", "cte"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    244: {
        title: "Gerincvelő sérülések",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["gerincvelő sérülés", "sci", "tetraplegia", "paraplegia", "asia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    245: {
        title: "Spaszticitás kezelése",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["spaszticitás", "baclofen", "tizanidin", "ashworth", "intrathecalis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    246: {
        title: "Kognitív rehabilitáció",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["kognitív rehabilitáció", "memória tréning", "figyelemzavar", "exekutív"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    247: {
        title: "Segédeszközök és adaptáció",
        quizFile: "Klinikum/240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html",
        questionFilter: (question) => {
            const keywords = ["segédeszköz", "kerekesszék", "ortézis", "protézis", "adaptáció"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 248-254: Pszichoszomatika, Organikus pszichiátria, Monitorozás, Intenzív
    248: {
        title: "Pszichoszomatikus betegségek",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["pszichoszomatikus", "szomatizáció", "konverzió", "hipochondria"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    249: {
        title: "Organikus pszichiátriai kórképek",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["organikus", "delírium", "wernicke", "korsakoff", "hepatikus encephalopathia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    250: {
        title: "Neurológiai betegek monitorozása",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["monitorozás", "icp monitor", "eeg monitoring", "transcranialis doppler"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    251: {
        title: "Neurointenzív ellátás",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["neurointenzív", "gépi lélegeztetés", "sedáció", "hipotermia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    252: {
        title: "Status epilepticus kezelése",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["status epilepticus", "benzodiazepine", "phenytoin", "propofol", "burst suppression"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    253: {
        title: "Agyhalál megállapítása",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["agyhalál", "apnoe teszt", "agytörzsi reflex", "transcranialis doppler"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    254: {
        title: "Neurológiai sürgősségi ellátás",
        quizFile: "Klinikum/248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html",
        questionFilter: (question) => {
            const keywords = ["sürgősség", "akut stroke", "status", "guillain-barré", "myastheniás krízis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 255-259: Discopathia, Szédülés, Hydrocephalus, Terhesség, Idős
    255: {
        title: "Discus hernia és discopathiák",
        quizFile: "Klinikum/255-259. DISCOPATHIA_SZÉDÜLŐS_HYDROCEPH_TERHESSÉG_IDŐS.html",
        questionFilter: (question) => {
            const keywords = ["discus", "hernia", "porckorong", "lumbago", "ischias", "cervicobrachialgia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    256: {
        title: "Szédülés differenciáldiagnosztika",
        quizFile: "Klinikum/255-259. DISCOPATHIA_SZÉDÜLŐS_HYDROCEPH_TERHESSÉG_IDŐS.html",
        questionFilter: (question) => {
            const keywords = ["szédülés", "vertigo", "bppv", "meniere", "vestibularis neuritis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    257: {
        title: "Hydrocephalus formák",
        quizFile: "Klinikum/255-259. DISCOPATHIA_SZÉDÜLŐS_HYDROCEPH_TERHESSÉG_IDŐS.html",
        questionFilter: (question) => {
            const keywords = ["hydrocephalus", "vp shunt", "kommunikáló", "obstruktív", "aqueductus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    258: {
        title: "Terhesség és neurológiai betegségek",
        quizFile: "Klinikum/255-259. DISCOPATHIA_SZÉDÜLŐS_HYDROCEPH_TERHESSÉG_IDŐS.html",
        questionFilter: (question) => {
            const keywords = ["terhesség", "preeclampsia", "eclampsia", "hellp", "peripartum"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    259: {
        title: "Időskori neurológiai problémák",
        quizFile: "Klinikum/255-259. DISCOPATHIA_SZÉDÜLŐS_HYDROCEPH_TERHESSÉG_IDŐS.html",
        questionFilter: (question) => {
            const keywords = ["időskori", "geriátriai", "polipragmázia", "elesés", "szenilitás"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    }
};

/**
 * Get filtered questions for a specific klinikum topic
 * @param {number} topicNumber - Topic number (180-259)
 * @param {Array} allQuestions - All questions from the quiz file
 * @returns {Array} Filtered questions for the topic
 */
export function getQuestionsForKlinikumTopic(topicNumber, allQuestions) {
    const topicData = klinikumQuizMapping[topicNumber];
    if (!topicData || !topicData.questionFilter) {
        return [];
    }

    return allQuestions.filter(q => topicData.questionFilter(q.question));
}