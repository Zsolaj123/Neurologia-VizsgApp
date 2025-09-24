/**
 * Quiz Engine - Main Application Entry Point
 * Initializes and coordinates all quiz modules
 */

import { QuizLoader } from './quiz-engine/quiz-loader-simple.js';
import { QuizUI } from './quiz-engine/quiz-ui.js';
import { MatrixRain } from './quiz-engine/matrix-rain.js';
import { MatrixTerminal } from './quiz-engine/matrix-terminal.js';

class QuizApp {
    constructor() {
        this.state = {
            currentCategory: null,
            currentQuizPath: null,
            quizData: null,
            userProgress: this.loadProgress()
        };

        // Initialize modules
        this.loader = new QuizLoader();
        this.ui = new QuizUI();
        this.matrixRain = null;
        this.matrixTerminal = null;

        this.init();
    }

    async init() {
        try {
            // Show loading
            this.ui.showLoading(true);

            // Initialize matrix rain effect
            this.initMatrixRain();

            // Initialize matrix terminal
            this.initMatrixTerminal();

            // Setup event listeners
            this.setupEventListeners();

            // Load quiz metadata
            await this.loadQuizMetadata();

            // Update progress displays
            this.updateProgressBars();

            // Hide loading
            this.ui.showLoading(false);

        } catch (error) {
            console.error('Quiz app initialization error:', error);
            this.ui.showError('Hiba történt az alkalmazás betöltése közben.');
        }
    }

    initMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        if (canvas) {
            this.matrixRain = new MatrixRain(canvas);
            // Stop any existing animation
            this.matrixRain.stop();
            
            // Configure for better visibility - same as podcast player
            this.matrixRain.setConfig({
                fadeColor: 'rgba(10, 10, 10, 0.02)', // Slower fade for stronger trails
                speed: 25, // Faster animation for more movement
                density: 0.98, // More characters
                color: '#00ff41', // Ensure green color
                fontSize: 16 // Slightly larger characters
            });
            
            // Restart with new config
            this.matrixRain.start();
            console.log('Matrix rain initialized in quiz engine with enhanced settings');
        }
    }

    initMatrixTerminal() {
        const container = document.getElementById('matrix-terminal-container');
        if (container) {
            this.matrixTerminal = new MatrixTerminal();
            this.matrixTerminal.init(container);
            console.log('Matrix terminal initialized');
        }
    }

    setupEventListeners() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.handleCategorySelect(category);
            });
        });

        // Back buttons
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target;
                this.ui.switchScreen(target);
            });
        });

        // Setup search functionality
        this.setupSearchFunctionality();

        // Quiz controls removed - all quiz interaction happens in iframe
    }

    setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.toLowerCase().trim();
                const quizItems = document.querySelectorAll('.quiz-item');
                
                quizItems.forEach(item => {
                    const title = item.querySelector('.quiz-item-title')?.textContent.toLowerCase() || '';
                    const topics = item.querySelector('.quiz-item-topics')?.textContent.toLowerCase() || '';
                    
                    // Extract numbers from topics (e.g., "Témák: 1-59" -> "1-59")
                    const topicNumbers = topics.replace(/[^\d\-,\s]/g, '').trim();
                    
                    // Check if query matches title, topics text, or topic numbers
                    const matchesTitle = title.includes(query);
                    const matchesTopics = topics.includes(query);
                    const matchesNumbers = topicNumbers.includes(query) || query.split(/[-,\s]+/).some(num => {
                        if (!/^\d+$/.test(num)) return false;
                        const queryNum = parseInt(num);
                        // Check if number is in any range (e.g., "45" matches "1-59")
                        return topicNumbers.split(/[,\s]+/).some(range => {
                            if (range.includes('-')) {
                                const [start, end] = range.split('-').map(n => parseInt(n.trim()));
                                return queryNum >= start && queryNum <= end;
                            } else {
                                return parseInt(range.trim()) === queryNum;
                            }
                        });
                    });
                    
                    if (query === '' || matchesTitle || matchesTopics || matchesNumbers) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            };
            
            searchInput.addEventListener('input', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            searchBtn.addEventListener('click', performSearch);
        }
    }

    async loadQuizMetadata() {
        // Define quiz structure based on directory analysis
        this.quizMetadata = {
            neuroanat: {
                title: 'Neuroanatómia',
                path: 'content/quizzes/Neuroanat',
                quizzes: [
                    { file: '1-3 Koponya_gerinc_látópálya.html', topics: '1-3', title: 'Koponya, gerinc és látópálya' },
                    { file: '4-6. Középagy_tekintés_szemmozgás.html', topics: '4-6', title: 'Középagy, tekintés és szemmozgás' },
                    { file: '7-11. NV_VII_vestib_hallás.html', topics: '7-11', title: 'V., VII. agyideg, vestibularis és hallás' },
                    { file: '12. Szédülés_vertigo.html', topics: '12', title: 'Szédülés és vertigo' },
                    { file: '12-15. Szédülés_bulbaris_híd.html', topics: '12-15', title: 'Szédülés, bulbaris és híd' },
                    { file: '16-20. kisagy_thalamus_caps interna_basalis ggl.html', topics: '16-20', title: 'Kisagy, thalamus, capsula interna, basalis ganglionok' },
                    { file: '21-24. mozgato_paresis_prefront_kérgiszerk.html', topics: '21-24', title: 'Mozgató, paresis, prefrontális, kérgi szerveződés' },
                    { file: '25-27. Dominancia_asszoc_érzőrendszerek.html', topics: '25-27', title: 'Dominancia, asszociációs és érzőrendszerek' },
                    { file: '28-30. Occip_perieet_temporalis.html', topics: '28-30', title: 'Occipitalis, parietalis és temporalis' },
                    { file: '31-34. limbik_magatart_memória_hippocamp.html', topics: '31-34', title: 'Limbikus, magatartás, memória és hippocampus' },
                    { file: '35-38. Hypothal_hypophys_beszéd_fájdalom.html', topics: '35-38', title: 'Hypothalamus, hypophysis, beszéd és fájdalom' },
                    { file: '39-40. gerincvelő_izomtónus.html', topics: '39-40', title: 'Gerincvelő és izomtónus' },
                    { file: '41-43. plexus_cerv_lumb_sacr_autonom.html', topics: '41-43', title: 'Plexusok és autonóm idegrendszer' },
                    { file: '44-48. agyi keringés (carotis, vertebro, gv, vénás).html', topics: '44-48', title: 'Agyi keringés' },
                    { file: '49-53. Vénás anatómia_gvvérell_vénáskeringés_sinuscavernosus_thalamusésbasalisggl.html', topics: '49-53', title: 'Vénás anatómia' },
                    { file: '54-59.  agy víztér, BBB, vér-liquor, transzmitterek.html', topics: '54-59', title: 'Agy víztér, BBB, transzmitterek' }
                ]
            },
            vizsmod: {
                title: 'Vizsgálómódszerek, alap klinikum',
                path: 'content/quizzes/Vizsgálómódszerek, alap klinikum',
                quizzes: [
                    { file: '60-64. EEG, alvás, ürítés, plasztic, genetika.html', topics: '60-64', title: 'EEG, alvás, ürítés, plaszticitás, genetika' },
                    { file: '65-69. gyógyszer, liquor, EEG, EP.html', topics: '65-69', title: 'Gyógyszerinterakciók, liquor, EEG, EP' },
                    { file: '70-75 EMG_ENG_CT_MR_ANGIO_UH.html', topics: '70-75', title: 'EMG, ENG, CT, MR, angiográfia, ultrahang' },
                    { file: '76-79. HEMAT_SZAGLÁS_TEKINTÉS_PUPILLA.html', topics: '76-79', title: 'Haemorheológia, szaglás, tekintés, pupilla' },
                    { file: '80-84.DIPLOPA_NYSTAGMUS_NFAC_BELL_DYSARTH_DYSPHAG.html', topics: '80-84', title: 'Diplopia, nystagmus, facialis, Bell, dysarthria' },
                    { file: '85-89. IZOMGYEENG_ÉRZÉS_DISSZOC_REFLEX_KISAGY.html', topics: '85-89', title: 'Izomgyengeség, érzészavar, reflexek, kisagy' },
                    { file: '90-95. ATAXIA_APHASIA_NEGLECT_APRAXIA_EXEKUTIV.html', topics: '90-95', title: 'Ataxia, aphasia, neglect, apraxia, exekutív' },
                    { file: '96-99. LIBERÁCIÓS_ESZMÉLETLEN_ZAVART_HYPNOID.html', topics: '96-99', title: 'Liberációs jelek, eszméletlen, zavart, hypnoid' },
                    { file: '100-105. NEMHYPN_HERNIA_DEMENCIA_EMLÉKE.html', topics: '100-105', title: 'Nem hypnoid, herniáció, demencia, emlékezés' },
                    { file: '106-110. THALAMUS_SPINALIS_GVTRAUMA_FVPERIF_DERÉK.html', topics: '106-110', title: 'Thalamus, spinális, GV trauma, derékfájás' },
                    { file: '111-115. SPINGYÖK_CONUSCAUDA_ALSÓVÉGTAG_TARDIV_ACM.html', topics: '111-115', title: 'Spinális gyökök, conus/cauda, alsóvégtag, ACM' },
                    { file: '116-119. AGYTÖRZS_HATÁRTER_LACUNA_STEAL.html', topics: '116-119', title: 'Agytörzsi, határterületi, lacunaris, steal' },
                    { file: '120-124. CRANIOCERV_ATHEROGEN_CEREBROVASC_PRIMERPREV_ISCHSTROKE.html', topics: '120-124', title: 'Craniocervicalis, atherogén, cerebrovascularis, primer prevenció' },
                    { file: '125-129 TIA_CARDEMB_AGYIISCH_FIATAL_COAGULO.html', topics: '125-129', title: 'TIA, cardiális embólia, fiatalok stroke-ja' },
                    { file: '130-134. ANTIKOAG_REPERF_INTRACEREBRVÉRZ_SAV_EREKFEJL.html', topics: '130-134', title: 'Antikoaguláns, reperfúzió, ICH, SAV' },
                    { file: '135-139. GVVASC_EPILEPI.html', topics: '135-139', title: 'Gerincvelő vaszkuláris, epilepszia' },
                    { file: '140-145. EPILEPI_ANTIEPI_STATUSEPI_ESZMÉLETRÖV.html', topics: '140-145', title: 'Epilepszia, antiepileptikum, status, eszméletvesztés' },
                    { file: '146-150. IDEGSEBEPI_ENCEPH_EEG_MYELO_KISÉR.html', topics: '146-150', title: 'Idegsebészeti epilepszia, encephalitis, myelopathia' },
                    { file: '151-156. FEHÉRÁLL_PRES_AUTOI_DEMYELIN_SM.html', topics: '151-156', title: 'Fehérállomány, PRES, autoimmun, SM' },
                    { file: '157-161. GVGYULL_GBS_MG_IVIG.html', topics: '157-161', title: 'GV gyulladás, GBS, myasthenia, IVIG' },
                    { file: '162-166. IMMUNTH_GLIOMA_TÉRFOGL_NEUROCUTAN.html', topics: '162-166', title: 'Immunoterápia, glioma, térfoglaló, neurocutan' },
                    { file: '167-170. AGYDAGANAT_IMMUN_NEUROKUTAN_SELLA_ICP.html', topics: '167-170', title: 'Agydaganatok, sella régió, ICP' },
                    { file: '171-175. MIRIGY_SÓVIZ_HYPOGLYK_VITAMIN.html', topics: '171-175', title: 'Endokrin, só-víz, hypoglycaemia, vitamin' },
                    { file: '176-179. HEMAT_PARANEO_ONKO_GYSZ.html', topics: '176-179', title: 'Hematológia, paraneoplasztikus, onkológia, gyógyszer' }
                ]
            },
            klinikum: {
                title: 'Klinikum',
                path: 'content/quizzes/Klinikum',
                quizzes: [
                    { file: '180-187. TRANSZPLAT_PARKINSON_OSAS_ALVÁS.html', topics: '180-187', title: 'Transzplantáció, Parkinson, OSAS, Alvás' },
                    { file: '188-194. PARKINSONP_DYSTONIA_WILSON_TREMOR.html', topics: '188-194', title: 'Parkinson-plus, Dystonia, Wilson, Tremor' },
                    { file: '195-199. BOTOX_JARAS_IGESEB_MENINGITIS.html', topics: '195-199', title: 'Botox, Járás, Idegsebészet, Meningitis' },
                    { file: '200-206. ANTIBIO_NEUROINFEKT_PRION_ENCEPH.html', topics: '200-206', title: 'Antibiotikum, Neuroinfekció, Prion, Encephalitis' },
                    { file: '207-212. ENCEPHALITIS_BELL_MONONEURO_POLY.html', topics: '207-212', title: 'Encephalitis, Bell, Mononeuritis, Polyneuritis' },
                    { file: '213-219. POLYNEURO_ALAGUT_MOTONEURON_IZOMDYS.html', topics: '213-219', title: 'Polyneuropathia, Alagút, Motoneuron, Izomdisztrófia' },
                    { file: '220-225. MYOPATHIA_FÁJDALOMSY_MIGRÉN_TENSIO_NEURALGIA.html', topics: '220-225', title: 'Myopathia, Fájdalom, Migrén, Neuralgia' },
                    { file: '226-230. NEUROPATHIA_PSEUDOTUMOR_ALZHEIMER_DEMENCIA.html', topics: '226-230', title: 'Neuropathia, Pseudotumor, Alzheimer, Demencia' },
                    { file: '231-239. FTD_NPH_NEUROPSZICH_MITOKONDR_TRINUKL_NEUROGENETIKA.html', topics: '231-239', title: 'FTD, NPH, Neuropszichiátria, Mitokondriális, Neurogenetika' },
                    { file: '240-247. NEUROREHAB_KOPONYASÉR_POSTTRAUMA_GVKÁR.html', topics: '240-247', title: 'Neurorehabilitáció, Koponyasérülés, Posttrauma, GV károsodás' },
                    { file: '248-254. PSZISCHOSZOM_ORGANIKUSPSZICH_MONITORINTENZ.html', topics: '248-254', title: 'Pszichoszomatika, Organikus pszichiátria, Monitorozás' },
                    { file: '255-259. DISCOPATHIA_SZÉDÜLŐS_HYDROCEPH_TERHESSÉG_IDŐS.html', topics: '255-259', title: 'Discopathia, Szédülés, Hydrocephalus, Terhesség, Időskor' }
                ]
            }
        };
    }

    handleCategorySelect(category) {
        this.state.currentCategory = category;
        const categoryData = this.quizMetadata[category];
        
        if (categoryData) {
            // Update UI
            this.ui.displayQuizList(categoryData);
            this.ui.switchScreen('quiz-list-screen');
        }
    }

    async handleQuizSelect(quizPath) {
        console.log('[QuizApp] Handling quiz selection:', quizPath);
        
        try {
            this.ui.showLoading(false);
            
            // Extract title from quiz path
            const filename = quizPath.split('/').pop();
            const title = filename.replace('.html', '');
            
            // Hide all screens
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Load quiz in Matrix terminal
            console.log('[QuizApp] Loading quiz in Matrix terminal...');
            if (this.matrixTerminal) {
                await this.matrixTerminal.loadQuiz(quizPath, title);
            } else {
                throw new Error('Matrix terminal not initialized');
            }
            
            this.state.currentQuizPath = quizPath;
            
        } catch (error) {
            console.error('[QuizApp] Error loading quiz:', error);
            this.ui.showError(`Hiba történt a kvíz betöltése közben: ${error.message}`);
            this.ui.showLoading(false);
        }
    }

    // Old quiz handling methods removed - now handled by iframe in terminal

    loadProgress() {
        const saved = localStorage.getItem('quizProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveQuizProgress(results) {
        if (!this.state.userProgress[this.state.currentCategory]) {
            this.state.userProgress[this.state.currentCategory] = {};
        }
        
        this.state.userProgress[this.state.currentCategory][this.state.currentQuizPath] = {
            completed: true,
            bestScore: results.percentage,
            lastAttempt: new Date().toISOString()
        };
        
        localStorage.setItem('quizProgress', JSON.stringify(this.state.userProgress));
        this.updateProgressBars();
    }

    updateProgressBars() {
        Object.keys(this.quizMetadata).forEach(category => {
            const categoryData = this.quizMetadata[category];
            const progress = this.calculateCategoryProgress(category, categoryData);
            this.ui.updateCategoryProgress(category, progress);
        });
    }

    calculateCategoryProgress(category, categoryData) {
        const userCategoryProgress = this.state.userProgress[category] || {};
        const completedQuizzes = Object.keys(userCategoryProgress).filter(
            quiz => userCategoryProgress[quiz].completed
        ).length;
        
        return Math.round((completedQuizzes / categoryData.quizzes.length) * 100);
    }

    onTerminalClose() {
        // Return to quiz list when terminal closes
        console.log('[QuizApp] Terminal closed, returning to quiz list');
        this.ui.switchScreen('quiz-list-screen');
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.quizApp = new QuizApp();
    });
} else {
    window.quizApp = new QuizApp();
}