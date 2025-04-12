import { renderTasks,  } from "./display";
import attachListeners from "./eventListeners";

// Add a new task
export default function addTask(tasks) {
    const currentProject = document.querySelector(".activeProject");
    const defaultProject = document.querySelector("#Default-0");

    const priorityListValues = ["Low", "Medium", "High"];

    const task = document.createElement("div");
    task.classList.add("task");

    const title = document.createElement("input");
    const dueDate = document.createElement("input");
    const dueDateLabel = document.createElement("label");
    const priorityLabel = document.createElement("label");
    const priorityList = document.createElement("select");
    const checkbox = document.createElement("input");

    title.type = "text";
    title.classList.add("taskTitle");
    title.placeholder = "Title";

    const dueDateDiv = document.createElement("div");
    dueDateLabel.for = "dueDate";
    dueDateLabel.innerHTML = "Due Date: ";

    dueDate.name = "dueDate";
    dueDate.type = "date";
    dueDate.value = new Date().toISOString().split("T")[0]
    dueDate.classList.add("taskDueDate");

    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDate);

    const priorityDiv = document.createElement("div");
    priorityLabel.for = "priority";
    priorityLabel.innerHTML = "Priority: ";
    priorityList.name = "priority";
    priorityList.classList.add("taskPriority");

    priorityListValues.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.innerHTML = priority;
        priorityList.appendChild(option);
    });

    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(priorityList);

    checkbox.type = "checkbox";
    checkbox.classList.add("taskCheckbox");

    let div = document.createElement("div");
    div.appendChild(dueDateDiv);
    div.appendChild(priorityDiv);
    div.appendChild(checkbox);

    task.appendChild(title);
    task.appendChild(div);

    currentProject ? task.setAttribute("data-project", currentProject.id) : task.setAttribute("data-project", defaultProject.id);

    attachListeners(checkbox);

    tasks.push(task);
    renderTasks(tasks);
}

// Gets the list of tasks
export function getTaskList(trigger) {
    const taskList = document.querySelectorAll(".task");
    let tasks = [];
            
    if (taskList.length > 0) {
        taskList.forEach(task => {
            tasks.push(task);
        });
    }

    if (trigger.id === "add-task-icon" || trigger.id === "img_div") {
        addTask(tasks);
    }
    else {
        // render the tasks
        renderTasks(tasks, trigger)
    }
}

// Updates the task
export function updateTask(task) {
    const archive = document.querySelector("#Archive-9999");
    const activeProject = document.querySelector(".activeProject");
    const defaultProject = document.querySelector("#Default-0");

    if (!task.checked) {
        task.closest(".task").setAttribute("data-project", defaultProject.id);
    }
    else {
        task.closest(".task").setAttribute("data-project", archive.id);
    }

    // get the new task list and render it
    getTaskList(activeProject)
}
