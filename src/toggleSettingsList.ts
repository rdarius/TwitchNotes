import NoteStorage from "./NoteStorage";
import { getCloseButtonSVG } from "./HTMLTemplates";
import openAllNoteListWindow from "./openAllNoteListWindow";
import openClearDataWindow from "./openClearDataWindow";
import openImportNotesWindow from "./openImprtNotesWindow";
import createChatSettingsLine from "./chatSettingsLine";
import { HTMLBuilderBlock } from "./types";
import HTMLBuilder from "./HTMLBuilder";

export default function toggleSettingsList() {
    const settingsWindow = document.querySelector('.twitch-notes-settings-container') as HTMLElement;
    if (!settingsWindow) {
        const settingsContainer: HTMLBuilderBlock = {
            element: 'div',
            class: 'twitch-notes-settings-container',
            content: [{
                element: 'div',
                class: 'twitch-notes-settings-balloon',
                content: [{
                    element: 'div',
                    class: 'twitch-notes-settings-popover',
                    content: [
                        {
                            element: 'div',
                            class: 'twitch-notes-settings-header',
                            content: [
                                {
                                    element: 'div',
                                    class: 'twitch-notes-settings-header-left-element',
                                },
                                {
                                    element: 'div',
                                    class: 'twitch-notes-settings-header-center-element',
                                    content: [{
                                        element: 'p',
                                        class: 'twitch-notes-settings-header-center-element-content',
                                        content: ['Twitch Notes Settings']
                                    }]
                                },
                                {
                                    element: 'div',
                                    class: 'twitch-notes-settings-header-right-element',
                                    content: [{
                                        element: 'button',
                                        class: 'twitch-notes-settings-close-button',
                                        content: [getCloseButtonSVG()],
                                        mouseClickEvent: () => toggleSettingsList(),
                                    }]
                                }
                            ]
                        },
                        {
                            element: 'div',
                            class: 'twitch-notes-settings-scrollable-area',
                            content: [{
                                element: 'div',
                                class: 'twitch-notes-settings-content',
                                content: [
                                    createChatSettingsLine('Export Notes', () => {
                                        NoteStorage.exportNotes();
                                        toggleSettingsList();
                                    }),
                                    createChatSettingsLine('Import Notes',() => {
                                        openImportNotesWindow();
                                        toggleSettingsList();
                                    }),
                                    createChatSettingsLine('Clear Data',() => {
                                        openClearDataWindow();
                                        toggleSettingsList();
                                    }),
                                    {
                                        element: 'div',
                                        class: 'twitch-note-settings-separator',
                                    },
                                    createChatSettingsLine('View All Notes',() => {
                                        openAllNoteListWindow();
                                        toggleSettingsList();
                                    }),
                                ]
                            }]
                        }
                    ]
                }]
            }]
        };

        const settingsContainerElement =  new HTMLBuilder(settingsContainer);

        document.body.appendChild(settingsContainerElement.getElement());
        return;
    } else {
        settingsWindow.remove();
    }
}