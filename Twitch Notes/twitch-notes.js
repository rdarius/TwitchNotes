(function runTwitchNotes() {

    const Notes = {
        getSavedUserList: () => {
            return JSON.parse(localStorage.getItem(LS_UserList) || "[]");
        },
        addUserToSavedList: (username) => {
            let userList = Notes.getSavedUserList();

            if (!userList.includes(username)) {
                userList.push(username);
                localStorage.setItem(LS_UserList, JSON.stringify(userList));
            }
        },
        saveNote: (username, note) => {
            Notes.addUserToSavedList(username);
            localStorage.setItem(LS_Prefix + username, note);
        },
        getNote: (username) => {
            return localStorage.getItem(LS_Prefix + username) || "";
        }
    }

    const Mouse = {
        mousePosition: {x: 0, y: 0},
        lastMousePosition: {x: 0, y: 0},
        handleMouseMove: (event) => {
            if (isMouseDown) {
                if (activeContainer) {
                    const dx = Mouse.mousePosition.x - Mouse.lastMousePosition.x;
                    const dy = Mouse.mousePosition.y - Mouse.lastMousePosition.y;
                    openContainers[activeContainer].style.top =
                        parseInt(openContainers[activeContainer].style.top) + dy + "px";
                    openContainers[activeContainer].style.left =
                        parseInt(openContainers[activeContainer].style.left) + dx + "px";
                }
            }
            Mouse.updateMousePosition(event.clientX, event.clientY);
        },
        handleMouseUp: () => {
            activeContainer = null;
            isMouseDown = false;
        },
        updateMousePosition: (x, y) => {
            Mouse.lastMousePosition = {...Mouse.mousePosition};
            Mouse.mousePosition = {x, y};
        }
    }

    function createElement(tag, body, classes, styles, attributes) {
        const element = document.createElement(tag);

        if (body) {
            element.innerHTML = body;
        }

        if (classes) {
            if (typeof classes === 'object') {
                for (let className of classes) {
                    element.classList.add((className));
                }
            } else {
                element.classList.add(classes);
            }
        }

        if (styles) {
            if (typeof styles === 'object') {
                for (let style in styles) {
                    element.style[style] = styles[style];
                }
            }
        }

        if (attributes) {
            if (typeof attributes === 'object') {
                for (let attribute in attributes) {
                    element.setAttribute(attribute, attributes[attribute]);
                }
            }
        }

        return element;
    }

    function createSettingsButton(buttonContainer) {

        const c1 = createElement('div', null, null, {marginLeft: "0.5rem !important"});
        const c2 = createElement('div', null, null, {display: "inline-flex !important"});
        const settingsButton = createElement('button', 'Notes', 'twitch-notes-settings-button');

        settingsButton.addEventListener("click", toggleSettings);

        c2.appendChild(settingsButton);
        c1.appendChild(c2);

        buttonContainer.lastChild.insertBefore(
            c1,
            buttonContainer.lastChild.lastChild
        );
    }

    function removeContainer(username) {
        if (!openContainers[username]) return;
        openContainers[username].remove();
        delete openContainers[username];
    }

    function addContainer(username, container) {
        if (openContainers[username]) return;
        openContainers[username] = container;
        document.body.appendChild(container);
    }

    function openTwitchNote(username) {

        const container = createElement('div', null, 'twitch-note-container', {
            left: Mouse.mousePosition.x + 'px',
            top: Mouse.mousePosition.y + 10 + 'px'
        });

        const header = createElement('div', null, 'twitch-note-header');
        header.addEventListener("mousedown", function close() {
            activeContainer = username;
            isMouseDown = true;
        });

        const closeButton = createElement('span', "X", 'twitch-note-close-button')
        closeButton.addEventListener("click", function close() {
            removeContainer(username);
        });

        const title = createElement('span', username, 'twitch-note-title');
        const content = createElement('div', Notes.getNote(username), 'twitch-note-content', [], {
            contentEditable: 'true'
        });

        const saveButton = createElement('div', 'SAVE', 'twitch-note-save-button')
        saveButton.addEventListener("click", function () {
            Notes.saveNote(username, content.innerHTML);
            removeContainer(username);
        });

        header.appendChild(closeButton);
        header.appendChild(title);
        container.appendChild(header);
        container.appendChild(content);
        container.appendChild(saveButton);

        addContainer(username, container);
    }

    function addNoteBadges() {
        let nodes = document.getElementsByClassName("chat-line__message");
        let users = [];
        for (let node of nodes) {
            const n = node.querySelector(".chat-author__display-name");
            if (!n) continue;
            const usernameContainer = node.querySelector(
                ".chat-line__username-container"
            );

            const username = n.attributes["data-a-user"].value;
            if (username) {
                let noteButton = usernameContainer.querySelector(".twitch-note");
                if (!noteButton) {

                    const twitchNote = createElement('span', null, 'twitch-note', {
                        cursor: 'pointer',
                    })
                    twitchNote.addEventListener("click", () => {
                        openTwitchNote(username);
                    });

                    const img = createElement('img', null, null, {
                        height:  '18px',
                        paddingRight: '4px'
                    }, {
                        src: "https://cdn.rdarius.lt/icons/32-id-card.png"
                    })

                    twitchNote.appendChild(img);

                    usernameContainer.insertBefore(
                        twitchNote,
                        usernameContainer.firstChild
                    );
                }
                if (!users[username]) {
                    users[username] = 0;
                }
                users[username]++;
            }
        }
    }

    function toggleSettings() {
        console.log('toggle settings');
    }

    let openContainers = {};
    let isMouseDown = false;
    let activeContainer = null;
    // let settingsWindowOpen = false;

    let LS_UserList = "twitch-note-all-users-list";
    let LS_Prefix = "twitch-note-";

    document.addEventListener("mousemove", Mouse.handleMouseMove);
    document.addEventListener("mouseup", Mouse.handleMouseUp);

    let giveUpAt = Date.now() + 20000;

    let changeInProgress = false;

    let targetNode;
    let buttonContainer;

    do {
        targetNode = document.getElementsByClassName(
            "chat-scrollable-area__message-container"
        )[0];
    } while (!targetNode || giveUpAt < Date.now());

    do {
        buttonContainer = document.getElementsByClassName(
            "chat-input__buttons-container"
        )[0];
    } while (!buttonContainer || giveUpAt < Date.now());

    createSettingsButton(buttonContainer);

    // Options for the observer (which mutations to observe)
    const config = {attributes: true, childList: true, subtree: true};

    // Callback function to execute when mutations are observed
    const callback = (mutationList) => {
        if (!changeInProgress) {
            for (const mutation of mutationList) {
                if (mutation.type === "childList") {
                    changeInProgress = true;
                    addNoteBadges();
                    changeInProgress = false;
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();
