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
                border: 1px solid var(--border-color, #ccc);
                padding: 1rem;
                border-radius: 8px;
                background-color: var(--section-bg, #fff);
                color: var(--text-color, #333);
                transition: background-color 0.3s, color 0.3s, border-color 0.3s;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(name);
        wrapper.appendChild(description);
    }
}

customElements.define('project-card', ProjectCard);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '라이트 모드';
}

// Utterances Comments Logic
const loadUtterances = () => {
    const container = document.getElementById('utterances-container');
    if (!container) return;

    const script = document.createElement('script');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'boakim-debug/-'); // Replace with your repository
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', '💬');
    script.setAttribute('theme', isDarkMode ? 'github-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.innerHTML = '';
    container.appendChild(script);
};

// Initial load
loadUtterances();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const isDark = body.classList.contains('dark-mode');
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '라이트 모드';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '다크 모드';
    }

    // Update Utterances theme
    const utterances = document.querySelector('.utterances-frame');
    if (utterances) {
        const theme = isDark ? 'github-dark' : 'github-light';
        const message = {
            type: 'set-theme',
            theme: theme
        };
        utterances.contentWindow.postMessage(message, 'https://utteranc.es');
    }
});
