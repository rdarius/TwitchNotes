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

  if (!document.querySelector("style#twitchNotesStyle")) {
    const style = document.createElement("link");
    style.setAttribute("href", chrome.runtime.getURL("twitch-notes.css"));
    style.setAttribute("type", "text/css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("crossorigin", "anonymous");
    style.id = "twitchNotesStyle";
    head.appendChild(style);
  }
})();
