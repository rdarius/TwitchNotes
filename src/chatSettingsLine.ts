import {CustomButtonElement, CustomDivElement} from "./CustomHTMLElement";

export default function createChatSettingsLine(text: string) {
    const element = new CustomDivElement('twitch-notes-settings-option-line');
    const button = new CustomButtonElement('twitch-notes-settings-option-line-button');
    const buttonContainer = new CustomDivElement('twitch-notes-settings-option-line-button-container');
    const buttonContainerContent = new CustomDivElement('twitch-notes-settings-option-line-button-container-content', text);

    buttonContainer.appendCustomChild(buttonContainerContent);
    button.appendCustomChild(buttonContainer);
    element.appendCustomChild(button);
    return element;
}