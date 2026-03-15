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
                background: var(--item-bg, #f7fcfb);
                border: 1px solid var(--border-color, #e2e8f0);
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 1rem;
                cursor: none;
            }
            h3 { color: var(--accent-mint-dark, #319795); margin: 0 0 0.5rem 0; }
            p { margin: 0; font-size: 0.95rem; opacity: 0.8; }
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

document.querySelectorAll('a, button, input, textarea, project-card').forEach(el => {
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

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'LIGHT';
}

// Load Utterances
const loadUtterances = () => {
    const container = document.getElementById('utterances-container');
    if (!container) return;
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'boakim-debug/-');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', document.body.classList.contains('dark-mode') ? 'github-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
};
loadUtterances();
