import { ELEMENT_ButtonContainer } from "./const";
import toggleSettingsList from "./toggleSettingsList";
import openTwitchNote from "./openTwitchNote";
import HTMLBuilder from "./HTMLBuilder";
import TwitchButton from "./HTMLElements/TwitchButton";
import TwitchNotesWindow from "./HTMLElements/TwitchNotesWindow";

export default class TwitchNote {

    observer?: MutationObserver;
    chatContainerNode?: Element;

    init(chatContainerNode: Element) {
        this.chatContainerNode = chatContainerNode;
        this.startObserver(chatContainerNode);
        // add Notes management button
        this.addNotesButton();
        setTimeout(() => {
            this.addUserNoteBadges();
        }, 1000);
    }

    startObserver(targetNode: Element) {
        // discard old observer
        if (this.observer) {
            this.observer.disconnect();
        }

        const observerCallback = (mutationList: MutationRecord[]) => {
            // preventing multiple chat updates at once in case update process
            // is taking longer or chat is super active
            if (!changeInProgress) {
                for (const mutation of mutationList) {
                    if (mutation.type === "childList") {
                        changeInProgress = true;
                        // add badges next to users
                        this.addUserNoteBadges();
                        changeInProgress = false;
                    }
                }
            }
        };

        let changeInProgress = false;
        const observerConfig = {attributes: true, childList: true, subtree: true};
        this.observer = new MutationObserver(observerCallback);
        this.observer.observe(targetNode, observerConfig);
    }

    addNotesButton() {
        const buttonContainer = document.querySelector(`.${ELEMENT_ButtonContainer}`);
        if (!buttonContainer) {
            setTimeout(() => this.addNotesButton(), 100);
            return;
        }

        const button = new TwitchButton('Notes', 'outline');
        button.onClick(TwitchNotesWindow.toggle);

        if (buttonContainer.lastChild) {
            buttonContainer.lastChild.insertBefore(
                button.element,
                buttonContainer.lastChild.lastChild
            );
        } else {
            buttonContainer.appendChild(button.element);
        }
    }

    addUserNoteBadges() {
        let nodes = document.getElementsByClassName("chat-line__message");
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes.item(i);
            if (!node) continue;
            const n = node.querySelector(".chat-author__display-name");
            if (!n) continue;
            const usernameContainer = node.querySelector(".chat-line__username-container");
            if (!usernameContainer) continue;
            const username = n.getAttribute('data-a-user');
            if (username) {
                let noteButton = usernameContainer.querySelector(".twitch-note");
                if (!noteButton) {
                    const twitchNote = new HTMLBuilder({
                        element: 'span',
                        class: 'twitch-note',
                        style: {
                            cursor: 'pointer',
                        },
                        mouseClickEvent: () => openTwitchNote(username),
                        content: [
                            {
                                element: 'img',
                                style: {
                                    height: '18px',
                                    paddingRight: '4px'
                                },
                                attributes: {
                                    src: 'https://cdn.rdarius.lt/icons/32-id-card.png'
                                }
                            }
                        ]
                    });

                    usernameContainer.insertBefore(
                        twitchNote.getElement(),
                        usernameContainer.firstChild
                    );
                }
            }
        }
    }
}