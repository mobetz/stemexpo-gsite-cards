import STEMExpoProject from "https://mobetz.github.io/stemexpo-gsite-cards/STEMExpoProject.mjs";


document.addEventListener("DOMContentLoaded", () => {
   let projects_promise = STEMExpoProject.getProjects();

   let gallery = document.getElementById("gallery");

   projects_promise.then((projects) => {
      projects
          .filter((project) => project.discipline === "Biology" )
          .map((project) => project.getCardFromProject())
          .forEach((card) => {

            gallery.appendChild(card);
          });
   });
});