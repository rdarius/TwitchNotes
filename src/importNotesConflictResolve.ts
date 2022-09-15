import {CustomButtonElement, CustomDivElement, CustomHTMLElement, CustomPElement} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";
import importNotesResult from "./importNotesResult";

export default function importNotesConflictResolve(
    user: string,
    resultsContainer: CustomHTMLElement,
    container: CustomHTMLElement,
    blurredBackground: CustomHTMLElement
) {
    const diffBlurredBackground = new CustomDivElement('twitch-notes-blurred-background');
    const diffContainer = new CustomDivElement('twitch-notes-center-floating-container', '<strong>Select which note to keep for <em>' + user + '</em></strong><br /><em>You can modify notes to merge them and keep updated one</em><br /><br />');

    const inputContainer = new CustomDivElement();
    inputContainer.setStyle({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        width: '100%',
    });

    const valueStyle = {
        minWidth: '320px',
        padding: '6px',
        border: '1px solid #FFFFFF19',
        outline: 'none',
    };
    const valueAttr: [string, string] = ['contentEditable', 'true'];

    const localValueContainer = new CustomDivElement();
    const pLocal = new CustomPElement('', '<strong>Locally saved note</strong>');
    localValueContainer.appendCustomChild(pLocal);

    const localValue = new CustomDivElement();
    localValue.setStyle(valueStyle);
    localValue.addAttribute(...valueAttr);
    localValue.setId('local-value-container');
    const localValueSave = new CustomButtonElement('twitch-notes-settings-button',  'Save this');
    localValueSave.setClickListener(() => {
        const val = document.getElementById('local-value-container')?.innerHTML || '';
        NoteStorage.inputData.notes = NoteStorage.inputData.notes.map(n => n.user === user ? {
            user: n.user,
            note: val,
            resolved: true
        } : n);
        diffBlurredBackground.remove();
        resultsContainer.remove();
        importNotesResult(container, blurredBackground);
    });
    localValueContainer.appendCustomChild(localValue);
    localValueContainer.appendBody('<br />');
    localValueContainer.appendCustomChild(localValueSave);

    const importedValueContainer = new CustomDivElement();
    const iLocal = new CustomPElement('', '<strong>Imported note</strong>');
    importedValueContainer.appendCustomChild(iLocal);
    const importedValue = new CustomDivElement('', NoteStorage.inputData.notes.filter(n => n.user === user)[0].note || '');
    importedValue.setId('import-value-container');
    importedValue.setStyle(valueStyle);
    importedValue.addAttribute(...valueAttr);
    const importedValueSave = new CustomButtonElement('twitch-notes-settings-button', 'Save this');
    importedValueSave.setClickListener(() => {
        const val = document.getElementById('import-value-container')?.innerHTML || '';
        NoteStorage.inputData.notes = NoteStorage.inputData.notes.map(n => n.user === user ? {
            user: n.user,
            note: val,
            resolved: true
        } : n);
        diffBlurredBackground.remove();
        resultsContainer.remove();
        importNotesResult(container, blurredBackground);
    });

    importedValueContainer.appendCustomChild(importedValue);
    importedValueContainer.appendBody('<br />');
    importedValueContainer.appendCustomChild(importedValueSave);


    inputContainer.appendCustomChild(localValueContainer);
    inputContainer.appendCustomChild(importedValueContainer);

    diffContainer.appendCustomChild(inputContainer);
    diffBlurredBackground.appendCustomChild(diffContainer);
    document.body.appendChild(diffBlurredBackground.getElement());
}