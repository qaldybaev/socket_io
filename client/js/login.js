
const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  localStorage.setItem("name", name);

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (res.status >= 400) {
      const data = await res.json();
      alert(data.message);
      return;
    }

    const data = await res.json();
    localStorage.setItem("user",JSON.stringify(data.data))

    window.location.href = "/";
  } catch (error) {
    alert(error.message);
  }
});
