document.addEventListener("DOMContentLoaded", async () => {

    const login_btn = document.getElementById("login-btn");
    const register_btn = document.getElementById("register-btn");

    const logout_btn = document.getElementById("logout-btn");

    const auth_div = document.getElementById("auth-divizion");

    const unauth_div = document.getElementById("unauth-divizion");
    const email_field = document.getElementById("email-field");

    login_btn.addEventListener("click", async () => {
        window.location.href = "/login.html";
    });


    register_btn.addEventListener("click", async () => {
        window.location.href = "/register.html";
    });

    logout_btn.addEventListener("click", () => {
        localStorage.removeItem("auth_token");
        window.location.reload();
    });

    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        email_field.textContent = `Hello There: ${payload.email}`;
        unauth_div.classList.add("hider");
        auth_div.classList.remove("hider");
    }
});
