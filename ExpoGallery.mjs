fetch("https://mobetz.github.io/stemexpo-gsite-cards/ExpoGallery.html")
//fetch("ExpoGallery.html")
    .then((resp_wrapper) => {
        return resp_wrapper.text();
    }).then((ExpoGalleryHTML) => {
    let template_container = document.createElement("template");
    template_container.innerHTML = ExpoGalleryHTML;
    createComponent(template_container)
})

function createComponent(template) {
    class ExpoGallery extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
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
}