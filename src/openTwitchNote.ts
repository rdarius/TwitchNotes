import NoteContainers from "./NoteContainers";
import Mouse from "./Mouse";
import NoteStorage from "./NoteStorage";
import { getCloseButtonSVG } from "./HTMLTemplates";
import {HTMLBuilderBlock} from "./types";
import HTMLBuilder from "./HTMLBuilder";

export default function openTwitchNote(username: string) {
    if (NoteContainers.containers[username]) return;
    let noteContent = NoteStorage.getNote(username);
    const container: HTMLBuilderBlock = {
        element: 'div',
        class: 'twitch-note-container',
        style: {
            left: Mouse.mousePosition.x + 'px',
            top: Mouse.mousePosition.y + 10 + 'px'
        },
        content: [
            {
                element: 'div',
                class: 'twitch-note-header',
                mouseDownEvent: () => {
                    NoteContainers.activeContainer = username;
                    Mouse.isMouseDown = true;
                },
                content: [
                    {
                        element: 'span',
                        class: 'twitch-note-close-button',
                        content: [getCloseButtonSVG()],
                        mouseClickEvent: () => NoteContainers.removeContainer(username),
                    },
                    {
                        element:  'span',
                        class: 'twitch-note-title',
                        content: [username],
                    }
                ]
            },
            {
                element: 'div',
                class: 'twitch-note-content',
                content: [NoteStorage.getNote(username)],
                attributes: {
                    contentEditable: 'true'
                },
                keyUpEvent: (newContent: string) => {
                    noteContent = newContent;
                }
            },
            {
                element: 'div',
                class: 'twitch-note-save-button',
                content: ['SAVE'],
                mouseClickEvent: () => {
                    NoteStorage.saveNote(username, noteContent);
                    NoteContainers.removeContainer(username);
                }
            }
        ]
    };

    const containerElement = new HTMLBuilder(container);

    document.body.appendChild(containerElement.getElement());
    NoteContainers.addContainer(username, containerElement);
}