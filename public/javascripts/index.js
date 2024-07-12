let todos_list = [];

document.addEventListener("DOMContentLoaded", async () => {


    //const logout_btn = document.getElementById("logout") || document.getElementById("notlog");
    const todo_inp = document.getElementById("add-item");
    const auth_div = document.getElementById("auth-divizion");
    const unauth_div = document.getElementById("unauth-divizion");
    const email_field = document.getElementById("email-field");


    todo_inp.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            try {
                const new_todo = {
                    items: [todo_inp.value]
                };
                const str_json = JSON.stringify(new_todo);
                const res = await fetch("/api/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                    },
                    body: str_json
                });

                const data = await res.json();
                console.log("Data:", data.items);

                todos_list.push(...data.items);
                showTodos();

                // Clear input field after adding item
                todo_inp.value = '';

            } catch (err) {
                console.log("Error while fetching: ", err);
            }
        }
    });

    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        email_field.textContent = `Hello There: ${payload.email}`;
        unauth_div.classList.add("hider");
        auth_div.classList.remove("hider");

        await createLogout();
        // Fetch initial todos on page load
        fetchTodos();
    }
});

async function createLogout() {
    const innerhtml = `
    <button id="logout" class="btn">Logout</button>`

    document.getElementById("button").innerHTML = innerhtml;

    const logout_btn = document.getElementById("logout");

    logout_btn.addEventListener("click", async () => {
        localStorage.removeItem("auth_token");
        todos_list = [];

        showTodos();
        window.location.reload();
        removeLogout();
    });
}

async function removeLogout() {
    const innerhtml = "";
    document.getElementById("button").innerHTML = innerhtml;
}

async function fetchTodos() {
    try {
        const res = await fetch("/api/todos", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        });

        const data = await res.json();
        todos_list = data.items;
        showTodos();

    } catch (err) {
        console.log("Error fetching todos:", err);
    }
}


function showTodos() {
    const todos = document.getElementById("todos");
    todos.innerHTML = ""; // Clear existing content

    todos_list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        todos.appendChild(li);
    });
}
