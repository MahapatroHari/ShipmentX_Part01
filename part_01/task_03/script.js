document.addEventListener("DOMContentLoaded", () => {
    let taskInput = document.getElementById("new-task");
    let addButton = document.querySelector("button");
    let incompleteTasksHolder = document.getElementById("incomplete-tasks");
    let completedTasksHolder = document.getElementById("completed-tasks");

    // Create a new task element
    function createNewTaskElement(taskString) {
        let listItem = document.createElement("li");

        let checkBox = document.createElement("input");
        let label = document.createElement("label");
        let editInput = document.createElement("input");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        checkBox.type = "checkbox";
        editInput.type = "text";
        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        label.innerText = taskString;

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    // Add a new task
    function addTask() {
        let taskValue = taskInput.value.trim();

        if (taskValue === "") {
            alert("Task cannot be empty");
            return;
        }

        let listItem = createNewTaskElement(taskValue);
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value = "";
    }

    // Edit an existing task
    function editTask() {
        let listItem = this.parentNode;
        let editInput = listItem.querySelector("input[type=text]");
        let label = listItem.querySelector("label");

        let containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;
        } else {
            editInput.value = label.innerText;
        }

        listItem.classList.toggle("editMode");
    }

    // Delete an existing task
    function deleteTask() {
        let listItem = this.parentNode;
        let ul = listItem.parentNode;

        ul.removeChild(listItem);
    }

    // Mark a task as complete
    function taskCompleted() {
        let listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }

    // Mark a task as incomplete
    function taskIncomplete() {
        let listItem = this.parentNode;
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    // Bind events to task items
    function bindTaskEvents(taskListItem, checkBoxEventHandler) {
        let checkBox = taskListItem.querySelector("input[type=checkbox]");
        let editButton = taskListItem.querySelector("button.edit");
        let deleteButton = taskListItem.querySelector("button.delete");

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    }

    // Set the click handler to the addTask function
    addButton.addEventListener("click", addTask);

    // Initialize existing tasks
    Array.from(incompleteTasksHolder.children).forEach(item => bindTaskEvents(item, taskCompleted));
    Array.from(completedTasksHolder.children).forEach(item => bindTaskEvents(item, taskIncomplete));
});
