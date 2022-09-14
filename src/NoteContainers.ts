import {CustomHTMLElement} from "./CustomHTMLElement";

const containers: {[key: string]: CustomHTMLElement} = {};

export default {
    activeContainer: '',
    containers,
    addContainer(username: string, container: CustomHTMLElement) {
        if (this.containers[username]) return;
        this.containers[username] = container;
    },
    removeContainer(username: string) {
        if (!this.containers[username]) return;
        this.containers[username].remove();
        delete this.containers[username];
    }
}