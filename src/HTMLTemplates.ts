import {
    CustomAElement,
    CustomButtonElement,
    CustomDivElement,
    CustomHTMLElement,
    CustomInputElement,
    CustomPElement, CustomSpanElement
} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";
import Mouse from "./Mouse";
import NoteContainers from "./NoteContainers";

export function toggleSettingsList() {
    const settingsWindow = document.querySelector('.twitch-notes-settings-container') as HTMLElement;
    if (!settingsWindow) {
        const settingsContainer = new CustomDivElement('twitch-notes-settings-container');
        const settingsBalloon = new CustomDivElement('twitch-notes-settings-balloon');
        const settingsPopover = new CustomDivElement('twitch-notes-settings-popover');
        const settingsHeader = new CustomDivElement('twitch-notes-settings-header');
        const settingsHeaderLeftElement = new CustomDivElement('twitch-notes-settings-header-left-element');
        const settingsHeaderCenterElement = new CustomDivElement('twitch-notes-settings-header-center-element');
        const settingsHeaderCenterElementContent = new CustomPElement('twitch-notes-settings-header-center-element-content','Twitch Notes Settings');
        const settingsHeaderRightElement = new CustomDivElement('twitch-notes-settings-header-right-element');
        const settingsCloseButton = new CustomButtonElement('twitch-notes-settings-close-button', getCloseButtonSVG());
        const settingsScrollableArea = new CustomDivElement('twitch-notes-settings-scrollable-area');
        const settingsContent = new CustomDivElement('twitch-notes-settings-content');
        const exportNotes = createChatSettingsLine('Export Notes');
        const importNotes = createChatSettingsLine('Import Notes');
        const clearData = createChatSettingsLine('Clear Data');
        const openAllNotes = createChatSettingsLine('View All Notes');

        settingsContainer.appendCustomChild(settingsBalloon);
        settingsBalloon.appendCustomChild(settingsPopover);
        settingsPopover.appendCustomChild(settingsHeader);
        settingsHeader.appendCustomChild(settingsHeaderLeftElement);
        settingsHeader.appendCustomChild(settingsHeaderCenterElement);
        settingsHeaderCenterElement.appendCustomChild(settingsHeaderCenterElementContent);
        settingsHeader.appendCustomChild(settingsHeaderRightElement);
        settingsHeaderRightElement.appendCustomChild(settingsCloseButton);
        settingsPopover.appendCustomChild(settingsScrollableArea);
        settingsScrollableArea.appendCustomChild(settingsContent);
        settingsContent.appendCustomChild(exportNotes);
        settingsContent.appendCustomChild(importNotes);
        settingsContent.appendCustomChild(clearData);
        settingsContent.appendCustomChild(createChatSettingsSeparator());
        settingsContent.appendCustomChild(openAllNotes);

        settingsCloseButton.setClickListener(() => toggleSettingsList());
        exportNotes.setClickListener(() => {
            NoteStorage.exportNotes();
            toggleSettingsList();
        });
        importNotes.setClickListener(() => {
            openImportNotesWindow();
            toggleSettingsList();
        });
        clearData.setClickListener(() => {
            openClearDataWindow();
            toggleSettingsList();
        });
        openAllNotes.setClickListener(() => {
            openAllNoteListWindow();
            toggleSettingsList();
        });

        document.body.appendChild(settingsContainer.getElement());
        return;
    } else {
        settingsWindow.remove();
    }
}

