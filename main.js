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
                background-color: var(--section-bg, #ffffff);
                border: 1px solid var(--border-color, #e2e8f0);
                padding: 2.5rem;
                border-radius: 20px;
                transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                cursor: pointer;
                box-shadow: var(--card-shadow);
            }
            .project-card:hover {
                transform: translateY(-10px);
                border-color: var(--accent-mint, #4fd1c5);
            }
            h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
                color: var(--accent-mint-dark, #319795);
            }
            p {
                margin: 0;
                font-size: 1rem;
                color: var(--text-color, #1a1a1a);
                opacity: 0.8;
                line-height: 1.6;
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

const updateThemeUI = (isDark) => {
    themeToggle.textContent = isDark ? 'LIGHT' : 'DARK';
    
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
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeUI(true);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
});

// Utterances Comments Logic
const loadUtterances = () => {
    const container = document.getElementById('utterances-container');
    if (!container) return;

    container.innerHTML = '<p style="text-align:center; opacity:0.5; padding: 2rem;">Loading comments...</p>';

    const script = document.createElement('script');
    const isDarkMode = body.classList.contains('dark-mode');
    
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'boakim-debug/-'); 
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', '💬');
    script.setAttribute('theme', isDarkMode ? 'github-dark' : 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    script.onload = () => {
        const placeholder = container.querySelector('p');
        if (placeholder) placeholder.remove();
    };

    container.appendChild(script);
};

loadUtterances();

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

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
// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Smooth movement using requestAnimationFrame or simple direct update
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, input, textarea, project-card, .logo');

interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Smooth Scroll (Updated to include new interactive elements)
document.querySelectorAll('nav a, .logo').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
...
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
