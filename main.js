
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
                border: 1px solid #ccc;
                padding: 1rem;
                border-radius: 8px;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(name);
        wrapper.appendChild(description);
    }
}

customElements.define('project-card', ProjectCard);
