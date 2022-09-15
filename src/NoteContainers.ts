import HTMLBuilder from "./HTMLBuilder";

const containers: {[key: string]: HTMLBuilder} = {};

export default {
    activeContainer: '',
    containers,
    addContainer(username: string, container: HTMLBuilder) {
        if (this.containers[username]) return;
        this.containers[username] = container;
    },
    removeContainer(username: string) {
        if (!this.containers[username]) return;
        this.containers[username].remove();
        delete this.containers[username];
    }
}