import HTMLBuilder from "./HTMLBuilder";

export default class NoteContainers {
    static activeContainer: string | null = null;
    static containers: { [key: string]: HTMLBuilder } = {};

    static addContainer(username: string, container: HTMLBuilder) {
        if (NoteContainers.containers[username]) return;
        NoteContainers.containers[username] = container;
    };

    static removeContainer(username: string) {
        if (!NoteContainers.containers[username]) return;
        NoteContainers.containers[username].remove();
        delete NoteContainers.containers[username];
    };
}