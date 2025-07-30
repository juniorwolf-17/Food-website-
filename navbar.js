window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5500/check-session", {
        credentials: "include"  // Important to send cookies!
    })
    .then(res => res.json())
    .then(data => {
        if (data.loggedIn) {
            document.getElementById("login-link").style.display = "none";
            document.getElementById("profile-link").style.display = "inline";
        } else {
            document.getElementById("login-link").style.display = "inline";
            document.getElementById("profile-link").style.display = "none";
        }
    })
    .catch(err => console.error("Session check error:", err));
});

// Save user info to localStorage
localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));