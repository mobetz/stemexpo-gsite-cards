
let html_fragment = await fetch(import.meta.resolve("./ExpoGallery.html")).then(data => data.text());
let stylerules = await fetch(import.meta.resolve("./ExpoGallery.css")).then(data => data.text());

let template_container = document.createElement("template");
template_container.innerHTML = html_fragment;

let stylesheet = await new CSSStyleSheet().replace(stylerules);

    class ExpoGallery extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.adoptedStyleSheets = [stylesheet];
            this.shadowRoot.appendChild(template_container.content.cloneNode(true));
            this._vertical = false;
        }

        static get observedAttributes() {
            return ['vertical'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'vertical') {
                let child_projects = document.getElementById("gallery").children;
                for ( let project of child_projects ) {
                    project.vertical = newValue;
                }
            }
        }

        set vertical(newValue) {
            this.setAttribute('vertical', newValue);
        }

        get vertical() {
            return this.getAttribute('vertical')
        }

    }


    customElements.define('expo-gallery', ExpoGallery);
