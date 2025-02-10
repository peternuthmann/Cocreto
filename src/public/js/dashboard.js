document.addEventListener("DOMContentLoaded", function() {
    console.log("Dashboard geladen!");

    const taskContainers = document.querySelectorAll(".space-y-2");

    taskContainers.forEach(container => {
        container.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        container.addEventListener("drop", function(event) {
            event.preventDefault();
            const taskId = event.dataTransfer.getData("text/plain");
            const taskElement = document.getElementById(taskId);
            container.appendChild(taskElement);
        });
    });

    document.querySelectorAll(".task").forEach(task => {
        task.setAttribute("draggable", true);
        task.setAttribute("id", `task-${Math.random().toString(36).substr(2, 9)}`);
        task.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", event.target.id);
        });
    });

    document.querySelectorAll(".add-task").forEach(button => {
        button.addEventListener("click", function() {
            const container = this.previousElementSibling;
            const newTask = document.createElement("div");
            newTask.className = "task bg-gray-200 p-2 rounded mt-2";
            newTask.setAttribute("draggable", true);
            newTask.setAttribute("id", `task-${Math.random().toString(36).substr(2, 9)}`);
            newTask.textContent = "Neue Aufgabe";
            newTask.addEventListener("dragstart", function(event) {
                event.dataTransfer.setData("text/plain", event.target.id);
            });

            container.appendChild(newTask);
        });
    });

    console.log("Dashboard-Setup abgeschlossen.");
});
