import {CustomButtonElement, CustomDivElement, CustomInputElement} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";
import {getCloseButtonSVG} from "./HTMLTemplates";
import importNotesResult from "./importNotesResult";

export default function openImportNotesWindow() {
    const blurredBackground = new CustomDivElement('twitch-notes-blurred-background');
    const container = new CustomDivElement('twitch-notes-center-floating-container', '<strong>WARNING!</strong> <em>This action might override existing data!</em><br /><br />');
    const inputBlock = new CustomDivElement('','Select exported twitch notes file<br /><br />');
    const input = new CustomInputElement('twitch-notes-file-input');
    input.addAttribute('type', 'file').addAttribute('accept', 'json');
    const settingsCloseButton = new CustomButtonElement('twitch-notes-settings-close-button', getCloseButtonSVG());
    settingsCloseButton.setStyle({
        position: 'absolute',
        top: '1rem',
        right: '1rem',
    });

    inputBlock.appendCustomChild(input);

    settingsCloseButton.setClickListener(() => {
        blurredBackground.remove();
    })

    input.setChangeListener(() => {
        if (!input?.getElement()?.files) return;
        // @ts-ignore
        let file = input.getElement().files.item(0);
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            if (!evt?.target?.result) return;

            NoteStorage.inputData = JSON.parse(evt.target.result.toString());
            if (NoteStorage.inputData) {
                inputBlock.setStyle({display: 'none'});
                importNotesResult(container, blurredBackground);
            }
        }
        reader.onerror = function () {
            console.error("error reading file");
        }
    });

    container.appendCustomChild(settingsCloseButton);
    container.appendCustomChild(inputBlock);
    blurredBackground.appendCustomChild(container);
    document.body.appendChild(blurredBackground.getElement());
}