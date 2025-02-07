document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    for (let i = 1; i <= 2; i++) {
        const storedTasks = JSON.parse(localStorage.getItem(`tasks${i}`)) || [];
        const taskList = document.getElementById(`taskList${i}`);
        taskList.innerHTML = "";
        storedTasks.forEach((task, index) => {
            createTaskElement(taskList, task, i, index);
        });
    }
}

function addTask(listNumber) {
    const input = document.getElementById(`taskInput${listNumber}`);
    const taskText = input.value.trim();
    if (taskText === "") return;

    const taskList = document.getElementById(`taskList${listNumber}`);
    const tasks = JSON.parse(localStorage.getItem(`tasks${listNumber}`)) || [];

    tasks.push(taskText);
    localStorage.setItem(`tasks${listNumber}`, JSON.stringify(tasks));

    createTaskElement(taskList, taskText, listNumber, tasks.length - 1);
    input.value = "";
}

function createTaskElement(taskList, taskText, listNumber, index) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✎";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editTask(listNumber, index, span);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash" style="color: black;"></i>';
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(listNumber, index, taskText);

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);
    taskList.appendChild(li);
}

function editTask(listNumber, index, span) {
    const tasks = JSON.parse(localStorage.getItem(`tasks${listNumber}`)) || [];
    const newText = prompt("ערוך : ", tasks[index]);
    if (newText !== null && newText.trim() !== "") {
        tasks[index] = newText.trim();
        localStorage.setItem(`tasks${listNumber}`, JSON.stringify(tasks));
        span.textContent = newText;
    }
}

function deleteTask(listNumber, index, taskText) {
    const confirmation = confirm(`האם את בטוחה שאת רוצה למחוק את: "${taskText}"?`);
    if (!confirmation) return;

    let tasks = JSON.parse(localStorage.getItem(`tasks${listNumber}`)) || [];
    tasks.splice(index, 1);
    localStorage.setItem(`tasks${listNumber}`, JSON.stringify(tasks));
    loadTasks();
}