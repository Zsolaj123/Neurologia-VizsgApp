/**
 * Podcast Data Module
 * Organizes and manages podcast metadata
 */

export class PodcastData {
    constructor() {
        this.categories = {
            neuroanat: {
                name: 'Neuroanatómia',
                path: 'content/podcast/neuroanat/',
                topics: '1-59',
                podcasts: []
            },
            vizsgalat: {
                name: 'Vizsgálómódszerek, alap klinikum',
                path: 'content/podcast/vizsgálómódszerek, alap klinikum/',
                topics: '60-179',
                podcasts: []
            },
            klinikum: {
                name: 'Részletes Klinikum',
                path: 'content/podcast/részletes klinikum/',
                topics: '180-259',
                podcasts: []
            }
        };
    }

    /**
     * Load all podcasts from the server
     */
    async loadPodcasts() {
        for (const [categoryId, category] of Object.entries(this.categories)) {
            try {
                const podcasts = await this.fetchPodcastsForCategory(category.path);
                category.podcasts = this.parsePodcasts(podcasts, categoryId);
                console.log(`Loaded ${category.podcasts.length} podcasts for ${category.name}`);
            } catch (error) {
                console.error(`Error loading podcasts for ${category.name}:`, error);
            }
        }
    }

    /**
     * Fetch podcast files for a category
     * @param {string} path - Category path
     * @returns {Promise<Array>} List of filenames
     */
    async fetchPodcastsForCategory(path) {
        // Since we can't directly list directory contents from the browser,
        // we'll need to either:
        // 1. Create a server endpoint to list files
        // 2. Or maintain a static list of podcast files
        // For now, we'll use a predefined list based on the file structure
        
        // This would ideally be replaced with a server API call
        return this.getStaticPodcastList(path);
    }

