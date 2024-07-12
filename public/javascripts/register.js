document.addEventListener("DOMContentLoaded", async () => {

    const forminfo = document.getElementById("register-form");

    forminfo.addEventListener("submit", sendCredentials);
    console.log("What the faaak");
});


async function sendCredentials(event) {
    event.preventDefault();
    console.log("What the faaak 2");

    console.log("Target:", event.target);
    const form = new FormData(event.target);

    try {
        const res = await fetch("/api/user/register", {
            method: "post",
            body: form
        });
        console.log("The form: ", form);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
        }
    } catch (err) {
        console.log("Error:", err);
    }
}

