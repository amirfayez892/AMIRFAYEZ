const SUPABASE_URL = 'https://pmswnjfofyhmrazkmrif.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6Qop3p-b_EqSXwQ44Kq-Lw_Zvay78y4';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let cloudProjectsCache = [];
let activeQrSrc = '';
let activeQrLink = 'https://www.tiktok.com/@amirfayez15';
let activeQrFilename = 'qr-tiktok.png';

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode-active');
}

const bios = {
    ar: [
        "أنا أمير فايز، مطور برمجيات محترف ومبتكر حلول رقمية.",
        "أقوم ببرمجة وتصميم مواقع وتطبيقات ويب استثنائية وعالية الأداء.",
        "أتميز بسرعة عمل فائقة وإنجاز المشاريع في أسرع وقت ممكن.",
        "أسعار تنافسية جداً ومناسبة لكل الميزانيات مع جودة عالمية لا تُقارن.",
        "تصاميم عصرية، جذابة، ومتجاوبة تماماً مع جميع الشاشات والأجهزة.",
        "أهتم بأدق تفاصيل تجربة المستخدم (UI/UX) لضمان نجاح مشروعك.",
        "كفاءة برمجية عالية وكود نظيف (Clean Code) قابل للتطوير المستقبلي.",
        "دعم فني مستمر واستجابة سريعة لجميع استفسارات عملائنا.",
        "اجعل مشروعك ينطلق بقوة واكسب ثقة عملائك بموقع رقمي احترافي.",
        "اطلب موقعك الآن ودعني أحول أفكارك إلى واقع رقمي مذهل!"
    ],
    en: [
        "I am Amir Fayez, a professional software developer and digital solutions innovator.",
        "I program and design exceptional, high-performance websites and web applications.",
        "I excel in ultra-fast working speed and project delivery in record time.",
        "Extremely competitive pricing suitable for all budgets with unmatched global quality.",
        "Modern, engaging, and fully responsive designs across all screens and devices.",
        "Meticulous attention to UI/UX user experience details to guarantee your project's success.",
        "High coding efficiency and clean, scalable code ready for future updates.",
        "Continuous technical support and rapid response to all client inquiries.",
        "Launch your project strongly and gain customer trust with a professional digital site.",
        "Order your website now and let me turn your ideas into an amazing reality!"
    ],
    de: [
        "Ich bin Amir Fayez, ein professioneller Softwareentwickler und Innovator digitaler Lösungen.",
        "Ich programmiere und designe außergewöhnliche, hochleistungsfähige Websites und Web-Apps.",
        "Ich zeichne mich durch extrem schnelle Arbeitsgeschwindigkeit und termingerechte Lieferung aus.",
        "Äußerst wettbewerbsfähige Preise für jedes Budget bei unvergleichlicher globaler Qualität.",
        "Moderne, ansprechende und vollständig responsive Designs für alle Bildschirme.",
        "Akribische Aufmerksamkeit für UI/UX-Details, um den Erfolg Ihres Projekts zu garantieren.",
        "Hohe Code-Effizienz und sauberer, skalierbarer Code für zukünftige Updates.",
        "Kontinuierlicher technischer Support und schnelle Reaktionszeiten.",
        "Starten Sie Ihr Projekt stark und gewinnen Sie Kundenvertrauen mit einer professionellen Website.",
        "Bestellen Sie jetzt Ihre Website und lassen Sie mich Ihre Ideen in die Realität umsetzen!"
    ]
};

