import NoteStorage from "./NoteStorage";
import {getCloseButtonSVG} from "./HTMLTemplates";
import HTMLBuilder from "./HTMLBuilder";

export default function openAllNoteListWindow() {
    let activeNote: string = '';
    const blurredBackground = new HTMLBuilder({element: "div", class: 'twitch-notes-blurred-background'});

    const noteSaved = new HTMLBuilder({
        element: 'span',
        content: ['Note saved!'],
        style: {
            color: 'green',
            marginLeft: '2rem',
            display: 'none'
        }
    });

    const content = new HTMLBuilder({
        element: 'div',
        style: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'no-wrap',
            width: '100%',
            height: '320px'
        }
    });

    const closeButton = new HTMLBuilder({
        element: 'button',
        class: 'twitch-notes-settings-close-button',
        content: [getCloseButtonSVG()],
        style: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
        },
        mouseClickEvent: () => {
            blurredBackground.remove();
        }
    });

    const container = new HTMLBuilder({
        element: 'div',
        class: 'twitch-notes-center-floating-container',
        style: {
            padding: '0',
            paddingTop: '1rem',
            width: '100%',
            maxWidth: '800px',
            height: 'calc(320px + 5rem)',
            maxHeight: '90vh',
        },
        content: [
            {
                element: 'div',
                class: 'twitch-notes-title',
                content: ['Notes:'],
                style: {
                    borderBottom: '1px solid #FFFFFF19',
                    paddingBottom: '1rem',
                }
            },
            content.getElement(),
            closeButton.getElement()
        ]
    });

    const userList = new HTMLBuilder({
        element: 'div',
        class: 'twitch-notes-user-list'
    });

    const noteContainer = new HTMLBuilder({
        element: 'div',
        style: {
            height: '320px',
            padding: '1rem',
            width: '100%',
            opacity: '0',
        }
    });

    const note = new HTMLBuilder({
        element: 'div',
        style: {
            marginBottom: '3rem',
            border: '1px solid #FFFFFF19',
            height: 'calc(320px - 7rem)',
            width: '100%',
            padding: '6px',
            outline: 'none',
            overflowY: 'auto',
            overflowX: 'hidden',
        },
        attributes: {
            contentEditable: 'true'
        }
    });

    const saveNote = new HTMLBuilder({
        element: 'button',
        class: 'twitch-notes-settings-button',
        content: ['Save Note'],
        style: {
            position: 'absolute',
            bottom: '1rem',
            left: '1rem'
        },
        mouseClickEvent: () => {
            if (!activeNote) {
                return;
            }
            NoteStorage.saveNote(activeNote, note.getElement().innerHTML);
            noteSaved.getElement().style.display = 'inline-block';
        }
    });

    for (let user of NoteStorage.getSavedUserList()) {
        const userLine = new HTMLBuilder({
            element: 'div',
            class: 'twitch-notes-user-list-user',
            content: [user],
            mouseClickEvent: () => {
                const list = document.getElementsByClassName('twitch-notes-user-list-user');
                for (let i = 0; i < list.length; i++) {
                    list.item(i)?.removeAttribute('data-active');
                }
                noteSaved.getElement().style.display = 'none';
                userLine.addAttribute('data-active', 'true');
                noteContainer.getElement().style.opacity = '1';
                note.getElement().innerHTML = NoteStorage.getNote(user);
                activeNote = user;
            }
        });
        userList.addContent(userLine.getElement());
    }

    noteContainer.addContent(note.getElement());
    noteContainer.addContent(saveNote.getElement());
    noteContainer.addContent(noteSaved.getElement());

    content.addContent(userList.getElement());
    content.addContent(noteContainer.getElement());

    blurredBackground.addContent(container.getElement());
    document.body.appendChild(blurredBackground.getElement());
}