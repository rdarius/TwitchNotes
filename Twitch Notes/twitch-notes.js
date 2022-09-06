(function runTwitchNotes() {
    function save(filename, data) {
        const blob = new Blob([data], {type: 'text/json'});
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    const Notes = {
        inputData: {},
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
        removeUserFromSavedList: (username) => {
            let userList = Notes.getSavedUserList();
            userList = userList.filter(u => u !== username);
            if (userList.length) {
                localStorage.setItem(LS_UserList, JSON.stringify(userList));
            } else {
                localStorage.removeItem(LS_UserList);
            }
        },
        saveNote: (username, note) => {
            Notes.addUserToSavedList(username);
            localStorage.setItem(LS_Prefix + username, note);
        },
        deleteNote: (username) => {
            Notes.removeUserFromSavedList(username);
            localStorage.removeItem(LS_Prefix + username);
        },
        getNote: (username) => {
            return localStorage.getItem(LS_Prefix + username) || "";
        },
        exportNotes: () => {
            save('twitch-notes-' + (Date.now()) + '.json', JSON.stringify({
                users: Notes.getSavedUserList(),
                notes: Notes.getSavedUserList().map(user => {
                    return {user: user, note: Notes.getNote(user)};
                }),
                settings: {},
            }));
        },
        importNotesConflictResolve: (user, resultsContainer, container, blurredBackground) => {
            const diffBlurredBackground = createElement('div', null, 'twitch-notes-blurred-background');
            const diffContainer = createElement('div', '<strong>Select which note to keep for <em>' + user + '</em></strong><br /><em>You can modify notes to merge them and keep updated one</em><br /><br />', 'twitch-notes-center-floating-container');

            const inputContainer = createElement('div', null, null, {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'no-wrap',
                width: '100%',
            });

            const valueStyle = {
                minWidth: '320px',
                padding: '6px',
                border: '1px solid #FFFFFF19'
            };
            const valueAttr = {contentEditable: 'true'};

            const localValueContainer = createElement('div');
            const pLocal = createElement('p', '<strong>Locally saved note</strong>');
            localValueContainer.appendChild(pLocal);
            const localValue = createElement('div', Notes.getNote(user), null, valueStyle, valueAttr, 'local-value-container');
            const localValueSave = createElement('button', 'Save this', 'twitch-notes-settings-button');
            localValueSave.addEventListener('click', () => {
                const val = document.getElementById('local-value-container').innerHTML;
                Notes.inputData.notes = Notes.inputData.notes.map(n => n.user === user ? {
                    user: n.user,
                    note: val,
                    resolved: true
                } : n);
                diffBlurredBackground.remove();
                resultsContainer.remove();
                Notes.importNotesResult(container, blurredBackground);
            });
            localValueContainer.appendChild(localValue);
            localValueContainer.innerHTML += '<br />';
            localValueContainer.appendChild(localValueSave);

            const importedValueContainer = createElement('div');
            const iLocal = createElement('p', '<strong>Imported note</strong>');
            importedValueContainer.appendChild(iLocal);
            const importedValue = createElement('div', Notes.inputData.notes.filter(n => n.user === user)[0].note || '', null, valueStyle, valueAttr, 'import-value-container');
            const importedValueSave = createElement('button', 'Save this', 'twitch-notes-settings-button');
            importedValueSave.addEventListener('click', () => {
                const val = document.getElementById('import-value-container').innerHTML;
                Notes.inputData.notes = Notes.inputData.notes.map(n => n.user === user ? {
                    user: n.user,
                    note: val,
                    resolved: true
                } : n);
                diffBlurredBackground.remove();
                resultsContainer.remove();
                Notes.importNotesResult(container, blurredBackground);
            });

            importedValueContainer.appendChild(importedValue);
            importedValueContainer.innerHTML += '<br />';
            importedValueContainer.appendChild(importedValueSave);


            inputContainer.appendChild(localValueContainer);
            inputContainer.appendChild(importedValueContainer);

            diffContainer.appendChild(inputContainer);
            diffBlurredBackground.appendChild(diffContainer);
            document.body.appendChild(diffBlurredBackground);
        },
        importNotesResult: (container, blurredBackground) => {

            const willBeAdded = [];
            let willBeOverwritten = [];
            const noChanges = [];

            for (let user of Notes.inputData.users) {
                if (Notes.getNote(user)) {
                    if (Notes.inputData.notes.find(note => note.user === user).resolved || Notes.getNote(user) !== Notes.inputData.notes.find(note => note.user === user).note) {
                        willBeOverwritten.push(user);
                    } else {
                        noChanges.push(user);
                    }
                } else {
                    willBeAdded.push(user);
                }
            }

            const resultsContainer = createElement('div', null);

            if (willBeOverwritten.length) {
                const overwrittenContainer = createElement('div', '<strong>Note conflicts found for:</strong><br />', null, {
                    marginTop: '1rem',
                });
                for (let item of willBeOverwritten) {
                    const row = createElement('div', item + ' ', null, {
                        color: Notes.inputData.notes.find(note => note.user === item).resolved ? 'green' : 'red',
                    });
                    const resolve = createElement('a', Notes.inputData.notes.find(note => note.user === item).resolved ? '[update]' : '[resolve]', null, {
                        cursor: 'pointer',
                    });
                    resolve.addEventListener('click', () => {
                        Notes.importNotesConflictResolve(item, resultsContainer, container, blurredBackground);
                    })
                    row.appendChild(resolve);
                    overwrittenContainer.appendChild(row);
                }
                resultsContainer.appendChild(overwrittenContainer);
            }

            if (willBeAdded.length) {
                const addedContainer = createElement('div', '<strong>Note will be added for:</strong><br />' + willBeAdded.join('<br />'), null, {
                    marginTop: '1rem',
                    color: 'white'
                })
                resultsContainer.appendChild(addedContainer);
            }

            if (noChanges.length) {
                const noChangesContainer = createElement('div', '<strong>No changes for:</strong><br />' + noChanges.join('<br />'), null, {
                    marginTop: '1rem',
                    color: 'gray'
                })
                resultsContainer.appendChild(noChangesContainer);
            }

            const spacer = createElement('div', null, null, {height: '24px'});
            resultsContainer.appendChild(spacer);

            willBeOverwritten = willBeOverwritten.filter(x => !Notes.inputData.notes.find(n => n.user === x).resolved);

            const saveButton = createElement('button', 'Complete import', 'twitch-notes-settings-button',
                willBeOverwritten.length > 0 ? {background: 'gray'} : null,
                willBeOverwritten.length > 0 ? {disabled: 'true'} : null)

            resultsContainer.appendChild(saveButton)

            if (willBeOverwritten.length > 0) {
                const note = createElement('div', '<em>Import cannot be completed while there are unresolved conflicts</em>', null, {
                    color: 'gray',
                });
                resultsContainer.appendChild(note);
            } else {
                saveButton.addEventListener('click', () => {
                    for (let note of Notes.inputData.notes) {
                        Notes.saveNote(note.user, note.note);
                    }
                    blurredBackground.remove();
                    Notes.inputData = {};
                });
            }

            container.appendChild(resultsContainer);
        },
        importNotes: () => {
            const blurredBackground = createElement('div', null, 'twitch-notes-blurred-background');
            const container = createElement('div', '<strong>WARNING!</strong> <em>This action might override existing data!</em><br /><br />', 'twitch-notes-center-floating-container');
            const inputBlock = createElement('div', 'Select exported twitch notes file<br /><br />');
            const input = createElement('input', null, 'twitch-notes-file-input', null, {
                type: 'file',
                accept: '.json'
            });
            const settingsCloseButton = createElement('button', xButton, 'twitch-notes-settings-close-button', {
                position: 'absolute',
                top: '1rem',
                right: '1rem',
            });
            inputBlock.appendChild(input);
            settingsCloseButton.addEventListener('click', () => {
                blurredBackground.remove();
            });
            input.addEventListener('change', () => {
                let file = input.files[0];
                if (!file) {
                    return;
                }
                let reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    Notes.inputData = JSON.parse(evt.target.result.toString());
                    if (Notes.inputData) {
                        inputBlock.style.display = 'none';
                        Notes.importNotesResult(container, blurredBackground);
                    }
                }
                reader.onerror = function () {
                    console.error("error reading file");
                }
            });

            container.appendChild(settingsCloseButton);
            container.appendChild(inputBlock);
            blurredBackground.appendChild(container);
            document.body.appendChild(blurredBackground);
        },
        clearAllData: () => {
            const blurredBackground = createElement('div', null, 'twitch-notes-blurred-background');
            const container = createElement('div', '<strong>This action will delete all saved notes!</strong><br /><br /><em>Consider exporting notes before performing this action in case you will need to use notes again</em>', 'twitch-notes-center-floating-container');

            const spacer = createElement('div', null, null, {
                height: '24px'
            });
            const deleteAction = createElement('button', 'DELETE ALL NOTES', 'twitch-notes-settings-button', {
                background: 'red'
            });
            deleteAction.addEventListener('click', () => {
                const users = Notes.getSavedUserList();
                for(let user of users) {
                    Notes.deleteNote(user);
                }
                blurredBackground.remove();
            })
            const cancelAction = createElement('button', 'Cancel', 'twitch-notes-settings-button');
            cancelAction.addEventListener('click', () => {
                blurredBackground.remove();
            })

            container.appendChild(spacer);
            container.appendChild(deleteAction);
            container.appendChild(cancelAction);

            blurredBackground.appendChild(container);
            document.body.appendChild(blurredBackground);
        },
        openAllNotes: () => {
            console.log('TODO: Implement Open All Notes functionality');
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

    function createElement(tag, body, classes, styles, attributes, id) {
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

        element.setAttribute('id', id ? id : 'element-' + Math.floor((Math.random() * 10000000)))

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

        const closeButton = createElement('span', xButton, 'twitch-note-close-button')
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
                        height: '18px',
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

    function createChatSettingsLine(text) {
        const element = createElement('div', null, 'twitch-notes-settings-option-line');
        const button = createElement('button', null, 'twitch-notes-settings-option-line-button');
        const buttonContainer = createElement('div', null, 'twitch-notes-settings-option-line-button-container');
        const buttonContainerContent = createElement('div', text, 'twitch-notes-settings-option-line-button-container-content');
        buttonContainer.appendChild(buttonContainerContent);
        button.appendChild(buttonContainer);
        element.appendChild(button);

        return element;
    }

    function createChatSettingsSeparator() {
        return createElement('div', null, 'twitch-note-settings-separator');
    }

    function toggleSettings() {
        if (!settingsWindow) {
            const settingsContainer = createElement('div', null, 'twitch-notes-settings-container');
            const settingsBalloon = createElement('div', null, 'twitch-notes-settings-balloon');
            const settingsPopover = createElement('div', null, 'twitch-notes-settings-popover');

            // startOf: settings header
            const settingsHeader = createElement('div', null, 'twitch-notes-settings-header');
            const settingsHeaderLeftElement = createElement('div', null, 'twitch-notes-settings-header-left-element')
            settingsHeader.appendChild(settingsHeaderLeftElement);
            const settingsHeaderCenterElement = createElement('div', null, 'twitch-notes-settings-header-center-element')
            settingsHeader.appendChild(settingsHeaderCenterElement);
            const settingsHeaderCenterElementContent = createElement('p', 'Twitch Notes Settings', 'twitch-notes-settings-header-center-element-content')
            settingsHeaderCenterElement.appendChild(settingsHeaderCenterElementContent);
            const settingsHeaderRightElement = createElement('div', null, 'twitch-notes-settings-header-right-element')
            settingsHeader.appendChild(settingsHeaderRightElement);
            const settingsCloseButton = createElement('button', xButton, 'twitch-notes-settings-close-button');
            settingsHeaderRightElement.appendChild(settingsCloseButton);
            settingsPopover.appendChild(settingsHeader);
            // endOf: settings header

            settingsCloseButton.addEventListener('click', toggleSettings);


            // startOf: scrollable area
            const settingsScrollableArea = createElement('div', null, 'twitch-notes-settings-scrollable-area');
            const settingsContent = createElement('div', null, 'twitch-notes-settings-content');
            settingsScrollableArea.appendChild(settingsContent);

            const exportNotes = createChatSettingsLine('Export Notes');
            settingsContent.appendChild(exportNotes);
            const importNotes = createChatSettingsLine('Import Notes');
            settingsContent.appendChild(importNotes);
            const clearData = createChatSettingsLine('Clear Data');
            settingsContent.appendChild(clearData);
            settingsContent.appendChild(createChatSettingsSeparator());
            const openAllNotes = createChatSettingsLine('View All Notes');
            settingsContent.appendChild(openAllNotes);

            exportNotes.addEventListener('click', Notes.exportNotes);
            importNotes.addEventListener('click', Notes.importNotes);
            clearData.addEventListener('click', Notes.clearAllData);
            openAllNotes.addEventListener('click', Notes.openAllNotes);


            settingsPopover.appendChild(settingsScrollableArea);
            // endOf: scrollable area


            settingsBalloon.appendChild(settingsPopover);
            settingsContainer.appendChild(settingsBalloon);
            settingsWindow = settingsContainer;
            document.body.appendChild(settingsWindow);
            settingsWindowOpen = true;
            return;
        }

        if (settingsWindowOpen) {
            settingsWindow.style.display = 'none';
            settingsWindowOpen = false;
        } else {
            settingsWindow.style.display = 'block';
            settingsWindowOpen = true;
        }
        console.log('toggle settings');
    }

    const xButton = `<svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px" class="twitch-notes-x-button"><g><path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path></g></svg>`;
    let openContainers = {};
    let isMouseDown = false;
    let activeContainer = null;
    let settingsWindowOpen = false;
    let settingsWindow = null;

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
