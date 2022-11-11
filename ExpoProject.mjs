fetch("https://mobetz.github.io/stemexpo-gsite-cards/ExpoProject.html")
//fetch("ExpoProject.html")
    .then((resp_wrapper) => {
        return resp_wrapper.text();
    }).then((ExpoProjectHTML) => {
        let template_container = document.createElement("template");
        template_container.innerHTML = ExpoProjectHTML;
        createComponent(template_container)
    })


function createComponent(template) {
    class ExpoProject extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        static get observedAttributes() {
            return ['title', 'author', 'faculty', 'description', 'course', 'video', 'vertical'];
        }

        get title() {
            return this.getAttribute('title');
        }

        set title(value) {
            this.setAttribute('title', value);
        }


        get author() {
            return this.getAttribute('author');
        }

        set author(value) {
            this.setAttribute('author', value);
        }


        get faculty() {
            return this.getAttribute('faculty');
        }

        set faculty(value) {
            this.setAttribute('faculty', value);
        }


        get description() {
            return this.getAttribute('description');
        }

        set description(value) {
            this.setAttribute('description', value);
        }

        get course() {
            return this.getAttribute('course');
        }

        set course(value) {
            this.setAttribute('course', value);
        }

        get video() {
            return this.getAttribute('video');
        }

        set video(value) {
            this.setAttribute('video', value);
        }

        get vertical() {
            this.getAttribute('vertical');
        }

        set vertical(value) {
            this.setAttribute('vertical', value);
        }


        attributeChangedCallback(name, oldValue, newValue) {
            if ( name === "title" ) {
                this.shadowRoot.querySelector("#project_title").innerText = newValue;
            } else if (name === "author" ) {
                this.shadowRoot.querySelector("#author").innerText = newValue;
            } else if ( name === "faculty" ) {
                this.shadowRoot.querySelector("#faculty").innerText = newValue;
            }else if ( name === "description" ) {
                this.shadowRoot.querySelector("#description").innerText = newValue;
            }else if ( name === "course" ) {
                this.shadowRoot.querySelector("#project_course").innerText = newValue;
            }else if ( name === "video" ) {
                let good_url =  this.extract_video_id_from_link(newValue);
                if ( newValue !== good_url ) {
                    this.video = good_url;
                } else {
                    this.shadowRoot.querySelector("#video_frame").src = "https://www.youtube.com/embed/" + newValue;
                    this.loadComments();
                }
            }
        }


        extract_video_id_from_link(url) {
            try {
                let url_obj = new URL(url);

                if (url_obj.host.includes("youtube.com") && url_obj.searchParams.has("v")) {
                    return url_obj.searchParams.get("v");
                } else if (url_obj.host.includes("youtu.be")) {
                    return url_obj.pathname.substr(1);
                }
            } catch {}
            return url;
        }


        loadComments() {
            let conversation = this.shadowRoot.getElementById("comment_container");
            conversation.innerHTML = ""; //clear any previously loaded comments
            let comments_found = false;

            let comment_api = new URL('https://youtube.googleapis.com/youtube/v3/commentThreads');
            comment_api.searchParams.set('part', 'snippet,replies');
            comment_api.searchParams.set('videoId', this.video)
            comment_api.searchParams.set('key', 'AIzaSyC18e1ls1rwd6Kq_TkBPThaZHu6XjMHwqM' )
            fetch(comment_api,
                {
                    method: "GET"
                }).then((resp) => {
                if ( !resp.ok) {
                    console.warn("Failed to read YouTube comments for: " + this.video + ". Response " + resp.status + ": " + resp.statusText)
                }
                return resp.json()

            }).then((resp_body) => {
                let teaser = this.shadowRoot.getElementById("convo_teaser");

                if ( resp_body.error ) {
                    if (resp_body.error.errors[0].reason === "commentsDisabled") {
                        teaser.innerText = "The project author has disabled comments."
                    }
                    else if ( resp_body.error.errors[0].reason === "videoNotFound") {
                        teaser.innerText = "The project video has been removed by the author."
                    }

                } else {
                    comments_found = false;

                    for (let comment of resp_body.items) {
                        comments_found = true;
                        let comment_div = document.createElement("expo-comment")
                        comment_div.fromYoutubeComment(comment);
                        conversation.appendChild(comment_div);
                    }

                    if (comments_found) {
                        teaser.innerHTML = `See discussion on this project:`;

                        let invitation = this.shadowRoot.getElementById("convo_invitation");
                        invitation.innerHTML = `Join this conversation <a href="https://youtu.be/${this.video}">on YouTube</a>!`;
                    } else {
                        teaser.innerHTML = `Be the first to comment <a href="https://youtu.be/${this.video}">on YouTube</a>!`;

                        let invitation = this.shadowRoot.getElementById("convo_invitation");
                        invitation.innerHTML = ``;

                    }
                }//else if the response was successful
            })
        }



    }


    customElements.define('expo-project', ExpoProject);

}