fetch("https://mobetz.github.io/stemexpo-gsite-cards/ExpoGallery.html")
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
        }

        static get observedAttributes() {
            return [];
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }

    }


    customElements.define('expo-gallery', ExpoGallery);
}