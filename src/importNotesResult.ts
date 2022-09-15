import {CustomAElement, CustomButtonElement, CustomDivElement, CustomHTMLElement} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";
import importNotesConflictResolve from "./importNotesConflictResolve";

export default function importNotesResult(container: CustomHTMLElement, blurredBackground: CustomHTMLElement) {
    const willBeAdded = [];
    let willBeOverwritten = [];
    const noChanges = [];

    for (let user of NoteStorage.inputData.users) {
        if (NoteStorage.getNote(user)) {
            if (NoteStorage.inputData.notes.find(note => note.user === user)?.resolved || NoteStorage.getNote(user) !== NoteStorage.inputData.notes.find(note => note.user === user)?.note) {
                willBeOverwritten.push(user);
            } else {
                noChanges.push(user);
            }
        } else {
            willBeAdded.push(user);
        }
    }

    const resultsContainer = new CustomDivElement();

    if (willBeOverwritten.length) {
        const overwrittenContainer = new CustomDivElement('', '<strong>Note conflicts found for:</strong><br />');
        overwrittenContainer.setStyle({marginTop: '1rem'});

        for (let item of willBeOverwritten) {
            const row = new  CustomDivElement('', item + ' ');
            const isResolved = NoteStorage.inputData.notes.find(note => note.user === item)?.resolved;
            row.setStyle({
                color: isResolved ? 'green' : 'red',
            });
            const resolve = new CustomAElement('', isResolved ? '[update]' : '[resolve]');
            resolve.setStyle({
                cursor: 'pointer'
            });

            resolve.setClickListener(() => {
                importNotesConflictResolve(item, resultsContainer, container, blurredBackground);
            })
            row.appendCustomChild(resolve);
            overwrittenContainer.appendCustomChild(row);
        }
        resultsContainer.appendCustomChild(overwrittenContainer);
    }

    if (willBeAdded.length) {
        const addedContainer = new CustomDivElement('', '<strong>Note will be added for:</strong><br />' + willBeAdded.join('<br />'));
        addedContainer.setStyle({
            marginTop: '1rem',
            color: 'white'
        });
        resultsContainer.appendCustomChild(addedContainer);
    }

    if (noChanges.length) {
        const noChangesContainer = new CustomDivElement('', '<strong>No changes for:</strong><br />' + noChanges.join('<br />'));
        noChangesContainer.setStyle({
            marginTop: '1rem',
            color: 'gray'
        });
        resultsContainer.appendCustomChild(noChangesContainer);
    }

    const spacer = new CustomDivElement();
    spacer.setStyle({height: '24px'});
    resultsContainer.appendCustomChild(spacer);

    willBeOverwritten = willBeOverwritten.filter(x => !NoteStorage.inputData.notes.find(n => n.user === x)?.resolved);

    const saveButton = new CustomButtonElement('twitch-notes-settings-button', 'Complete import');
    saveButton.setStyle({})
    if (willBeOverwritten.length > 0) saveButton.setStyle({background: 'gray'});
    if (willBeOverwritten.length > 0) saveButton.addAttribute('disabled', 'true');

    resultsContainer.appendCustomChild(saveButton)

    if (willBeOverwritten.length > 0) {
        const note = new CustomDivElement('', '<em>Import cannot be completed while there are unresolved conflicts</em>');
        note.setStyle({
            color: 'gray',
        });
        resultsContainer.appendCustomChild(note);
    } else {
        saveButton.setClickListener(() => {
            for (let note of NoteStorage.inputData.notes) {
                NoteStorage.saveNote(note.user, note.note);
            }
            blurredBackground.remove();
            NoteStorage.inputData = {
                users: [],
                notes: [],
                settings: {},
            };
        });
    }

    container.appendCustomChild(resultsContainer);
}