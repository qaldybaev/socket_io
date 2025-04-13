import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

const elMessages = document.querySelector(".messages");
const elForm = document.querySelector(".message-form");
const elInput = document.querySelector(".message-input");
const elTyping = document.querySelector(".typing-text");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  socket.emit("join", { user: user._id });
}
socket.on("message", (msgs) => {
  let user = JSON.parse(localStorage.getItem("user"));
  elMessages.innerHTML = "";

  
  msgs.forEach((m) => {
    const userName = m.user?.name ? m.user.name.slice(0, 10) : "Noma'lum";
    if (m.type === "message") {
      if (m.user?._id === user._id) {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="my-message align-self-end">
            <p class="message border d-inline p-2 rounded-3">
              ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2 text-end">
              ${userName} <span>${m.createdAt}</span>
            </div>
          </div>`
        );
      } else {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="other-message">
            <p class="message border d-inline p-2 rounded-3">
              ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2">
              ${userName} <span>${m.createdAt}</span>
            </div>
          </div>`
        );
      }
    }

    if (m.type === "join_message") {
      elMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="join-message text-center text-success border rounded-2">
          <p class="p-0 m-0">${m.user?.name.slice(0, 10)} qo‘shildi. 
          <span>${m.createdAt}</span></p>
        </div>`
      );
    }
  });
});

socket.on("typing", (user) => {
  elTyping.innerHTML = "";
  elTyping.textContent = `${user.name} yozmoqda...`;
});

elInput.addEventListener("keyup", function () {
  let user = JSON.parse(localStorage.getItem("user"));
  socket.emit("typing", { user: user._id });
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = JSON.parse(localStorage.getItem("user"));

  const text = e.target.message.value;
  socket.emit("new_message", { user: user._id, text });
  e.target.reset();
});
