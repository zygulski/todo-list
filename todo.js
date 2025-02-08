const input = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");

// Attach event listener to the "Add" button
addButton.addEventListener("click", addTask);
// Add event listener to use "enter" button to add task
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Enter key event
        addTask();
    }
});

// Add a new task
function addTask() {
    if (input.value.trim() === "") {
        alert("You must write something");
        return;
    }

    const li = document.createElement("li");
    li.textContent = input.value;  // Use textContent to prevent injection
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.textContent = "\u00d7";  // Close button (×)
    li.appendChild(span);

    input.value = "";  // Clear input field
    saveData();  // Save to localStorage
}

// Handle task completion and deletion
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save tasks to localStorage
function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("checked"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    listContainer.innerHTML = "";  // Clear existing list

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("checked");
        }

        const span = document.createElement("span");
        span.textContent = "\u00d7";  // Close button (×)
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

// Initialize tasks on page load
showTasks();
