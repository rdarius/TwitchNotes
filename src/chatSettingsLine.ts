import {HTMLBuilderBlock} from "./types";

export default function createChatSettingsLine(text: string, cb?: Function): HTMLBuilderBlock {

    return {
        element: 'div',
        class: 'twitch-notes-settings-option-line',
        content: [
            {
                element: 'button',
                class: 'twitch-notes-settings-option-line-button',
                content: [
                    {
                        element: 'div',
                        class: 'twitch-notes-settings-option-line-button-container',
                        content: [
                            {
                                element: 'div',
                                class: 'twitch-notes-settings-option-line-button-container-content',
                                content: [
                                    text
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        mouseClickEvent: () => cb ? cb() : () => {},
    };
}