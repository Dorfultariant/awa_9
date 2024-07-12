document.addEventListener("DOMContentLoaded", async () => {

    const forminfo = document.getElementById("login-form");

    forminfo.addEventListener("submit", sendCredentials);
});


async function sendCredentials(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    console.log("Form:", form);

    try {
        const res = await fetch("/api/user/login", {
            method: "post",
            body: form
        });
        console.log("Res:", res);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data.token) {
                storeToken(data.token);
                window.location.href = "/";
            }
        }
    } catch (err) {
        console.log("Error:", err);
    }
}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}
