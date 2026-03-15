class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'project-card');
        const name = document.createElement('h3');
        name.textContent = this.getAttribute('name');
        const description = document.createElement('p');
        description.textContent = this.getAttribute('description');
        const style = document.createElement('style');
        style.textContent = `
            .project-card {
                padding: 4rem 0;
                border-bottom: 1px solid var(--border-color, #e2e8f0);
                transition: transform 0.4s ease;
                cursor: none;
            }
            .project-card:hover {
                transform: translateX(20px);
            }
            h3 { font-size: 2.5rem; margin: 0 0 1rem 0; font-weight: 800; letter-spacing: -1px; color: var(--text-color); }
            p { font-size: 1.1rem; opacity: 0.6; max-width: 600px; }
        `;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(name);
        wrapper.appendChild(description);
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

document.querySelectorAll('a, button, input, textarea, project-card, .logo').forEach(el => {
    el.addEventListener('mouseenter', addHover);
    el.addEventListener('mouseleave', removeHover);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'LIGHT' : 'DARK';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const utterances = document.querySelector('.utterances-frame');
    if (utterances) {
        const theme = isDark ? 'github-dark' : 'github-light';
        utterances.contentWindow.postMessage({ type: 'set-theme', theme }, 'https://utteranc.es');
    }
});

// Scroll Reveal Observer
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Utterances
const loadUtterances = () => {
    const container = document.getElementById('utterances-container');
    if (!container) return;
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'boakim-debug/-');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', localStorage.getItem('theme') === 'dark' ? 'github-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
};
loadUtterances();
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'LIGHT';
}
