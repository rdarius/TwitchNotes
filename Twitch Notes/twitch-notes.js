(function runTwitchNotes() {

  let mousePosition = { x: 0, y: 0 };
  let lastMousePosition = { x: 0, y: 0 };
  let openContainers = {};
  let isMouseDown = false;
  let activeContainer = null;
  let settingsWindowOpen = false;

  let LS_UserList = "twitch-note-all-users-list";
  let LS_Prefix = "twitch-note-";

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  function createSettingsButton(buttonContainer) {
    const c1 = document.createElement("div");
    c1.style.marginLeft = "0.5rem !important";
    const c2 = document.createElement("div");
    c2.style.display = "inline-flex !important";

    const settingsButton = document.createElement("button");
    settingsButton.classList.add("twitch-notes-settings-button");
    settingsButton.innerHTML = "Notes";
    settingsButton.addEventListener("click", () => {
      console.log("TN Settings");
    });

    c2.appendChild(settingsButton);
    c1.appendChild(c2);

    buttonContainer.lastChild.insertBefore(
      c1,
      buttonContainer.lastChild.lastChild
    );
  }

  function getSavedUserList() {
    return JSON.parse(localStorage.getItem(LS_UserList) || "[]");
  }

  function addUserToSavedList(username) {
    let userList = getSavedUserList();

    if (!userList.includes(username)) {
      userList.push(username);
      localStorage.setItem(LS_UserList, JSON.stringify(userList));
    }
  }

  function saveNote(username, note) {
    addUserToSavedList(username);
    localStorage.setItem(LS_Prefix + username, note);
  }
  function getNote(username) {
    return localStorage.getItem(LS_Prefix + username) || "";
  }

  function handleMouseMove(event) {
    event = event || window.event;
    if (isMouseDown) {
      if (activeContainer) {
        const dx = mousePosition.x - lastMousePosition.x;
        const dy = mousePosition.y - lastMousePosition.y;
        openContainers[activeContainer].style.top =
          parseInt(openContainers[activeContainer].style.top) + dy + "px";
        openContainers[activeContainer].style.left =
          parseInt(openContainers[activeContainer].style.left) + dx + "px";
      }
    }
    updateMousePosition(event.clientX, event.clientY);
  }

  function handleMouseUp(event) {
    activeContainer = null;
    isMouseDown = false;
  }

  function updateMousePosition(x, y) {
    lastMousePosition = { ...mousePosition };
    mousePosition.x = x;
    mousePosition.y = y;
  }

  function removeContainer(username) {
    if (!openContainers[username]) return;
    openContainers[username].remove();
    delete openContainers[username];
  }

  function addContainer(username, container) {
    if (openContainers[username]) return;
    openContainers[username] = container;
    document.body.appendChild(container);
  }

  function openTwitchNote(username) {
    // CONTAINER
    const container = document.createElement("div");
    container.style.left = mousePosition.x + "px";
    container.style.top = mousePosition.y + 10 + "px";
    container.classList.add("twitch-note-container");

    // HEADER
    const header = document.createElement("div");
    header.classList.add("twitch-note-header");
    header.addEventListener("mousedown", function close() {
      activeContainer = username;
      isMouseDown = true;
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
              let noteButton = usernameContainer.querySelector(".twitch-note");
              if (!noteButton) {
                const twitchNote = document.createElement("span");
                twitchNote.classList.add("twitch-note");
                twitchNote.style.cursor = "pointer";
                twitchNote.addEventListener("click", () => {
                  openTwitchNote(username);
                });

                const img = document.createElement("img");
                img.src = "https://cdn.rdarius.lt/icons/32-id-card.png";
                img.style.height = "18px";
                img.style.paddingRight = "4px";
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
