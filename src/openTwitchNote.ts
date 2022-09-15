import NoteContainers from "./NoteContainers";
import {CustomDivElement, CustomSpanElement} from "./CustomHTMLElement";
import Mouse from "./Mouse";
import NoteStorage from "./NoteStorage";
import {getCloseButtonSVG} from "./HTMLTemplates";

export default function openTwitchNote(username: string) {
    if (NoteContainers.containers[username]) return;
    const container = new CustomDivElement('twitch-note-container');
    container.setStyle({
        left: Mouse.mousePosition.x + 'px',
        top: Mouse.mousePosition.y + 10 + 'px'
    });

    const header = new CustomDivElement('twitch-note-header');
    header.setMouseDownListener(() => {
        NoteContainers.activeContainer = username;
        Mouse.isMouseDown = true;
    });

    const closeButton = new CustomSpanElement('twitch-note-close-button', getCloseButtonSVG());
    closeButton.setClickListener(() => {
        NoteContainers.removeContainer(username);
    });

    const title = new CustomSpanElement('twitch-note-title', username);
    const content = new CustomDivElement('twitch-note-content', NoteStorage.getNote(username));
    content.addAttribute('contentEditable', 'true');

    const saveButton = new CustomDivElement('twitch-note-save-button', 'SAVE');
    saveButton.setClickListener(() => {
        NoteStorage.saveNote(username, content.getElement().innerHTML);
        NoteContainers.removeContainer(username);
    });

    header.appendCustomChild(closeButton);
    header.appendCustomChild(title);
    container.appendCustomChild(header);
    container.appendCustomChild(content);
    container.appendCustomChild(saveButton);
    document.body.appendChild(container.getElement());
    NoteContainers.addContainer(username, container);
}