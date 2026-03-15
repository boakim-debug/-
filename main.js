class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <style>
                h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--text-color); }
                p { font-size: 0.9rem; opacity: 0.6; }
            </style>
            <h3>${this.getAttribute('name')}</h3>
            <p>${this.getAttribute('description')}</p>
        `;
        shadow.appendChild(wrapper);
    }
}
customElements.define('project-card', ProjectCard);

// Custom Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const addHover = () => cursor.classList.add('hover');
const removeHover = () => cursor.classList.remove('hover');

const updateInteractiveListeners = () => {
    document.querySelectorAll('a, button, input, textarea, project-card, .logo').forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
    });
};
updateInteractiveListeners();

// Modal Logic
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalComments = document.getElementById('project-utterances');

document.querySelectorAll('project-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('name');
        const desc = card.getAttribute('description');
        const id = card.id;

        modalTitle.textContent = name;
        modalDesc.textContent = desc + " - This is where you can showcase more details about your urban design project, including images, maps, and research data.";
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Load project-specific comments
        modalComments.innerHTML = '';
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'boakim-debug/-');
        script.setAttribute('issue-term', `project-${id}`);
        script.setAttribute('theme', document.body.classList.contains('dark-mode') ? 'github-dark' : 'github-light');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        modalComments.appendChild(script);
        updateInteractiveListeners();
    });
});

document.querySelector('.modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'LIGHT' : 'DARK';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'LIGHT';
}

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));
