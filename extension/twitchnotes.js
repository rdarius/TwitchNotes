let TN_mousePosition = { x: 0, y: 0 };
let TN_lastMousePosition = { x: 0, y: 0 };
let TN_openContainers = {};
let TN_isMouseDown = false;
let TN_activeContainer = null;
let TN_settingsWindowOpen = false;

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

function createSettingsButton(buttonContainer) {
  const settingsButton = document.createElement("div");
  settingsButton.innerHTML = "<b>Notes</b>";
  settingsButton.addEventListener("click", () => {});

  buttonContainer.lastChild.insertBefore(
    settingsButton,
    buttonContainer.lastChild.firstChild
  );
}

function getSavedUserList() {
  return JSON.parse(localStorage.getItem("twitch-note-all-users-list") || "[]");
}

function addUserToSavedList(username) {
  let userList = getSavedUserList();

  if (!userList.includes(username)) {
    userList.push(username);
    localStorage.setItem(
      "twitch-note-all-users-list",
      JSON.stringify(userList)
    );
  }
}

function saveNote(username, note) {
  addUserToSavedList(username);
  localStorage.setItem("twitch-note-" + username, note);
}
function getNote(username) {
  return localStorage.getItem("twitch-note-" + username) || "";
}

function handleMouseMove(event) {
  event = event || window.event;
  if (TN_isMouseDown) {
    if (TN_activeContainer) {
      const dx = TN_mousePosition.x - TN_lastMousePosition.x;
      const dy = TN_mousePosition.y - TN_lastMousePosition.y;
      TN_openContainers[TN_activeContainer].style.top =
        parseInt(TN_openContainers[TN_activeContainer].style.top) + dy + "px";
      TN_openContainers[TN_activeContainer].style.left =
        parseInt(TN_openContainers[TN_activeContainer].style.left) + dx + "px";
    }
  }
  updateMousePosition(event.clientX, event.clientY);
}

function handleMouseUp(event) {
  TN_activeContainer = null;
  TN_isMouseDown = false;
}

function updateMousePosition(x, y) {
  TN_lastMousePosition = { ...TN_mousePosition };
  TN_mousePosition.x = x;
  TN_mousePosition.y = y;
}

function removeContainer(username) {
  if (!TN_openContainers[username]) return;
  TN_openContainers[username].remove();
  delete TN_openContainers[username];
}

function addContainer(username, container) {
  if (TN_openContainers[username]) return;
  TN_openContainers[username] = container;
  document.body.appendChild(container);
}

function openTwitchNote(username) {
  // CONTAINER
  const container = document.createElement("div");
  container.style.left = TN_mousePosition.x + "px";
  container.style.top = TN_mousePosition.y + 10 + "px";
  container.classList.add("twitch-note-container");

  // HEADER
  const header = document.createElement("div");
  header.classList.add("twitch-note-header");
  header.addEventListener("mousedown", function close() {
    TN_activeContainer = username;
    TN_isMouseDown = true;
  });
  const closeButton = document.createElement("span");
  closeButton.classList.add("twitch-note-close-button");
  closeButton.innerText = "X";
  closeButton.addEventListener("click", function close() {
    removeContainer(username);
  });
  header.appendChild(closeButton);
  const title = document.createElement("span");
  title.classList.add("twitch-note-title");
  title.innerHTML = username;
  header.appendChild(title);
  container.appendChild(header);

  // BODY
  const content = document.createElement("div");
  content.classList.add("twitch-note-content");
  content.setAttribute("contentEditable", true);
  content.innerHTML = getNote(username);

  container.appendChild(content);

  const saveButton = document.createElement("div");
  saveButton.classList.add("twitch-note-save-button");
  saveButton.innerText = "SAVE";
  saveButton.addEventListener("click", function () {
    saveNote(username, content.innerHTML);
    removeContainer(username);
  });

  container.appendChild(saveButton);

  addContainer(username, container);
}

(function runTwitchNotes() {
  // Select the node that will be observed for mutations

  let giveUpAt = Date.now() + 20000;

  let changeInProgress = false;

  let targetNode;
  let buttonContainer;

  do {
    targetNode = document.getElementsByClassName(
      "chat-scrollable-area__message-container"
    )[0];
  } while (!targetNode || giveUpAt < Date.now());

  do {
    buttonContainer = document.getElementsByClassName(
      "chat-input__buttons-container"
    )[0];
  } while (!buttonContainer || giveUpAt < Date.now());

  createSettingsButton(buttonContainer);

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    if (!changeInProgress) {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          changeInProgress = true;
          let nodes = document.getElementsByClassName("chat-line__message");
          let users = [];
          for (let node of nodes) {
            const n = node.querySelector(".chat-author__display-name");
            if (!n) continue;
            const usernameContainer = node.querySelector(
              ".chat-line__username-container"
            );

            const username = n.attributes["data-a-user"].value;
            if (username) {
              let noteButton = usernameContainer.querySelector(".twitchnote");
              if (!noteButton) {
                const twitchNote = document.createElement("span");
                twitchNote.classList.add("twitchnote");
                twitchNote.style.cursor = "pointer";
                twitchNote.addEventListener("click", () => {
                  openTwitchNote(username);
                });

                const img = document.createElement("img");
                img.src = "https://cdn.rdarius.lt/icons/32-id-card.png";
                twitchNote.appendChild(img);

                usernameContainer.insertBefore(
                  twitchNote,
                  usernameContainer.firstChild
                );
              }
              if (!users[username]) {
                users[username] = 0;
              }
              users[username]++;
            }
          }
          changeInProgress = false;
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
})();
