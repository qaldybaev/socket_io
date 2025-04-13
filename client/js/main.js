import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");

const elMessages = document.querySelector("messages");
let user = JSON.parse(localStorage.getItem("user"));
const elForm = document.querySelector(".message-form");
const elInput = document.querySelector(".message-input");

socket.on("message", (msgs) => {
  elMessages.innerHTML = "";

  msgs.foreach((m) => {
    if (m.type === "message") {
      if (m.user._id == user._id) {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="my-message align-self-end">
            <p class="message border d-inline p-2 rounded-3">
              ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2 text-end">
              ${m.user.name.slice(0, 3)}<span>${m.createdAt}</span>
            </div>
          </div>`
        );
      } else {
        elMessages.insertAdjacentHTML(
          "beforeend",
          ` <div class="other-message">
            <p class="message border d-inline p-2 rounded-3">
               ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2">
              ${m.user.name.slice(0, 10)} <span>${m.createdAt}</span>
            </div>
          </div>`
        );
      }
    }

    if (m.type === "join_message") {
      elMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="join-message text-center text-success border rounded-2">
            <p class="p-0 m-0">${m.user.name.slice(0, 10)} qoshildi.
            <span>${m.createdAt}</span>
            </p>
          </div>`
      );
    }
  });
});

elInput.addEventListener("keyup",function (e) {
  socket.emit("typing", { user: user_id });
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = e.target.message.value;

  socket.emit("message", { user: user_id, text });
});
export default socket;
