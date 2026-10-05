class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const name = this.getAttribute('name');
        const description = this.getAttribute('description');
        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                h3 { 
                    font-family: 'Inter', sans-serif; 
                    font-weight: 700;
                    font-size: 1.5rem; 
                    margin-bottom: 0.5rem; 
                    color: var(--text-color); 
                }
                p { 
                    font-size: 1rem; 
                    opacity: 0.6; 
                    line-height: 1.5; 
                }
            </style>
            <h3>${name}</h3>
            <p>${description}</p>
        `;
    }
}
if (!customElements.get('project-card')) {
    customElements.define('project-card', ProjectCard);
}

const cursor = document.getElementById('custom-cursor');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalVisuals = document.getElementById('modal-visuals');
const modalComments = document.getElementById('project-utterances');
const closeModalBtn = document.querySelector('.modal-close');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Custom Cursor Logic
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const addHover = () => cursor.classList.add('hover');
const removeHover = () => cursor.classList.remove('hover');

const updateInteractiveListeners = () => {
    document.querySelectorAll('a, button, input, textarea, project-card, .logo, .modal-close').forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
    });
};

// Modal Logic
document.querySelectorAll('project-card').forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.getAttribute('name');
        modalDesc.textContent = card.getAttribute('description');
        
        modalVisuals.innerHTML = '';
        const pdf = card.getAttribute('data-pdf');
        if (pdf && pdf !=='#') {
             modalVisuals.innerHTML += `<a href="${pdf}" target="_blank" class="pdf-link">View PDF Report</a>`;
        }

        const png = card.getAttribute('data-png');
        if (png) {
            png.split(',').forEach(p => {
                modalVisuals.innerHTML += `<img src="${p.trim()}" alt="${card.getAttribute('name')}" class="modal-img">`;
            });
        }

        // 1. data-details 속성 읽어오기
        const detailsText = card.getAttribute('data-details') || card.getAttribute('description') || '';

        // 2. PROJECT DETAILS 영역 출력
        const commentsTarget = document.getElementById('project-utterances') || modalComments;
        if (commentsTarget) {
            commentsTarget.innerHTML = `
                <div class="project-details" style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; text-align: left;">
                    <h3 style="color: var(--highlight-color); font-size: 0.85rem; font-weight: 700; letter-spacing: 1px; margin-bottom: 0.8rem; text-transform: uppercase;">PROJECT DETAILS</h3>
                    <div style="line-height: 1.7; color: #333; font-size: 0.95rem;">${detailsText}</div>
                </div>
            `;
        }
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    body.style.overflow = 'auto';
});

// Theme Toggle Logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'LIGHT';
} else {
    themeToggle.textContent = 'DARK';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'LIGHT' : 'DARK';

    const commentFrame = document.querySelector('.utterances-frame');
    if (commentFrame) {
        commentFrame.contentWindow.postMessage({ type: 'set-theme', theme: isDark ? 'github-dark' : 'github-light' }, 'https://utteranc.es');
    }
});

// Initial call
updateInteractiveListeners();
