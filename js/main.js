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

  const loginData = { code, password: "1234" };

  // Hacer la solicitud de inicio de sesión
  fetch("https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }
      return response.json();
    })
    .then((user) => {
      // Guardar el usuario en localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Obtener las notas del estudiante
      fetch(`https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${code}/notas`)
        .then((response) => response.json())
        .then((notas) => {
          // Guardar las notas en localStorage
          localStorage.setItem("notas", JSON.stringify(notas));
          // Redirigir a la página de notas
          window.location.href = "notas.html";
        })
        .catch((error) => {
          console.error("Error al obtener las notas:", error);
          messageDiv.textContent = "Error al obtener las notas";
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      messageDiv.textContent = error.message || "Error de inicio de sesión";
    });
});