    /**
     * Get static podcast list (temporary solution)
     * In production, this should be replaced with a dynamic file listing API
     */
    getStaticPodcastList(path) {
        const lists = {
            'content/podcast/neuroanat/': [
                '1-3 Koponya, Gerinc, Látás_ Életveszélyes Szűkületek és Vak Ablakok.mp3',
                '1. Koponyád Könyvtára_ Amit a Saját Forrásaid Elárulnak.mp3',
                '4-6 Agyad rejtett karmestere_ A szemmozgás hihetetlen világa.mp3',
                '7-14 audio.mp3',
                '12-15 audio.mp3',
                '12-15_2.mp3',
                '16-20 audi.mp3',
                '21-24Mind Over Movement_ Decoding the Brain_s Control Center.mp3',
                '25-26 (2 véltelnje)Agyféltekék tánca és a szem titkai_ Lenyűgöző betekintés az idegrendszerbe.mp3',
                '27-30 Agyunk titkos térképei_ Hogyan látunk, hallunk, érzünk és értünk_.mp3',
                '31-33Érzelem, Emlék, Döntés_ Az Agy Színfalai Mögött.mp3',
                '34-36Agyunk titkai_ Emlékek, hormonok és a beszéd rejtélyei.mp3',
                '37-40Gerincvelő_ A Test Autópályája – Fájdalom, Mozgás és a Tudat Kapui.mp3',
                '41.43 A Tested Belső Kábelei_ Útmutató Az Idegek És A Robotpilóta Rendszerhez.mp3',
                '44-46 Agyi keringés_ Élet és halál másodpercek alatt.mp3',
                '47-50Agyvérzés és Gerincvelő_ Élet és Halál a Szűk Utcákban.mp3',
                '51-53. Agyunk Érhálózata_ Élet és Halál Egy Vékony Vonalon.mp3',
                '54-57. Agyunk titkos védelme_ Falak, folyadék és a gliasejtek hadserege.mp3',
                '58-59. Agypáncél és Belső Erőforrások_ Hogyan Védekezik és Táplálkozik a Legokosabb Szervünk_.mp3'
            ],
            'content/podcast/vizsgálómódszerek, alap klinikum/': [
                '60-61. EEG_ Térkép az Alvó Agyhoz és Éjszakai Utazásaink.mp3',
                '62-63. Agyunk Kormányoz_ Titkos Irányítás és Csodálatos Átalakulás.mp3',
                '64-65. Agyunk Sorsa Génekben Kódolva, Gyógyszerekkel Szőve_ Neurológiai Kaland a Tudomány Labirintusában.mp3',
                '66-67. Agyi-gerincvelői folyadék_ Élet vagy véletlen_.mp3',
                '68-69. Agyhullámok és Idegpályák Titkai_ EEG és EP Közelről.mp3',
                '70-71. Idegek és Izmok Titkos Nyelve_ EMG és ENG a Kórnyomában.mp3',
                '72-73. Agyvizsgálat Röntgennel és Mágneses Erővel_ CT, MR, Angiográfia – Mikor melyik _szemüveg_ a legjobb_.mp3',
                '74-75. Agyunk rejtett világa_ Funkció és vérellátás a képalkotás tükrében.mp3',
                '76-77. A vér titkai és az illatok rejtélyei_ agyunk két arca.mp3',
                '77-79. A Pupillák Titkos Nyelve_ Életveszélyes Jelek és Rejtett Üzenetek.mp3',
                '80-81. A szemed titkos üzenetei_ Kettőslátás és szemtekerezgés, ami mögött rejtőzhet.mp3',
                '82-83. Arcbénulás_ Amit tudnod kell az arcidegről és a Bell-parézisről.mp3',
                '84-85. Izomgyengeség, Beszédzavar, Nyelési Nehézség_ Mit Üzen a Testünk_.mp3',
                '86-87. Külön Utakon Járó Érzések_ A Disszociált Érzészavar Rejtélye.mp3',
                '88-89. Reflexek és Rángások_ Az Idegek és a Kisagy Titkai.mp3',
                '90-92. Botladozó léptek, elakadó szavak_ Az ataxia és az afázia rejtélyei.mp3',
                '93-95. Amikor az agy tréfál_ Neglekt, apraxia, agnózia és az exekutív funkciók rejtélyei.mp3',
                '96- 98. Eszméletvesztés, Zavarodottság, És Elfeledett Reflexek_ Mi Történik Az Agyban_.mp3',
                '99-100. A tudatzavarok titkai_ éberség, tartalom és a valóság elmosódó határai.mp3',
                '101-102. Fejünkben a Veszély_ Az Agy Beékelődés és a Koponyaűri Nyomás Tragikus Játékai.mp3',
                '103-104. Fejfájás és Demencia_ Mikor üssünk vészharangot_ - Tünetek, Veszélyek és Félreértések.mp3',
                '105-106. Memória és Thalamus_ Az Elfelejtett Kapcsoló az Agyműködésben.mp3',
                '107-108. Gerincvelő sérülések_ Két típus, két veszély – Amikor az idő életet ment.mp3',
                '109&113 Felső- és Alsó Végtagi Idegkárosodások_ Detektívmunka a Tünetek Labirintusában – Mikor Jeleznek Vészhelyzetet a Testünk _Vörös Zászlói__.mp3',
                '110-112. Derékfájás, Lumbágó, Isiász_ Mikor kell azonnal orvoshoz fordulni_ Red Flag-ek és a Cauda Equina Szindróma.mp3',
                '114. Tardív Diszkinézia_ Miért Mozog Akaratlanul a Testem_ Gyógyszer-indukált Mozgászavarok és Új Kezelési Lehetőségek.mp3',
                '115-116. Az Agyi Detektívmunka_ A Stroke Rejtélyes Tünetei és a _Bezártság Szindróma_.mp3',
                '117-118. Rejtett Agyi Infarktusok_ Határterületi és Lacunaris Stroke – Különbségek és Megelőzés.mp3',
                '119-120. Lopott Vér, Billegő Fej_ Két Rejtélyes Betegség, Ami Összeköt és Megtéveszt.mp3',
                '121-122. Érelmeszesedés és Stroke_ Az Alattomos Gyulladás, Ami Megelőzhető – A Kockázatok és Teendők.mp3',
                '123-124. Stroke_ Előzd meg az elsőt! Okok, rizikófaktorok és a 80%-ban elkerülhető veszély.mp3',
                '125-126. TIA és a Szív Kapcsolata_ Vészjelzésből Megelőzés – Hogyan Előzd meg a Stroke-ot_.mp3',
                '127-128. Stroke fiatalon és idősen_ Rejtett okok és életmentő percek – amit az agyi érkatasztrófáról tudnod kell.mp3',
                '129-130. Véralvadás és Agy_ Veszélyek, Egyensúly és Életmentő Kezelések.mp3',
                '131-132. Stroke Mélyelemzés_ Idő, Agy és a Modern Kezelések – Izgalmas Áttörések és Ami a CT Után Jön.mp3',
                '133-134. Villámcsapás-fejfájás és az agyi érrendszer rejtett veszélyei_ Amit a spontán szubarachnoideális vérzésről tudni érdemes.mp3',
                '135. Gerincvelői Vaszkuláris Károsodások_ A Rejtett Stroke-tól a Batson Plexus Titkáig.mp3',
                '136-137. Epilepszia_ Az Agy Elektromos Viharai – Roostok, Mechanizmusok és az EEG Titkai.mp3',
                '138-139. Epilepszia_ Az Agy Elektromos Viharai – Roostok, Mechanizmusok és az EEG Titkai.mp3',
                '140-141. Epilepszia vagy _csak_ egy roham_ Az első roham kivizsgálása és a diagnózis kulisszatitkai.mp3',
                '143-144. Epilepszia Kezelés A-tól Z-ig_ Mikor Kell Gyógyszer és Mit Tegyünk Vészhelyzetben_.mp3',
                '145. Ájulás, Epilepszia, PNES_ A Rövid Eszméletvesztések Titkai és Miért Fontos az Elkülönítés.mp3',
                '146. Epilepszia idegsebészete_ Milyen műtétek adnak reményt a gyógyszerrezisztens esetekben_.mp3',
                '147-148. Encephalopathia és EEG_ Az Agy Rejtett Hullámai és Betegségei.mp3',
                '149. Mielopátia_ Gyűjtőfogalom a gerincvelő működési zavarairól – Tünetek, okok és kezelés a szakértő szemével.mp3',
                '150-151. Agyunk rejtélyei_ Stroke és fehérállományi károsodások – Források mélymerülése a megelőzésért.mp3',
                '152-153. PRES és Autoimmun Encephalitisek_ Az Agy Árvize és Az Immunrendszer Támadása – Mi a Különbség_.mp3',
                '155.156. Sclerosis Multiplex_ Rejtélyes Betegségtől a Forradalmi Kezelésekig – Egy Mélymerülés az SM Világába.mp3',
                '157. Mielitisz_ Gerincvelő-gyulladás – Az Okok, Tünetek és a Titokzatos Antitestek Világa.mp3',
                '158. GBS és CIDP_ A Perifériás Idegrendszer Autoimmun Betegségei – Mi a Különbség, és Miért Fontos_.mp3',
                '159. Myasthenia Gravis_ Mélymerülés az Ingadozó Izomgyengeség Világába.mp3',
                '160-161. 3 alapvető immunterápia neurológiai betegségekben_ Szteroidok, Plazmaferézis és IVIG – Hatásmechanizmus, indikációk és kockázatok.mp3',
                '162. Neuroimmunológiai Betegségek Kezelése_ A Súlyos, Mégis Személyre Szabott Harc az Immunrendszer Ellen.mp3',
                '163-164. Agydaganatok Forradalma_ Glioma és Meningeoma – A Molekuláris Ujjlenyomat Átalakítja a Diagnózist és a Kezelést.mp3',
                '165-166. Agyunk Két Kényes Pontja_ Sella Régió és Neurokután Szindrómák – Betegségek és Célzott Terápiák.mp3',
                '167-168. Agydaganatok és Áttétek_ Molekuláris Diagnózistól a Személyre Szabott Kezelésig.mp3',
                '169-170. Agyödéma és Koponyán Belüli Nyomás_ Az Ördögi Kör Megszakítása a Diagnózistól a Műtétig.mp3',
                '171-172. Amikor a Hormonok és az Anyagcsere Fárasztja az Agyat_ Visszafordítható Tünetek és Rejtett Kórképek.mp3',
                '173-174. Boruló belső egyensúly_ só, víz és cukor – Így hat agyadra a kémiai harmónia felborulása.mp3',
                '175-176. Vitaminok és vérkép_ Rejtett összefüggések az idegrendszerrel – Wernicke, B12, folsav és ami mögöttük van.mp3',
                '177. Légzés, pupilla, tudat_ Neurológiai Gyógyszerek Túladagolása és Azonnali Teendők.mp3',
                '178-179. Rák és Idegrendszer_ Rejtett Tünetek, Mellékhatások és a Diagnózis Kihívásai.mp3'
            ],
            'content/podcast/részletes klinikum/': [
                '180. Az Elfeledett Mellékhatás_ Neurológiai Szövődmények Szervátültetés Után – Akár 75%-os Kockázat.mp3',
                '181-182. Alkoholtól és Drogoktól Az Idegszálakig_ Az Agy Speciális Károsodásai és a Rejtett Táplálkozási Hiányok.mp3',
                '183-184. Alvászavarok A-tól Z-ig_ OSAS, Inszomnia és Ami Még Fontosabb – Hogyan Jelezhetik Agyi Betegségeket_.mp3',
                '185-187. Parkinson-kór_ A Remegésen Túl – Korai Jelek, Rejtett Tünetek és Kezelési Kihívások.mp3',
                '188. Remegésről Részletesen_ Tünettől a Kezelésig és Az Agy Titkai.mp3',
                '189-190. Parkinsonizmus útvesztő_ Atípusos formák és másodlagos okok mélyelemzése.mp3',
                '191-192. Mozgászavarok és Rejtett Rémek_ Dystonia, Chorea és a Wilson-kór Titkai.mp3',
                '193-194. Disztónia és Chorea_ Két Mozgászavar – Mi a Lényegi Különbség_.mp3',
                '195. Botox Beyond Beauty_ Unpacking the Surprising Medical Power of Botulinum Toxin A.mp3',
                '195. Botox a neurológiában_ Méregből gyógyszer – A célzott idegkezelés titkai és jövője.mp3',
                '196. Járászavarok_ Az Idegrendszer Titkai a Lépéseinkben – Diagnózis és Figyelmeztető Jelek.mp3',
                '196. The Secret Language of Your Walk_ Decoding Neurological Gait Disorders.mp3',
                '197-198. Idegsebészet és Autonóm Zavarok_ Mikor Segít a Műtét, és Hogyan Érthetők a _Láthatatlan_ Tünetek_.mp3',
                '199. Agyhártyagyulladás vagy Agytályog_ Életmentő Különbségek és a Gyors Felismerés Fontossága.mp3',
                '200-201. Agyunk védelme és támadása_ Neuroinfekciók és AIDS az idegrendszerben.mp3',
                '202-203. Az Agy Kaméleonjai_ Neuroborreliosis és Neurosyphilis – Két Alattomos Idegrendszeri Fertőzés.mp3',
                '204-205. Rejtett Kórokozók és Agytámadó Paraziták_ Az Idegrendszer Védelmében.mp3',
                '206-207. Az idegrendszer alattomos ellenségei_ Lassú vírusok, prionok és az agyvelőgyulladás.mp3',
                '208. Bell-parézis_ Amikor az arc megbénul – Okok, tünetek, diagnózis és kilátások.mp3',
                '209-210. Zsibbadás, Fájdalom, Gyengeség_ Mikor jelez idegkárosodást a tested_ - A mononeuropathiák rejtett okai és kezelése.mp3',
                '211-212. Polyneuropathia_ Diagnózis, Kezelés és a Jövő Ígéretei – Egy Kesztyű-Zokni Szenvedés Anatómiája.mp3',
                '213-214. Polyneuropathia_ Az Idegek Rejtélyei – Diagnózis, Okok és Áttörések a Kezelésben.mp3',
                '215-216. Alagút Szindrómák vs. Motoneuron Betegségek_ A Zsibbadás és Gyengeség Két Arca – Mi az Eltérés_',
                '217. Izombetegségek Detektívmunkája_ A Myopathia Diagnózisától a Kezelésig.mp3',
                '218-219. Izombetegségek és Ideg-Izom Kapcsolat_ Dystrophia, Myotonia és Autoimmun Támadások Feltárása.mp3',
                '220-221. Szerzett Izombetegségek_ Miért Fontos Tudnod a Myopathiákról és Mi Rejlik Mögöttük_.mp3',
                '222-223. Fájdalomszindrómák és Migrén_ Miért Komplexebb, Mint Gondolnád_ – Biopszichoszociális Megközelítés és Új Kezelések.mp3',
                '224-225. Fejfájások és Neuralgiák_ Amikor a Fejünk Pokollá Válhat – A Vörös Zászlóktól az Öngyilkos Fájdalomig.mp3',
                '226-227. Neuropátia és Ál-agydaganat_ Két Rejtélyes Neurológiai Állapot Különbségei és Kezelése.mp3',
                '228. Alzheimer_ Globális Kihívás, Megelőzés és Agyunk Titkai – Miért Nem Végzet a Genetika_.mp3',
                '229-230. Vascularis és Nem-Alzheimer Demenciák_ Sok Arc, Más Tünetek és Agyvédelem.mp3',
                '231. FTD_ A Demencia Rejtett Arca – Viselkedés, Nyelv és Új Remények Fiatalabb Korban.mp3',
                '232-233. Demencia vagy Kezelhető Ok_ Amikor a Vízfejűség Utánozza a Hanyatlást.mp3',
                '234-235. Demenciák_ A Korai Felismeréstől a Célzott Terápiákig – Új Remény a Szellemi Frissességért.mp3',
                '236-237. Örökletes Idegrendszeri Betegségek_ Mitokondriális Zavarok és Genetikai Dadogás – A Genetika Rejtélyei és a Jövő Terápiái.mp3',
                '238-239. Neurogenetika és a Diagnosztikai Forradalom_ A Génterápiától az Etikai Dilemmákig.mp3',
                '240-241. Agysérülés Után_ Neuroplaszticitás, Afázia és a Kommunikáció Helyreállítása – Mi a Siker Kulcsa_.mp3',
                '242-243. Fejsérüléstől a Rehabilitációig_ Amit a Traumás Agykárosodásról Tudni Kell.mp3',
                '244-245. Rejtett Károk az Agyműködésben_ Mi az a TAS és Hogyan Védhetjük Meg Magunkat_.mp3',
                '246-247. Gerincvelő-károsodás vs. Harántlézió_ Mi a Különbség és Miért Számít az Idő_',
                '248-249. Elme, Agy és Test_ A Neurológiai Betegségek Rejtett Kapcsolatai – FND-től a Depresszióig.mp3',
                '250-251. Agyhibák vagy Szoftveres Zavarok_ A Neurokognitív és Funkcionális Tüneti Zavarról.mp3',
                '252-253. Agyhalál és Agyvédelem_ A Neuro-Intenzív Osztályok Rejtélyes Világa.mp3',
                '254. Az Idő Életet Ment_ Neurológiai Vészhelyzetek Gyors Felismerése és Kezelése – A Stroketól a Ritka Szindrómákig.mp3',
                '255. Discopáthia és Gerincsérv_ Különbségek, Tünetek és Hatékony Kezelés Műtét Nélkül.mp3',
                '256-257. Szédülés és Vízfejűség_ Az Érthető Útmutató a Diagnózis Labirintusában.mp3',
                '258-259. Neurológiai kihívások terhesség és idős korban_ Biztonságos kezelés és a preeclampsia rejtett öröksége.mp3'
            ]
        };

        return lists[path] || [];
    }

