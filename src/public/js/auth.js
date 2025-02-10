document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // 🔒 Dummy-Login-Daten (Hier später echte Authentifizierung nutzen)
            if (username === "admin" && password === "1234") {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "dashboard.html"; // Erfolgreiches Login → Weiterleitung
            } else {
                errorMessage.classList.remove("hidden"); // Fehleranzeige
            }
        });
    }

    // Falls auf einer Seite, die Login erfordert, sicherstellen, dass der Benutzer eingeloggt ist
    if (window.location.pathname.includes("dashboard.html")) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "login.html"; // Falls nicht eingeloggt → Zurück zum Login
        }
    }

    // Logout-Funktion
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedIn");
            window.location.href = "login.html"; // Zurück zur Login-Seite
        });
    }
});
