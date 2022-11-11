import STEMExpoProject from "https://mobetz.github.io/stemexpo-gsite-cards/STEMExpoProject.mjs";


const department_names = {
    "Computer Science": ["CS"],
    "Engineering": ["Engineering"],
    "Math & Science": ["Biology", "Math"]
}


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("department_title").innerText = document.department;


   let projects_promise = STEMExpoProject.getProjects();

   let gallery = document.getElementById("gallery");

   projects_promise.then((projects) => {
      projects
          .filter((project) => department_names[document.department].indexOf(project.discipline) !== -1 )
          .map((project) => project.getCardFromProject())
          .forEach((card) => {

            gallery.appendChild(card);

            if ( gallery.vertical === "true") {
                card.vertical = true;
            }
          });
   });
});