(function twitchnotes() {
  if (document.querySelector("script#twitchnotes")) {
    return;
  }

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.runtime.getURL("twitchnotes.js");
  script.id = "twitchnotes";
  const head = document.getElementsByTagName("head")[0];
  if (!head) {
    return;
  }

  head.appendChild(script);

  const style = document.createElement("style");
  style.innerHTML = `
    :root {  
        --window-close: #f77669;
        --window-minify: #ffcb6b;
        --window-expand: #c3e88d;

        --background-header: #393d3e;
        --background-code: #1f1e1e;
    }

    .twitchnote img {
        height: 18px;
        padding: 0 4px 0;
    }

    .twitch-note-container {
        position: fixed;
        z-index: 1000000;
        min-width: 420px;
        max-width: 95vw;
        min-height: 240px;
        max-height: 50vh;
        background: var(--color-background-base);
        border: var(--border-width-default) solid var(--color-border-base)  !important;
    }

    .twitch-note-header {
        width: 100%;
        height: 32px;
        line-height: 32px;
        border-bottom: var(--border-width-default) solid var(--color-border-base)  !important;
        position: relative;
        cursor: move;
    }

    .twitch-note-title {
        color: var(--color-text-alt) !important;
        font-size: var(--font-size-6) !important;
        font-weight: var(--font-weight-semibold) !important;
        text-transform: uppercase !important;
        padding-left: calc((32px - var(--font-size-6)) / 2);
    }

    .twitch-note-close-button {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        aspect-ration: 1;
        color: var(--color-text-alt) !important;
        font-size: var(--font-size-6) !important;
        font-weight: var(--font-weight-semibold) !important;
        text-transform: uppercase !important;
        border: var(--border-width-default) solid var(--color-border-base)  !important;
        cursor: pointer;
    }

    .twitch-note-content {
        position: absolute;
        top: 32px;
        left: 0;
        right: 0;
        bottom: 32px;
        background: transparent;
        color: var(--color-text-base) !important;
        font-family: var(--font-base);
        vertical-align: baseline;
        outline: none;
        overflow: auto;
        padding: calc((32px - var(--font-size-6)) / 2);
    }

    .twitch-note-save-button {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 32px;
        border-top: var(--border-width-default) solid var(--color-border-base)  !important;
        cursor: pointer;
        color: var(--color-text-alt) !important;
        font-size: var(--font-size-6) !important;
        font-weight: var(--font-weight-semibold) !important;
        text-transform: uppercase !important;
        text-align: center;
        line-height: 32px;
    }
`;
  head.appendChild(style);
})();
