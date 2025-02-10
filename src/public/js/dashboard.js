document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const addColumnBtn = document.getElementById("add-column");

    function saveBoardState() {
        const columns = [];
        document.querySelectorAll(".column").forEach(column => {
            const title = column.querySelector(".column-title").value;
            const tasks = [];
            column.querySelectorAll(".task-content").forEach(task => {
                tasks.push(task.value);
            });
            columns.push({ title, tasks });
        });
        localStorage.setItem("dashboard", JSON.stringify(columns));
    }

    function loadBoardState() {
        const savedColumns = JSON.parse(localStorage.getItem("dashboard"));
        if (savedColumns) {
            savedColumns.forEach(column => {
                createColumn(column.title, column.tasks);
            });
        } else {
            createColumn("Unbenannt");
        }
    }

    function createColumn(title = "Neue Spalte", tasks = []) {
        const column = document.createElement("div");
        column.classList.add("column");
        column.innerHTML = `
            <div class="column-header">
                <input type="text" class="column-title" value="${title}"/>
                <button class="delete-column">✖</button>
            </div>
            <div class="task-list"></div>
            <button class="add-task">+ Aufgabe</button>
        `;

        column.querySelector(".column-title").addEventListener("input", saveBoardState);

        column.querySelector(".delete-column").addEventListener("click", function () {
            column.remove();
            saveBoardState();
        });

        column.querySelector(".add-task").addEventListener("click", function () {
            createTask(column.querySelector(".task-list"));
        });

        tasks.forEach(taskText => createTask(column.querySelector(".task-list"), taskText));

        board.appendChild(column);
        saveBoardState();
    }

    function createTask(taskList, text = "Neue Aufgabe") {
        const task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = `
            <input type="text" class="task-content" value="${text}"/>
            <button class="delete-task">✖</button>
        `;

        task.querySelector(".task-content").addEventListener("input", saveBoardState);

        task.querySelector(".delete-task").addEventListener("click", function () {
            task.remove();
            saveBoardState();
        });

        taskList.appendChild(task);
        saveBoardState();
    }

    addColumnBtn.addEventListener("click", function () {
        createColumn();
    });

    loadBoardState();
});
