import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

const socket = io("http://localhost:3000");


const name = localStorage.getItem("name");

const messageInput = document.getElementById("messageInput");
const messageForm = document.getElementById("messageForm");
const messagesDiv = document.getElementById("messages");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit("message", `${name}: ${message}`);

  messageInput.value = "";
});

socket.on("message", (msg) => {
  const div = document.createElement("div");
  div.className = "alert alert-secondary py-2 px-3 mb-2";
  div.textContent = msg;
  messagesDiv.appendChild(div);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
