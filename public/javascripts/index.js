document.addEventListener("DOMContentLoaded", async () => {

    const login_btn = document.getElementById("login-btn");
    const register_btn = document.getElementById("register-btn");

    login_btn.addEventListener("click", async () => {
        window.location.href = "/login.html";
    });


    register_btn.addEventListener("click", async () => {
        window.location.href = "/register.html";
    });
});
