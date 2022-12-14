fetch("https://mobetz.github.io/stemexpo-gsite-cards/ExpoComment.html")
    		.then((resp_wrapper) => {
    			return resp_wrapper.text();
    		}).then((ExpoCommentHTML) => {
                    let template_container = document.createElement("template");
                    template_container.innerHTML = ExpoCommentHTML;
					createComponent(template_container)
    		})

function createComponent(ExpoCommentTemplate) {
    class ExpoComment extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(ExpoCommentTemplate.content.cloneNode(true));
        }

        static get observedAttributes() {
            return ['message', 'author', 'avatar'];
        }

        get avatar() {
            return this.getAttribute('avatar');
        }

        set avatar(value) {
            this.setAttribute('avatar', value);
        }


        get author() {
            return this.getAttribute('author');
        }

        set author(value) {
            this.setAttribute('author', value);
        }


        get message() {
            return this.getAttribute('message');
        }

        set message(value) {
            this.setAttribute('message', value);
        }




        attributeChangedCallback(name, oldValue, newValue) {
            if ( name === "message" ) {
                this.shadowRoot.querySelector(".message-text").innerText = newValue;
            } else if (name === "author" ) {
                this.shadowRoot.querySelector(".comment-author").innerText = newValue;
            } else if ( name === "avatar" ) {
                this.shadowRoot.querySelector(".pfp").src = newValue;
            }
        }


        fromYoutubeComment(comment_obj) {
            let data_container = comment_obj.snippet;
            if (data_container.topLevelComment) {
                data_container = data_container.topLevelComment.snippet;
            }

            let message_text = data_container.textDisplay;
            let author = data_container.authorDisplayName;
            let author_img = data_container.authorProfileImageUrl;


            this.avatar = author_img;
            this.message = new DOMParser()
                .parseFromString(message_text, 'text/html')
                .querySelector('html').textContent;
            this.author = author;

            if (comment_obj.replies) {
                let replies = this.shadowRoot.querySelector(".replies");
                for (let reply_obj of comment_obj.replies.comments) {
                    let reply = document.createElement("expo-comment");
                    reply.fromYoutubeComment(reply_obj);
                    replies.appendChild(reply);
                }
            }

        }


    }


    customElements.define('expo-comment', ExpoComment);
}