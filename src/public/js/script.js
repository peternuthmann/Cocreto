document.addEventListener("DOMContentLoaded", () => {
    const kanbanBoard = document.getElementById("kanban-board");
    const addColumnBtn = document.getElementById("add-column");
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "login.html";
        });
    }

    // Funktion zum Erstellen einer neuen Spalte
    function createColumn(name = "Unnamed") {
        const column = document.createElement("div");
        column.classList.add("column", "w-1/5", "bg-white", "p-4", "rounded-lg", "shadow-md");

        const title = document.createElement("input");
        title.type = "text";
        title.classList.add("text-lg", "font-bold", "border-none", "focus:outline-none", "w-full");
        title.value = name;

        const tasksContainer = document.createElement("div");
        tasksContainer.classList.add("tasks", "mt-4", "space-y-2");

        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("add-task-btn", "mt-4", "text-blue-500");
        addTaskBtn.innerText = "+ Neue Aufgabe";

        addTaskBtn.addEventListener("click", () => addTask(tasksContainer));

        column.appendChild(title);
        column.appendChild(tasksContainer);
        column.appendChild(addTaskBtn);

        kanbanBoard.insertBefore(column, addColumnBtn);
    }

    // Funktion zum Erstellen einer neuen Aufgabe
    function addTask(tasksContainer) {
        const task = document.createElement("div");
        task.classList.add("task", "bg-gray-200", "p-3", "rounded-lg");
        task.setAttribute("draggable", "true");
        task.innerText = "Neue Aufgabe";

        task.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", task.innerText);
        });

        tasksContainer.appendChild(task);
    }

    // Spalten-Button
    addColumnBtn.addEventListener("click", () => createColumn());

    // Drag & Drop
    document.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    document.addEventListener("drop", (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData("text/plain");
        const task = document.createElement("div");
        task.classList.add("task", "bg-gray-200", "p-3", "rounded-lg");
        task.innerText = text;

        if (e.target.classList.contains("tasks")) {
            e.target.appendChild(task);
        }
    });
});
