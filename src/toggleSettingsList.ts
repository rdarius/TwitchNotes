import {CustomButtonElement, CustomDivElement, CustomPElement} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";
import {
    getCloseButtonSVG
} from "./HTMLTemplates";
import openAllNoteListWindow from "./openAllNoteListWindow";
import openClearDataWindow from "./openClearDataWindow";
import openImportNotesWindow from "./openImprtNotesWindow";
import createChatSettingsLine from "./chatSettingsLine";
import createChatSettingsSeparator from "./chatSettingsSeparator";

export default function toggleSettingsList() {
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