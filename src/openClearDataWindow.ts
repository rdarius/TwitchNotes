import NoteStorage from "./NoteStorage";
import HTMLBuilder from "./HTMLBuilder";
import TwitchNotesWindow from "./HTMLElements/TwitchNotesWindow";

export default function openClearDataWindow() {
    const blurredBackground = new HTMLBuilder({
        element: 'div',
        class: 'twitch-notes-blurred-background',
        content: [{
            element: 'div',
            class: 'twitch-notes-center-floating-container',
            style: {
                padding: '1rem',
            },
            content: [
                '<strong>This action will delete all saved notes!</strong><br /><br /><em>Consider exporting notes before performing this action in case you will need to use notes again</em>',
                {
                    element: 'div',
                    style: {
                        height: '24px',
                    }
                },
                {
                    element: 'button',
                    class: 'twitch-notes_button',
                    content: ['DELETE ALL NOTES'],
                    style: {
                        background: 'red'
                    },
                    mouseClickEvent: () => {
                        NoteStorage.clearData();
                        blurredBackground.remove();
                        TwitchNotesWindow.update();
                    }
                },
                {
                    element: 'button',
                    class: 'twitch-notes_button',
                    content: ['Cancel'],
                    mouseClickEvent: () => {
                        blurredBackground.remove();
                    }
                }
            ]
        }]
    });
    document.body.appendChild(blurredBackground.getElement());
}