const form = document.querySelector("form");
const messageDiv = document.getElementById("message");
const codeInput = document.getElementById("code");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = codeInput.value;
  const password = passwordInput.value;

  if (password !== "1234") {
    messageDiv.textContent = "Credenciales inválidas";
    codeInput.value = "";
    passwordInput.value = "";
    return;
  }

  const data = { code, password: "1234" };

  fetch("https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "notas.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      messageDiv.textContent = "Credenciales inválidas";
      codeInput.value = "";
      passwordInput.value = "";
    });
});
