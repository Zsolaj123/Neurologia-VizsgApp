/**
 * Neuroanatomy Quiz Topic Mapping
 * Maps individual neuroanatomy topics (1-59) to their quiz files and specific questions
 */

export const neuronatQuizMapping = {
    // Topics 1-3: Koponya, gerinc, látópálya
    1: {
        title: "A csontos koponya és gerinc anatómiája",
        quizFile: "Neuroanat/1-3 Koponya_gerinc_látópálya.html",
        questionFilter: (question) => {
            const keywords = ["koponya", "koponyagödör", "sella turcica", "csigolya", "axis", "atlas", "vertebra", "foramen magnum", "koponyavarrat", "orbita", "szemüreg", "porckorong", "discus intervertebralis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    2: {
        title: "A látópálya szerkezete",
        quizFile: "Neuroanat/1-3 Koponya_gerinc_látópálya.html",
        questionFilter: (question) => {
            const keywords = ["látópálya", "retina", "chiasma opticum", "corpus geniculatum", "cgl", "látókéreg", "v1", "ganglionsejt", "látósugárzás", "meyer"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    3: {
        title: "A látóidegfő (papilla) elváltozásai neurológiai betegségekben",
        quizFile: "Neuroanat/1-3 Koponya_gerinc_látópálya.html",
        questionFilter: (question) => {
            const keywords = ["papilla", "látóidegfő", "pangásos papilla", "papillaödéma", "papillitis", "látóideg", "drusen", "oct", "vep", "látóideg-sorvadás", "látóideg-hypoplasia"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 4-6: Középagy, tekintés, szemmozgás
    4: {
        title: "A szemmozgató agyidegek működése",
        quizFile: "Neuroanat/4-6. Középagy_tekintés_szemmozgás.html",
        questionFilter: (question) => {
            const keywords = ["oculomotorius", "trochlearis", "abducens", "szemmozgató", "iii.", "iv.", "vi.", "szemizmok"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    5: {
        title: "A tekintéssel kapcsolatos idegrendszeri szerkezetek",
        quizFile: "Neuroanat/4-6. Középagy_tekintés_szemmozgás.html",
        questionFilter: (question) => {
            const keywords = ["tekintés", "szakkád", "mlf", "pprf", "fef", "frontal eye field", "szemkövetés"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    6: {
        title: "A mesencephalon szerkezete",
        quizFile: "Neuroanat/4-6. Középagy_tekintés_szemmozgás.html",
        questionFilter: (question) => {
            const keywords = ["mesencephalon", "középagy", "substantia nigra", "nucleus ruber", "colliculus", "tegmentum", "crus cerebri"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 7-11: NV, VII, vestibularis, hallás
    7: {
        title: "A Nervus Trigeminus anatómiája",
        quizFile: "Neuroanat/7-11. NV_VII_vestib_hallás.html",
        questionFilter: (question) => {
            const keywords = ["trigeminus", "n. trigeminus", "v.", "ganglion gasseri", "ophthalmicus", "maxillaris", "mandibularis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    8: {
        title: "A Nervus Facialis anatómiája",
        quizFile: "Neuroanat/7-11. NV_VII_vestib_hallás.html",
        questionFilter: (question) => {
            const keywords = ["facialis", "n. facialis", "vii.", "arcideg", "chorda tympani", "ganglion geniculi"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    9: {
        title: "A vestibularis rendszer szerkezete és működése",
        quizFile: "Neuroanat/7-11. NV_VII_vestib_hallás.html",
        questionFilter: (question) => {
            const keywords = ["vestibularis", "utriculus", "sacculus", "félkörös", "otolith", "vesztibuláris"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    10: {
        title: "A hallás és szaglás zavarai neurológiai kórképekben",
        quizFile: "Neuroanat/7-11. NV_VII_vestib_hallás.html",
        questionFilter: (question) => {
            const keywords = ["hallás", "szaglás", "presbyacusis", "anosmia", "tinnitus", "olfactorius"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    11: {
        title: "A hallás fiziológiája",
        quizFile: "Neuroanat/7-11. NV_VII_vestib_hallás.html",
        questionFilter: (question) => {
            const keywords = ["corti", "basilaris membrán", "cochlea", "csiga", "hallópálya", "colliculus inferior"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topic 12: Szédülés (separate or combined)
    12: {
        title: "Szédülés és Vertigo",
        quizFile: "Neuroanat/12. Szédülés_vertigo.html",
        questionFilter: null // All questions from this file
    },

    // Topics 13-15: Bulbaris, híd, nyúltvelő
    13: {
        title: "A bulbaris agyidegek anatómiája",
        quizFile: "Neuroanat/12-15. Szédülés_bulbaris_híd.html",
        questionFilter: (question) => {
            const keywords = ["bulbaris", "glossopharyngeus", "vagus", "accessorius", "hypoglossus", "ix.", "x.", "xi.", "xii."];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    14: {
        title: "A híd és nyúltvelő szerkezete",
        quizFile: "Neuroanat/12-15. Szédülés_bulbaris_híd.html",
        questionFilter: (question) => {
            const keywords = ["híd", "pons", "nyúltvelő", "medulla oblongata", "oliva", "pyramis", "lemniscus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    15: {
        title: "Agytörzsi aktiváló rendszerek",
        quizFile: "Neuroanat/12-15. Szédülés_bulbaris_híd.html",
        questionFilter: (question) => {
            const keywords = ["aktiváló", "aras", "formatio reticularis", "ébrenlét", "raphe", "locus coeruleus"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Topics 16-20: Kisagy, thalamus, capsula interna, basalis ganglionok
    16: {
        title: "A cerebellum működési egységei",
        quizFile: "Neuroanat/16-20. kisagy_thalamus_caps interna_basalis ggl.html",
        questionFilter: (question) => {
            const keywords = ["cerebellum", "kisagy", "purkinje", "vermis", "hemisphaerium", "flocculonodularis"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    17: {
        title: "A capsula interna",
        quizFile: "Neuroanat/16-20. kisagy_thalamus_caps interna_basalis ggl.html",
        questionFilter: (question) => {
            const keywords = ["capsula interna", "crus anterius", "crus posterius", "genu capsulae"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    18: {
        title: "A thalamus szerkezete",
        quizFile: "Neuroanat/16-20. kisagy_thalamus_caps interna_basalis ggl.html",
        questionFilter: (question) => {
            const keywords = ["thalamus", "vpl", "vpm", "lgn", "mgn", "pulvinar", "nucleus anterior"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    19: {
        title: "A basalis ganglionok szerkezete, kapcsolatai",
        quizFile: "Neuroanat/16-20. kisagy_thalamus_caps interna_basalis ggl.html",
        questionFilter: (question) => {
            const keywords = ["basalis ganglionok", "putamen", "globus pallidus", "caudat", "striatum"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },
    20: {
        title: "A basalis ganglionok szerepe a mozgásszabályozásban",
        quizFile: "Neuroanat/16-20. kisagy_thalamus_caps interna_basalis ggl.html",
        questionFilter: (question) => {
            const keywords = ["direkt pálya", "indirekt pálya", "dopamin", "parkinson", "huntington", "subthalamic"];
            return keywords.some(keyword => question.toLowerCase().includes(keyword));
        }
    },

    // Add more topics as needed...
    // This is a template structure that can be expanded
};

/**
 * Get quiz questions for a specific topic
 * @param {number} topicNumber - Topic number (1-59)
 * @param {Array} allQuestions - All questions from the quiz file
 * @returns {Array} Filtered questions for the topic
 */
export function getQuestionsForTopic(topicNumber, allQuestions) {
    const mapping = neuronatQuizMapping[topicNumber];
    if (!mapping) {
        console.warn(`No mapping found for topic ${topicNumber}`);
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
 * Get all available individual topics
 * @returns {Array} Array of topic objects with number and title
 */
export function getAvailableTopics() {
    return Object.entries(neuronatQuizMapping).map(([number, data]) => ({
        number: parseInt(number),
        title: data.title,
        quizFile: data.quizFile
    }));
}