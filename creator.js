
document.addEventListener("DOMContentLoaded", () => {
    let preview = document.getElementById("preview-project");
    let original_preview = preview.cloneNode(true).outerHTML;

    let inputs = document.querySelectorAll("#project_form input");
    for ( let input of inputs ) {
        let field = input.id;
        input.addEventListener("keyup", (e) => {
            preview[field] = input.value;
        })
    }

    let textarea = document.querySelector("#description");
    textarea.addEventListener("keyup", (e) => {
        preview.description = textarea.value;
    })


    let copy_button = document.getElementById("clipboard");
    copy_button.addEventListener("click", () => {
        navigator.clipboard.writeText(preview.outerHTML)
            .then((resp) =>{
                copy_button.classList.add("success");
                setTimeout(() => {copy_button.classList.remove("success")}, 20);
            })
    })

    let code = document.getElementById("full-code");
    let gallery = document.getElementById("gallery")
    let save_button = document.getElementById("add_to_page");
    save_button.addEventListener("click", () => {
        let copy_to_add_to_page = preview.cloneNode(true);
        gallery.appendChild(copy_to_add_to_page);
        gallery.appendChild(document.createTextNode("\n"));
        for ( let input of inputs ) {
            input.value = "";
        }
        textarea.innerText = "";

        let boilerplate = `
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Oswald%3A400%2C600%2C700%7COpen%20Sans%3A400%2C600%2C700&display=swap" />

    <script  type="module" src="https://mobetz.github.io/stemexpo-gsite-cards/ExpoComment.mjs"></script>
    <script  type="module" src="https://mobetz.github.io/stemexpo-gsite-cards/ExpoProject.mjs"></script>
    <script  type="module" src="https://mobetz.github.io/stemexpo-gsite-cards/ExpoGallery.mjs"></script>
    `
        code.value = boilerplate + "\n" + gallery.outerHTML;

    })
})