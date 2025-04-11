const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Iltimos, ismingizni kiriting.");
    return;
  }

  // LocalStorage ga yozamiz
  localStorage.setItem("name", name);

  // Backendga yuboramiz
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    console.log("Serverdan javob:", data);
    window.location.href = "../index.html";
  } catch (err) {
    console.error("Xatolik:", err);
    alert("Server bilan bog‘lanishda xatolik yuz berdi.");
  }
});
