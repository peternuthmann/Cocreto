document.addEventListener("DOMContentLoaded", function() {
    const user = localStorage.getItem("user");
    
    if (!user) {
        window.location.href = "login.html"; // Falls kein User eingeloggt ist, zurück zum Login
    } else {
        document.getElementById("username").textContent = user;
    }

    document.getElementById("logoutBtn").addEventListener("click", function() {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    });
});
