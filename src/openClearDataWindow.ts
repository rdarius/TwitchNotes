import {CustomButtonElement, CustomDivElement} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";

export default function openClearDataWindow() {
    const blurredBackground = new CustomDivElement( 'twitch-notes-blurred-background');
    const container = new CustomDivElement('twitch-notes-center-floating-container', '<strong>This action will delete all saved notes!</strong><br /><br /><em>Consider exporting notes before performing this action in case you will need to use notes again</em>');
    const spacer = new CustomDivElement();
    spacer.setStyle({
        height: '24px'
    });
    const deleteAction = new CustomButtonElement('twitch-notes-settings-button', 'DELETE ALL NOTES');
    deleteAction.setStyle({
        background: 'red'
    });
    deleteAction.setClickListener(() => {
        NoteStorage.clearData();
        blurredBackground.remove();
    });
    const cancelAction = new CustomButtonElement('twitch-notes-settings-button', 'Cancel');
    cancelAction.setClickListener(() => {
        blurredBackground.remove();
    });
    container.appendCustomChild(spacer);
    container.appendCustomChild(deleteAction);
    container.appendCustomChild(cancelAction);
    blurredBackground.appendCustomChild(container);
    document.body.appendChild(blurredBackground.getElement());
}