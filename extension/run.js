// noinspection SpellCheckingInspection

(function twitchNotes() {
    const head = document.getElementsByTagName("head")[0];
    if (!head) {
        return;
    }

    if (!document.querySelector("script#twitchNotesScript")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = chrome.runtime.getURL("twitch-notes.js");
        script.id = "twitchNotesScript";
        head.appendChild(script);
    }
})();
