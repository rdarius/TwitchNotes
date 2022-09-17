import NoteStorage from "./NoteStorage";
import openAllNoteListWindow from "./openAllNoteListWindow";
import openClearDataWindow from "./openClearDataWindow";
// import openImportNotesWindow from "./openImprtNotesWindow";
import createChatSettingsLine from "./chatSettingsLine";
import {HTMLBuilderBlock} from "./types";
import HTMLBuilder from "./HTMLBuilder";
import TwitchCloseButton from "./HTMLElements/TwitchCloseButton";

export default function toggleSettingsList() {
    const settingsWindow = document.querySelector('.twitch-notes-settings-container') as HTMLElement;
    if (settingsWindow) {
        settingsWindow.remove();
        return;
    }


}