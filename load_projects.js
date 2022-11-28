import STEMExpoProject from "https://mobetz.github.io/stemexpo-gsite-cards/STEMExpoProject.mjs";


const department_aliases = {
    "Computer Science": ["CS"],
    "Engineering": ["Engineering"],
    "Math & Science": ["Biology", "Math", "Science"]
}


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("department_title").innerText = document.department;


   let projects_promise = STEMExpoProject.getProjects();

   let gallery = document.getElementById("gallery");

   projects_promise.then((projects) => {
      projects
          .filter((project) => document.department.toLowerCase() === project.discipline.toLowerCase() || department_aliases[document.department].indexOf(project.discipline) !== -1 )
          .map((project) => project.getCardFromProject())
          .forEach((card) => {

            gallery.appendChild(card);

            if ( gallery.vertical === "true") {
                card.vertical = true;
            }
          });
   });
});