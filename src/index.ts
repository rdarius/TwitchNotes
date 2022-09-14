import './styles/main.scss';
import TwitchNote from "./TwitchNote";
import Mouse from "./Mouse";

const ChatContainerClass = 'chat-scrollable-area__message-container';
const twitchNote = new TwitchNote();
let chatExists = false;
let lastUrl = '';

function init() {

    // check for chat container existence
    setInterval(() => {
        // check for URL changes (going through different channels)
        const currentUrl = window.location.href;
        if (lastUrl !== currentUrl) {
            lastUrl = currentUrl;
            chatExists = false;
            return;
        }

        // check for chat container appearing in DOM
        const targetNode = document.querySelector(`.${ChatContainerClass}`);
        if (targetNode) {
            if (!chatExists) {
                // chat container appeared
                twitchNote.init(targetNode);
                Mouse.setupListeners();
            }
            chatExists = true;
        } else {
            chatExists = false;
        }
    }, 1000);
}

init();