export function openAllNoteListWindow() {
    let activeNote: string = '';
    const blurredBackground = new CustomDivElement('twitch-notes-blurred-background');

    const noteSaved = new CustomSpanElement('', 'Note saved!');
    noteSaved.setStyle({
        color: 'green',
        marginLeft: '2rem',
    });
    noteSaved.hide();

    const container = new CustomDivElement('twitch-notes-center-floating-container');
    container.setStyle({
        padding: '0',
        paddingTop: '1rem',
        width: '100%',
        maxWidth: '800px',
        height: 'calc(320px + 5rem)',
        maxHeight: '90vh',
    });

    const closeButton = new CustomButtonElement('twitch-notes-settings-close-button', getCloseButtonSVG());
    closeButton.setStyle({
        position: 'absolute',
        top: '1rem',
        right: '1rem',
    });

    const title = new CustomDivElement('twitch-note-title', 'Notes:');
    title.setStyle({
        borderBottom: '1px solid #FFFFFF19',
        paddingBottom: '1rem',
    });
    container.appendCustomChild(title);

    const content = new CustomDivElement();
    content.setStyle({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        width: '100%',
        height: '320px'
    });
    container.appendCustomChild(content);
    closeButton.setClickListener(() => {
        blurredBackground.remove();
    });
    container.appendCustomChild(closeButton);

    const userList = new CustomDivElement();
    userList.setStyle({
        borderRight: '1px solid #FFFFFF19',
        height: '320px',
        minWidth: '240px',
        overflowY: 'auto',
        overflowX: 'hidden',
    });

    const noteContainer = new CustomDivElement();
    noteContainer.setStyle({
        height: '320px',
        padding: '1rem',
        width: '100%',
        opacity: '0',
    });

    const note = new CustomDivElement();
    note.setStyle({
        marginBottom: '3rem',
        border: '1px solid #FFFFFF19',
        height: 'calc(320px - 7rem)',
        width: '100%',
        padding: '6px',
        outline: 'none',
        overflowY: 'auto',
        overflowX: 'hidden',
    });
    note.addAttribute('contentEditable', 'true');

    const saveNote = new CustomButtonElement('twitch-notes-settings-button','Save Note');
    saveNote.setStyle({
        position: 'absolute',
        bottom: '1rem',
        left: '1rem'
    });

    saveNote.setClickListener(() => {
        if(!activeNote) {
            return;
        }
        NoteStorage.saveNote(activeNote, note.getElement().innerHTML);
        noteSaved.setStyle({
            display: 'inline-block',
        });
    });

    for(let user of NoteStorage.getSavedUserList()) {
        const userLine = new CustomDivElement('twitch-notes-user-list-user', user);
        userLine.setClickListener(() => {
            const list = document.getElementsByClassName('twitch-notes-user-list-user');
            for(let i = 0; i < list.length; i++) {
                list.item(i)?.removeAttribute('data-active');
            }
            noteSaved.hide();
            userLine.addAttribute('data-active', 'true');
            noteContainer.setStyle({opacity: '1'});
            note.getElement().innerHTML = NoteStorage.getNote(user);
            activeNote = user;
        });
        userList.appendCustomChild(userLine);
    }

    noteContainer.appendCustomChild(note);
    noteContainer.appendCustomChild(saveNote);
    noteContainer.appendCustomChild(noteSaved);

    content.appendCustomChild(userList);
    content.appendCustomChild(noteContainer);

    blurredBackground.appendCustomChild(container);
    document.body.appendChild(blurredBackground.getElement());
}

export function openClearDataWindow() {
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

export function openImportNotesWindow() {
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

export function importNotesResult(container: CustomHTMLElement, blurredBackground: CustomHTMLElement) {
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

export function importNotesConflictResolve(
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

export function createChatSettingsLine(text: string) {
    const element = new CustomDivElement('twitch-notes-settings-option-line');
    const button = new CustomButtonElement('twitch-notes-settings-option-line-button');
    const buttonContainer = new CustomDivElement('twitch-notes-settings-option-line-button-container');
    const buttonContainerContent = new CustomDivElement('twitch-notes-settings-option-line-button-container-content', text);

    buttonContainer.appendCustomChild(buttonContainerContent);
    button.appendCustomChild(buttonContainer);
    element.appendCustomChild(button);
    return element;
}

export function createChatSettingsSeparator() {
    return new CustomDivElement('twitch-note-settings-separator');
}

export function openTwitchNote(username: string) {
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

export function getCloseButtonSVG() {
    return `<svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px" class="twitch-notes-x-button">
        <g>
            <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path>
        </g>
    </svg>`;
}