const translations = {
    ar: {
        navHome: "الرئيسية",
        navAbout: "عني",
        navProjects: "المشاريع",
        navServices: "الخدمات",
        navContact: "التواصل",
        mainTitleAr: "أمير فايز",
        mainTitleDe: "AMIR FAYEZ",
        mainTitleEn: "AMIR FAYEZ",
        subRole: "مطور تطبيقات ومواقع إلكترونية محترف",
        exploreBtn: "اطلب موقعك الآن",
        projectsTitle: "المواقع والتطبيقات التي قمت ببرمجتها",
        projTag: "موقع ويب احترافي",
        projTitle: "موقع الفنان شهاب",
        projDesc: "موقع تفاعلي مخصص لعرض الأعمال الموسيقية والملفات الشخصية بتصميم عصري وجذاب.",
        viewProjBtn: 'معاينة المشروع الاحترافي <i class="fa-solid fa-arrow-left"></i>',
        servicesTitle: "لماذا تختار خدماتنا البرمجية؟",
        serv1Title: "سرعة فائقة في التنفيذ",
        serv1Desc: "نسلمك مشروعك في مدة قياسية وبأعلى كفاءة ممكنة.",
        serv2Title: "أسعار استثنائية",
        serv2Desc: "تكاليف مناسبة لكل الميزانيات مع جودة عالمية لا تقبل المنافسة.",
        serv3Title: "دعم واستقرار تام",
        serv3Desc: "كود برمجي نظيف وآمن قابل للتطوير المستقبلي بسهولة.",
        contactTitle: "اطلب موقعك الخاص أو تواصل معي مباشرة",
        contactSub: "اختر الطريقة المناسبة لك للتواصل وابدأ مشروعك البرمجي معنا الآن:",
        footerText: "جميع الحقوق محفوظة © 2026 | المطور أمير فايز"
    },
    en: {
        navHome: "Home",
        navAbout: "About",
        navProjects: "Projects",
        navServices: "Services",
        navContact: "Contact",
        mainTitleAr: "أمير فايز",
        mainTitleDe: "AMIR FAYEZ",
        mainTitleEn: "AMIR FAYEZ",
        subRole: "Professional Web & App Developer",
        exploreBtn: "Order Your Website Now",
        projectsTitle: "Websites and Applications I Have Programmed",
        projTag: "Professional Website",
        projTitle: "Shehab's Official Website",
        projDesc: "An interactive website dedicated to showcasing musical works and personal profiles with a modern design.",
        viewProjBtn: 'Preview Professional Project <i class="fa-solid fa-arrow-left"></i>',
        servicesTitle: "Why Choose Our Programming Services?",
        serv1Title: "Ultra-Fast Execution",
        serv1Desc: "We deliver your project in record time with maximum efficiency.",
        serv2Title: "Exceptional Pricing",
        serv2Desc: "Costs suitable for all budgets with unmatched global quality.",
        serv3Title: "Full Support & Stability",
        serv3Desc: "Clean and secure code easily scalable for future updates.",
        contactTitle: "Order Your Website or Contact Me Directly",
        contactSub: "Choose your preferred way to contact us and start your software project now:",
        footerText: "All Rights Reserved © 2026 | Developer Amir Fayez"
    },
    de: {
        navHome: "Startseite",
        navAbout: "Über mich",
        navProjects: "Projekte",
        navServices: "Dienstleistungen",
        navContact: "Kontakt",
        mainTitleAr: "أمير فايز",
        mainTitleDe: "AMIR FAYEZ",
        mainTitleEn: "AMIR FAYEZ",
        subRole: "Professioneller Web- & App-Entwickler",
        exploreBtn: "Jetzt Website Bestellen",
        projectsTitle: "Websites und Anwendungen, die ich programmiert habe",
        projTag: "Professionelle Website",
        projTitle: "Offizielle Website von Shehab",
        projDesc: "Eine interaktive Website zur Präsentation von Musikwerken und Profilen im modernen Design.",
        viewProjBtn: 'Projektvorschau <i class="fa-solid fa-arrow-left"></i>',
        servicesTitle: "Warum unsere Programmierdienstleistungen wählen?",
        serv1Title: "Blitzschnelle Ausführung",
        serv1Desc: "Wir liefern Ihr Projekt in Rekordzeit mit höchster Effizienz.",
        serv2Title: "Außergewöhnliche Preise",
        serv2Desc: "Kosten für jedes Budget bei unvergleichlicher globaler Qualität.",
        serv3Title: "Vollständiger Support",
        serv3Desc: "Sauberer und sicherer Code für zukünftige Updates.",
        contactTitle: "Bestellen Sie Ihre Website oder kontaktieren Sie mich direkt",
        contactSub: "Wählen Sie Ihren bevorzugten Kommunikationsweg und starten Sie Ihr Projekt:",
        footerText: "Alle Rechte vorbehalten © 2026 | Entwickler Amir Fayez"
    }
};

