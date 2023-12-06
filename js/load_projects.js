import STEMExpoProject from "./STEMExpoProject.mjs";


const department_aliases = {
    "Computer Science": ["CS"],
    "Engineering": ["Engineering"],
    "Math & Science": ["Biology", "Math", "Science"]
}


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("department_title").innerText = document.department;


   let projects_promise = STEMExpoProject.getProjects();

   let gallery = document.getElementById("gallery");

   let is_in_department = (project) => document.department.toLowerCase() === project.discipline.toLowerCase();
   let is_department_nickname = (project) => department_aliases[document.department].indexOf(project.discipline) !== -1;
   let valid_department = (project) => is_in_department(project) || is_department_nickname(project)

   let online_project = (project) => valid_department(project) && project.video_url.length > 0; //only show projects "registered for online" by providing a URL

   projects_promise.then((projects) => {
      projects
          .filter(online_project)
          .map((project) => project.getCardFromProject())
          .forEach((card) => {

            gallery.appendChild(card);

            if ( gallery.vertical === "true") {
                card.vertical = true;
            }
          });
   });
});