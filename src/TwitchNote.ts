export default class TwitchNote {

    observer: MutationObserver | null = null;
    chatContainerNode?: Element;

    constructor() {
    }

    init(chatContainerNode: Element) {
        this.chatContainerNode = chatContainerNode;
        console.log('CHAT CONTAINER INITIATED');
        this.startObserver(chatContainerNode);
        // add Notes management button
        this.addNotesButton();
    }

    startObserver(targetNode: Element) {
        // discard old observer
        if (this.observer) {
            this.observer.disconnect();
        }

        const observerCallback = (mutationList: MutationRecord[]) => {
            // preventing multiple chat updates at once in case update process
            // is taking longer or chat is super active
            if (!changeInProgress) {
                for (const mutation of mutationList) {
                    if (mutation.type === "childList") {
                        changeInProgress = true;
                        // add badges next to users
                        this.addUserNoteBadges();
                        changeInProgress = false;
                    }
                }
            }
        };

        let changeInProgress = false;
        const observerConfig = {attributes: true, childList: true, subtree: true};
        this.observer = new MutationObserver(observerCallback);
        this.observer.observe(targetNode, observerConfig);
    }

    addNotesButton() {
    }

    addUserNoteBadges() {
    }
}