let currentLang = 'ar';
let bioIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimer = null;

function runTypeWriterStep() {
    const typedTextElement = document.getElementById('typedText');
    if (!typedTextElement) return;

    const currentSentences = bios[currentLang] || bios.ar;
    const fullText = currentSentences[bioIndex] || '';
    let delay = 65;

    if (!isDeleting) {
        charIndex++;
        typedTextElement.textContent = fullText.slice(0, charIndex);

        if (charIndex >= fullText.length) {
            isDeleting = true;
            delay = 1800;
        } else {
            delay = 65;
        }
    } else {
        charIndex--;
        typedTextElement.textContent = fullText.slice(0, Math.max(0, charIndex));

        if (charIndex <= 0) {
            charIndex = 0;
            isDeleting = false;
            bioIndex = (bioIndex + 1) % currentSentences.length;
            delay = 450;
        } else {
            delay = 30;
        }
    }

    typewriterTimer = setTimeout(runTypeWriterStep, delay);
}

function startTypeWriter(reset = false) {
    if (typewriterTimer) {
        clearTimeout(typewriterTimer);
        typewriterTimer = null;
    }

    const typedTextElement = document.getElementById('typedText');
    if (!typedTextElement) return;

    if (reset) {
        bioIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typedTextElement.textContent = '';
    }

    typewriterTimer = setTimeout(runTypeWriterStep, 120);
}

function setupScrollReveal() {
    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    items.forEach(el => observer.observe(el));
}

function updateScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    bar.style.width = `${progress}%`;
}

function hideIntroCurtain() {
    const curtain = document.getElementById('introCurtain');
    if (!curtain) return;
    setTimeout(() => {
        curtain.classList.add('hide-curtain');
    }, 550);
}

function renderCloudProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const shehabCard = grid.firstElementChild;
    grid.innerHTML = '';
    if (shehabCard) {
        grid.appendChild(shehabCard);
    }

    cloudProjectsCache.forEach(p => {
        const title = p[`title_${currentLang}`] || p.title_ar;
        const desc = p[`desc_${currentLang}`] || p.desc_ar;
        const techArray = (p.tech || '')
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
            .map(t => `<span>${t}</span>`)
            .join(' ');

        const tagText = currentLang === 'de' ? 'Neues Projekt' : currentLang === 'en' ? 'New Project' : 'مشروع جديد';
        const btnText = currentLang === 'de' ? 'Projektvorschau' : currentLang === 'en' ? 'Preview Project' : 'معاينة المشروع';

        const card = document.createElement('div');
        card.className = 'project-card interactive-card shehab-project-card reveal-item';
        card.innerHTML = `
            <div class="project-preview-img-box">
                <img src="${p.img}" alt="${title}" class="shehab-logo-img">
            </div>
            <div class="project-details-content">
                <div class="project-tag">${tagText}</div>
                <h3 class="project-title">${title}</h3>
                <p class="project-desc">${desc}</p>
                <div class="project-tech">${techArray}</div>
                <a href="${p.link}" target="_blank" class="project-link-stylish">
                    ${btnText} <i class="fa-solid fa-arrow-left"></i>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });

    setupScrollReveal();
}

async function fetchProjectsFromSupabase() {
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
        cloudProjectsCache = data;
        renderCloudProjects();
    }
}

function setTextById(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) {
        el.innerText = value;
    }
}

function setHtmlById(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) {
        el.innerHTML = value;
    }
}

function changeLanguage(lang) {
    if (!translations[lang]) return;

    currentLang = lang;

    const htmlTag = document.getElementById('htmlTag');
    if (htmlTag) {
        if (lang === 'ar') {
            htmlTag.dir = 'rtl';
            htmlTag.lang = 'ar';
        } else {
            htmlTag.dir = 'ltr';
            htmlTag.lang = lang;
        }
    }

    const t = translations[lang];
    setTextById('navHome', t.navHome);
    setTextById('navAbout', t.navAbout);
    setTextById('navProjects', t.navProjects);
    setTextById('navServices', t.navServices);
    setTextById('navContact', t.navContact);

    setTextById('mainTitleAr', t.mainTitleAr);
    setTextById('mainTitleDe', t.mainTitleDe);
    setTextById('mainTitleEn', t.mainTitleEn);

    setTextById('subRole', t.subRole);
    setTextById('exploreBtn', t.exploreBtn);
    setTextById('projectsTitle', t.projectsTitle);

    setTextById('projTag', t.projTag);
    setTextById('projTitle', t.projTitle);
    setTextById('projDesc', t.projDesc);
    setHtmlById('viewProjBtn', t.viewProjBtn);

    setTextById('servicesTitle', t.servicesTitle);
    setTextById('serv1Title', t.serv1Title);
    setTextById('serv1Desc', t.serv1Desc);
    setTextById('serv2Title', t.serv2Title);
    setTextById('serv2Desc', t.serv2Desc);
    setTextById('serv3Title', t.serv3Title);
    setTextById('serv3Desc', t.serv3Desc);

    setTextById('contactTitle', t.contactTitle);
    setTextById('contactSub', t.contactSub);
    setTextById('footerText', t.footerText);

    renderCloudProjects();
    startTypeWriter(true);
}

function openModal(imgSrc, linkUrl = 'https://www.tiktok.com/@amirfayez15', fileName = 'qr-tiktok.png') {
    const modal = document.getElementById('qrModal');
    const modalImg = document.getElementById('modalImg');
    const downloadBtn = document.getElementById('downloadQrBtn');
    const feedback = document.getElementById('qrFeedbackMsg');

    if (!modal || !modalImg) return;

    activeQrSrc = imgSrc;
    activeQrLink = linkUrl;
    activeQrFilename = fileName;

    modal.style.display = 'flex';
    modalImg.src = imgSrc;

    if (downloadBtn) {
        downloadBtn.href = imgSrc;
        downloadBtn.setAttribute('download', fileName);
    }
    if (feedback) {
        feedback.innerText = '';
    }
}

function closeModal(event) {
    const modal = document.getElementById('qrModal');
    if (!modal) return;
    if (!event || event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
    }
}

async function copyQrImage() {
    const feedback = document.getElementById('qrFeedbackMsg');
    if (!activeQrSrc) return;

    try {
        const response = await fetch(activeQrSrc);
        const blob = await response.blob();
        const pngBlob = blob.type === 'image/png' ? blob : await convertBlobToPng(blob);

        if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': pngBlob })
            ]);
            if (feedback) {
                feedback.style.color = '#556B2F';
                feedback.innerText = 'تم نسخ صورة الباركود إلى الحافظة بنجاح!';
            }
        } else {
            throw new Error('Clipboard image API unsupported');
        }
    } catch (err) {
        if (feedback) {
            feedback.style.color = '#b22222';
            feedback.innerText = 'تعذر نسخ الصورة مباشرة من المتصفح، يمكنك استخدام زر "تنزيل الصورة".';
        }
    }
}

function convertBlobToPng(blob) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const url = URL.createObjectURL(blob);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || 300;
            canvas.height = img.naturalHeight || 300;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((png) => {
                URL.revokeObjectURL(url);
                if (png) resolve(png);
                else reject(new Error('Canvas conversion failed'));
            }, 'image/png');
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Image load failed'));
        };
        img.src = url;
    });
}

async function copyQrLink() {
    const feedback = document.getElementById('qrFeedbackMsg');
    try {
        await navigator.clipboard.writeText(activeQrLink);
        if (feedback) {
            feedback.style.color = '#556B2F';
            feedback.innerText = 'تم نسخ رابط الحساب بنجاح!';
        }
    } catch (err) {
        if (feedback) {
            feedback.style.color = '#b22222';
            feedback.innerText = 'تعذر نسخ الرابط تلقائياً.';
        }
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

window.addEventListener('DOMContentLoaded', () => {
    hideIntroCurtain();
    setupScrollReveal();
    updateScrollProgress();
    startTypeWriter(true);
    fetchProjectsFromSupabase();
});