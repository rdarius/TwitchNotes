(function twitchNotes() {
  if (!chrome) {
    return;
  }

  const head = document.getElementsByTagName("head")[0];
  if (!head) {
    return;
  }

  if (!document.querySelector("script#twitchNotesScript")) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL("twitchnotes.js");
    script.id = "twitchNotesScript";
    head.appendChild(script);
  }

  if (!document.querySelector("style#twitchNotesStyle")) {
    const style = document.createElement("style");
    style.src = chrome.runtime.getURL("twitchnotes.css");
    style.id = "twitchNotesStyle";

    head.appendChild(style);
  }
})();