    /**
     * Parse podcast filenames to extract metadata
     * @param {Array} filenames - List of podcast filenames
     * @param {string} categoryId - Category identifier
     * @returns {Array} Parsed podcast objects
     */
    parsePodcasts(filenames, categoryId) {
        return filenames
            .filter(filename => filename.endsWith('.mp3'))
            .map((filename, index) => {
                const parsed = this.parseFilename(filename);
                return {
                    id: `${categoryId}_${index}`,
                    categoryId,
                    filename,
                    ...parsed
                };
            })
            .sort((a, b) => {
                // Sort by start topic number
                const aStart = parseInt(a.topicNumbers.split('-')[0]) || 999;
                const bStart = parseInt(b.topicNumbers.split('-')[0]) || 999;
                return aStart - bStart;
            });
    }

    /**
     * Parse a podcast filename to extract topic numbers and title
     * @param {string} filename - Podcast filename
     * @returns {Object} Parsed metadata
     */
    parseFilename(filename) {
        // Remove .mp3 extension
        const name = filename.replace('.mp3', '');
        
        // Try to extract topic numbers at the beginning
        const topicMatch = name.match(/^(\d+(?:-\d+)?(?:\.\d+)?)/);
        
        let topicNumbers = '';
        let title = name;
        
        if (topicMatch) {
            topicNumbers = topicMatch[1];
            // Remove topic numbers from title
            title = name.substring(topicMatch[0].length).trim();
            
            // Clean up title - remove leading punctuation
            title = title.replace(/^[._\s]+/, '');
        }
        
        // Clean up title
        title = title.replace(/_/g, ' ').trim();
        
        return {
            topicNumbers,
            title: title || 'Névtelen podcast',
            duration: null // Would need server-side processing to get actual duration
        };
    }

