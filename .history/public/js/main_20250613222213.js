// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // --- STATE & TRANSLATIONS ---
    const appState = {
        currentStep: 0,
        selectedCategory: null,
        selectedMode: '',
        questionCount: 5,
        isLoggedIn: false, // Simule l'état de connexion
        isPremium: false,
        questionsLeft: 20,
    };

    // La fonction 't' utilise les données passées depuis le contrôleur via la balise <script> dans index.hbs
    const t = (key) => window.localeData[key] || key;

    // --- DOM ELEMENTS ---
    const steps = document.querySelectorAll('.step');
    const categoryGrid = document.querySelector('.category-grid');
    const step1_Title = document.getElementById('step-1-title');
    const step1_Options = document.getElementById('step-1-options');
    const step2_Title = document.getElementById('step-2-title');
    const fileTypeSelector = document.getElementById('file-type-selector');
    const youtubeInput = document.getElementById('youtube-link-input');
    const headerIcon = document.querySelector('.header-icon');
    const questionsLeftText = document.querySelector('.questions-left-text');


    // --- DATA ---
    const categories = [
        { titleKey: "category_mcq", image: "qcm.png", enabled: true, mode: "quiz" },
        { titleKey: "category_true_false", image: "vf.png", enabled: true, mode: "tf" },
        { titleKey: "category_summary", image: "resume.png", enabled: true, mode: "summary" },
        { titleKey: "category_flashcards", image: "flashcards.png", enabled: true, mode: "flashcards" },
        { titleKey: "category_fill_in_blank", image: "fill_blank.png", enabled: true, mode: "fill_in_blank" },
        { titleKey: "category_vocabulary", image: "vocabulary.png", enabled: true, mode: "vocabulary" },
        { titleKey: "category_youtube_to_quiz", image: "youtube.png", enabled: true, mode: "youtube" },
        { titleKey: "category_podcast", image: "podcast.png", enabled: true, mode: "podcast" },
        { titleKey: "category_chronology", image: "chronology.png", enabled: false, mode: "chronology" },
        { titleKey: "category_identification", image: "identification.png", enabled: false, mode: "identification" },
    ];

    // --- RENDER FUNCTIONS ---
    
    function renderCategoryGrid() {
        categoryGrid.innerHTML = ''; // Vide la grille avant de la remplir
        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.dataset.mode = cat.mode;
            
            const title = document.createElement('span');
            title.className = 'card-title';
            title.textContent = t(cat.titleKey);
            card.appendChild(title);
            
            const icon = document.createElement('img');
            icon.className = 'card-icon';
            // Le chemin commence par /public/ car c'est le préfixe que vous avez défini dans main.ts
            icon.src = `/public/images/${cat.image}`;
            icon.alt = t(cat.titleKey);
            card.appendChild(icon);

            if (cat.enabled) {
                card.addEventListener('click', () => handleCategoryClick(cat));
            } else {
                card.classList.add('disabled');
            }

            categoryGrid.appendChild(card);
        });
    }
    
    function renderStep1() {
        const isSummary = appState.selectedMode === 'summary' || appState.selectedMode === 'podcast';
        step1_Title.textContent = isSummary ? t('choose_summary_length') : t('choose_number_questions');

        step1_Options.innerHTML = '';
        const options = isSummary
            ? [{ text: t('length_short'), value: 5 }, { text: t('length_medium'), value: 10 }, { text: t('length_long'), value: 15 }]
            : [5, 10, 15, 20];
        
        options.forEach(opt => {
            const value = isSummary ? opt.value : opt;
            const text = isSummary ? opt.text : String(opt);
            const button = document.createElement('button');
            button.className = 'selector-button';
            button.textContent = text;
            button.dataset.count = value;
            
            if (!appState.isPremium && appState.questionsLeft < value) {
                button.disabled = true;
            } else {
                 button.addEventListener('click', () => handleQuestionCountClick(value));
            }
            step1_Options.appendChild(button);
        });
    }

    function renderStep2() {
        if(appState.selectedMode === 'youtube') {
            fileTypeSelector.style.display = 'none';
            youtubeInput.style.display = 'flex';
            step2_Title.textContent = t('paste_youtube_link');
        } else {
            fileTypeSelector.style.display = 'flex';
            youtubeInput.style.display = 'none';
            step2_Title.textContent = t('choose_file_type');
        }
    }
    
    function updateUI() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === appState.currentStep);
        });
        
        const showIcon = appState.currentStep === 0 || appState.isPremium;
        headerIcon.style.display = showIcon ? 'block' : 'none';
        questionsLeftText.style.display = showIcon ? 'none' : 'block';
        if (!showIcon) {
            document.getElementById('questions-left').textContent = appState.questionsLeft;
        }

        if(appState.currentStep === 0) renderCategoryGrid();
        if(appState.currentStep === 1) renderStep1();
        if(appState.currentStep === 2) renderStep2();
    }

    // --- EVENT HANDLERS ---
    function handleCategoryClick(category) {
        appState.selectedMode = category.mode;
        appState.currentStep = 1;
        updateUI();
    }
    
    function handleQuestionCountClick(count) {
        appState.questionCount = count;
        appState.currentStep = 2;
        updateUI();
    }
    
    function handleBackButtonClick(event) {
        const targetStep = parseInt(event.target.dataset.targetStep, 10);
        appState.currentStep = targetStep;
        updateUI();
    }

    // --- INITIALIZATION ---
    function init() {
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', handleBackButtonClick);
        });
        updateUI(); // Premier rendu de la page
    }

    init();
});