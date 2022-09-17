import NoteStorage from "./NoteStorage";
import importNotesConflictResolve from "./importNotesConflictResolve";
import HTMLBuilder from "./HTMLBuilder";
import TwitchButton from "./HTMLElements/TwitchButton";
import TwitchNotesImportResolve from "./HTMLElements/TwitchNotesImportResolve";

export default function importNotesResult(container: HTMLElement, blurredBackground: HTMLElement, cb?: Function) {
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

    const resultsContainer = new HTMLBuilder({
        element: 'div',
        style: {
            padding: '1rem'
        }
    });

    if (willBeOverwritten.length) {
        const overwrittenContainer = new HTMLBuilder({
            element: 'div',
            content: ['<strong>Note conflicts found for:</strong><br />'],
            style: {
                marginTop: '1rem',
            }
        });

        for (let item of willBeOverwritten) {
            const isResolved = NoteStorage.inputData.notes.find(note => note.user === item)?.resolved;
            overwrittenContainer.addContent({
                element: 'div',
                content: [item + ' ', {
                    element: 'a',
                    content: [isResolved ? '[update]' : '[resolve]'],
                    style: {
                        cursor: 'pointer',
                    },
                    mouseClickEvent: () => {
                        TwitchNotesImportResolve.open(item, container, blurredBackground);
                        // importNotesConflictResolve(item, resultsContainer, container, blurredBackground);
                    }
                }],
                style: {
                    color: isResolved ? 'green' : 'red',
                }
            });
        }
        resultsContainer.addContent(overwrittenContainer.getElement());
    }

    if (willBeAdded.length) {
        resultsContainer.addContent({
            element: 'div',
            content: ['<strong>Note will be added for:</strong><br />' + willBeAdded.join('<br />')],
            style: {
                marginTop: '1rem',
                color: 'white'
            }
        });
    }

    if (noChanges.length) {
        resultsContainer.addContent({
            element: 'div',
            content: ['<strong>No changes for:</strong><br />' + noChanges.join('<br />')],
            style: {
                marginTop: '1rem',
                color: 'gray'
            }
        });
    }

    resultsContainer.addContent({element: 'div', style: {height: '24px'}});

    willBeOverwritten = willBeOverwritten.filter(x => !NoteStorage.inputData.notes.find(n => n.user === x)?.resolved);

    const saveButton = new TwitchButton('Complete import');
    if (willBeOverwritten.length > 0) saveButton.element.style.background = 'gray';
    if (willBeOverwritten.length > 0) saveButton.element.setAttribute('disabled', 'true');

    resultsContainer.addContent(saveButton.element)

    if (willBeOverwritten.length > 0) {
        resultsContainer.addContent({
            element: 'div',
            content: ['<em>Import cannot be completed while there are unresolved conflicts</em>'],
            style: {color: 'gray'}
        });
    } else {
        saveButton.element.addEventListener('click', () => {
            for (let note of NoteStorage.inputData.notes) {
                NoteStorage.saveNote(note.user, note.note);
            }
            blurredBackground.remove();
            NoteStorage.inputData = {
                users: [],
                notes: [],
                settings: {},
            };
            cb ? cb() : () => {};
        });
    }

    container.innerHTML = '';
    container.appendChild(resultsContainer.getElement());
}