import NoteStorage from "./NoteStorage";
import importNotesResult from "./importNotesResult";
import HTMLBuilder from "./HTMLBuilder";

export default function importNotesConflictResolve(
    user: string,
    resultsContainer: HTMLElement,
    container: HTMLElement,
    blurredBackground: HTMLElement
) {
    const valueStyle = {
        minWidth: '320px',
        padding: '6px',
        border: '1px solid #FFFFFF19',
        outline: 'none',
    };
    const valueAttr = {contentEditable: 'true'};

    const diffBlurredBackground = new HTMLBuilder({
        element: 'div',
        content: [
            '<strong>Select which note to keep for <em>' + user + '</em></strong><br /><em>You can modify notes to merge them and keep updated one</em><br /><br />',
            {
                element: 'div',
                class: 'twitch-notes-grid-col-2',
                style: {
                    width: '100%',
                },
                content: [
                    {
                        element: 'div',
                        content: [{
                            element: 'p',
                            content: [
                                '<strong>Locally saved note</strong>',
                                {
                                    element: 'div',
                                    style: valueStyle,
                                    attributes: valueAttr,
                                    id: 'local-value-container',
                                    content: [NoteStorage.getNote(user)]
                                },
                                '<br />',
                                {
                                    element: 'button',
                                    class: 'twitch-notes_button',
                                    content: ['Save this'],
                                    mouseClickEvent: () => {
                                        const val = document.getElementById('local-value-container')?.innerHTML || '';
                                        NoteStorage.inputData.notes = NoteStorage.inputData.notes.map(n => n.user === user ? {
                                            user: n.user,
                                            note: val,
                                            resolved: true
                                        } : n);
                                        diffBlurredBackground.remove();
                                        resultsContainer.remove();
                                        importNotesResult(container, blurredBackground);
                                    }
                                }
                            ]
                        }]
                    },
                    {
                        element: 'div',
                        content: [{
                            element: 'p',
                            content: [
                                '<strong>Locally saved note</strong>',
                                {
                                    element: 'div',
                                    style: valueStyle,
                                    attributes: valueAttr,
                                    id: 'import-value-container',
                                    content: [NoteStorage.inputData.notes.filter(n => n.user === user)[0].note || '']
                                },
                                '<br />',
                                {
                                    element: 'button',
                                    class: 'twitch-notes_button',
                                    content: ['Save this'],
                                    mouseClickEvent: () => {
                                        const val = document.getElementById('import-value-container')?.innerHTML || '';
                                        NoteStorage.inputData.notes = NoteStorage.inputData.notes.map(n => n.user === user ? {
                                            user: n.user,
                                            note: val,
                                            resolved: true
                                        } : n);
                                        diffBlurredBackground.remove();
                                        resultsContainer.remove();
                                        importNotesResult(container, blurredBackground);
                                    }
                                }
                            ]
                        }]
                    }
                ]
            }
        ]
    });
    return diffBlurredBackground.getElement();
}