    /**
     * Get podcasts for a specific category
     * @param {string} categoryId - Category identifier
     * @returns {Array} List of podcasts
     */
    getPodcastsByCategory(categoryId) {
        return this.categories[categoryId]?.podcasts || [];
    }

    /**
     * Get category info
     * @param {string} categoryId - Category identifier
     * @returns {Object} Category information
     */
    getCategoryInfo(categoryId) {
        return this.categories[categoryId];
    }

    /**
     * Search podcasts across all categories
     * @param {string} query - Search query
     * @returns {Array} Matching podcasts
     */
    searchPodcasts(query) {
        const lowercaseQuery = query.toLowerCase();
        const results = [];
        
        for (const [categoryId, category] of Object.entries(this.categories)) {
            const matches = category.podcasts.filter(podcast => {
                return podcast.title.toLowerCase().includes(lowercaseQuery) ||
                       podcast.topicNumbers.includes(query);
            });
            results.push(...matches);
        }
        
        return results;
    }

    /**
     * Get the full URL for a podcast file
     * @param {Object} podcast - Podcast object
     * @returns {string} Full URL
     */
    getPodcastUrl(podcast) {
        const category = this.categories[podcast.categoryId];
        // URL encode the path to handle spaces and special characters
        const encodedPath = category.path.split('/').map(part => encodeURIComponent(part)).join('/');
        const encodedFilename = encodeURIComponent(podcast.filename);
        return `${encodedPath}${encodedFilename}`;
    }

    /**
     * Get podcast count for a category
     * @param {string} categoryId - Category identifier
     * @returns {number} Number of podcasts
     */
    getPodcastCount(categoryId) {
        return this.categories[categoryId]?.podcasts.length || 0;
    }

    /**
     * Create a playlist from topic range
     * @param {string} categoryId - Category identifier
     * @param {number} startTopic - Start topic number
     * @param {number} endTopic - End topic number
     * @returns {Array} Playlist of podcasts
     */
    createPlaylistFromRange(categoryId, startTopic, endTopic) {
        const categoryPodcasts = this.getPodcastsByCategory(categoryId);
        return categoryPodcasts.filter(podcast => {
            const topicStart = parseInt(podcast.topicNumbers.split('-')[0]) || 0;
            return topicStart >= startTopic && topicStart <= endTopic;
        });
    }
}

// Export a singleton instance
export const podcastData = new PodcastData();