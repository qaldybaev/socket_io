import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://192.168.100.205:3000");

const elMessages = document.querySelector(".messages");
const elForm = document.querySelector(".message-form");
const elInput = document.querySelector(".message-input");
const elTyping = document.querySelector(".typing-text");


const user = JSON.parse(localStorage.getItem("user"));


if (user) {
  socket.emit("join", { user: user?.data?._id });
}


socket.on("message", (msgs) => {
  const user = JSON.parse(localStorage.getItem("user"));
  elMessages.innerHTML = "";

  msgs.forEach((m) => {
    const userName = (m?.user?.data?.name || m?.user?.name || "Noma'lum").slice(0, 20);
    const time = new Date(m.createdAt).toLocaleTimeString();
    const isMyMessage = m?.user?._id === user?.data?._id;

    if (m.type === "message") {
      if (isMyMessage) {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="my-message align-self-end">
            <p class="message border d-inline p-2 rounded-3 bg-body-secondary">
              ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2 text-end">${userName}
             <span class="text-muted ms-2">${time}</span>
            </div>
          </div>`
        );
      } else {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="other-message">
            <p class="message border d-inline p-2 rounded-3 bg-light">
              ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2">
              ${userName} <span class="text-muted ms-2">${time}</span>
            </div>
          </div>`
        );
      }
    }

    if (m.type === "join_message") {
      elMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="join-message text-center text-success border rounded-2 my-2 py-1">
          <p class="p-0 m-0">${m?.user?.name?.slice(0, 20)} qo‘shildi. 
          <span class="text-muted ms-2">${time}</span></p>
        </div>`
      );
    }
  });
});

socket.on("typing", (userTyping) => {
  elTyping.textContent = `${userTyping.name} yozmoqda...`;
  setTimeout(() => {
    elTyping.textContent = "";
  }, 3000);
});

elInput.addEventListener("input", () => {
  if (user) {
    socket.emit("typing", { user: user?.data?._id });
  }
});


elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = elInput.value.trim();
  if (text && user) {
    socket.emit("new_message", { user: user?.data?._id, text });
    elInput.value = "";
  }
});
