const activeTabs = {};
let contentScriptRerunner = null;

function runContentScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    allFrames: true,
    file: 'run.js',
  });
}

function rerunContentScripts() {
  // unfortunately we need to rerun periodically to handle iframes changing..
  // eventually fixed when we require the new host permission or chrome releases a content script api
  for (const tabId of Object.keys(activeTabs)) {
    runContentScript(parseInt(tabId, 10));
  }
}

function registerDynamicContentScript() {
  chrome.tabs.onUpdated.addListener((tabId, {status}, {url}) => {
    if (!status || !url) {
      return;
    }

    runContentScript(tabId);
    activeTabs[tabId] = true;

    if (contentScriptRerunner == null) {
      contentScriptRerunner = setInterval(rerunContentScripts, 5000);
    }
  });
  chrome.tabs.onRemoved.addListener((tabId) => {
    delete activeTabs[tabId];

    if (contentScriptRerunner != null && Object.keys(activeTabs).length === 0) {
      clearInterval(contentScriptRerunner);
      contentScriptRerunner = null;
    }
  });
}

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason !== 'install') {
    return;
  }
});

registerDynamicContentScript();
