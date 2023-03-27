
let api_key = "AIzaSyC18e1ls1rwd6Kq_TkBPThaZHu6XjMHwqM";
//let doc_id = "1O9HEs3D54LcF-qd8fYNw1al-NGUQMhkxbFeo7R_oku4";
let doc_id = new URL(document.googleSheet).pathname.split("/")[3];
let sheet_name = "Form Responses 2";

let project_data_url = `https://sheets.googleapis.com/v4/spreadsheets/${doc_id}/values/${sheet_name}?key=${api_key}`


//NOTE: the keys in this field map represent the columns of the Google Sheet. The values represent property names below.
const field_map = {
    "Timestamp": "timestamp",
    "Email Address": "email",
    "Select Project Discipline": "discipline",
    "Course / Club Title": "course",
    "Faculty Name": "faculty",
    "Presenter Name": "presenter",
    "Project Title": "title",
    "Brief Project Description": "desc",
    "Add the link to your video": "video_url"
}

class STEMExpoProject {

    constructor(timestamp, email, discipline, course, faculty, presenter, title, desc, video_url) {
        this.timestamp = timestamp;
        this.email = email;
        this.discipline = discipline;
        this.course = course;
        this.faculty = faculty;
        this.presenter = presenter;
        this.title = title;
        this.desc = desc;
        this.video_url = video_url;
    }


    getCardFromProject() {
        let card = document.createElement("expo-project");
        card.title = this.title;
        card.author = this.presenter;
        card.faculty = this.faculty;
        card.course = this.course;
        card.video = this.video_url;
        card.description = this.desc;

        return card;
    }


    /**
     * Returns a Promise< STEMExpoProjects[] > containing all projects listed in the
     * configured google sheet.
     */
    static getProjects() {

        return fetch(project_data_url)
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();

                }
            }).then((body) => {

                let projects_raw = body.values;
                let headers_as_arr = projects_raw.shift(); //the first row of the document are the headers.

                let headers = {};
                for (let i = 0; i < headers_as_arr.length; i++) {
                    let next_header = headers_as_arr[i];
                    headers[next_header] = i;
                }

                let projects_obj = [];

                for (let project_raw of projects_raw) {

                    let project = new STEMExpoProject();
                    for ( let key in Object.keys(headers) ) {
                        for ( let field in Object.keys(field_map)) {
                            if ( key.contains(field)) {
                                let idx = headers[key];
                                let prop = field_map[field];
                                project[prop] = project_raw[idx];
                            }//if the short name we have matches the long name from the google sheet
                        }//for each mapped field we know about
                    }//for each column of that project
                    projects_obj.push(project);

                }//for each project in the response body

                return projects_obj; //NOTE: this gets returned as a promise.
            });//then(json_parsed_body);

    }//getProjects()
}//STEMExpoProject class

export default STEMExpoProject;