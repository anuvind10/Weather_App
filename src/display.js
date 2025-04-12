// Handles rendering of pages

import today_icon from "./images/today_icon.png";
import projects_icon from "./images/projects_icon.png";
import todo_icon from "./images/todolist_icon.png";
import add_icon from "./images/add.png";
import thisWeek_icon from "./images/week_icon.png";
import expand_icon from "./images/expand_icon.png";
import collapse_icon from "./images/collapse_icon.png";
import remove_icon from "./images/close_icon.png";
import addTask_icon from "./images/add_task_icon.png";
import addTask_icon2 from "./images/add_task_icon2.png";
import attachListeners from "./eventListeners";

import { getTaskList } from "./tasks";

// Renders icons on page load
export function renderIcons() {
    const elements = [
        { name: "today", icon: today_icon },
        { name: "thisWeek", icon: thisWeek_icon },
        { name: "projects", icon: projects_icon},
        { name: "projects-expand", icon: expand_icon },
        { name: "logo", icon: todo_icon },
        { name: "add-project", icon: add_icon },
        { name: "add-task", icon: addTask_icon }
    ];

    elements.forEach(element => {
        const imgElement = document.querySelector(`#${element.name}-icon`);
        imgElement.src = element.icon;
    });
}

// Expands or contracts Navbar headers
export function toggleHeader(element) {
    let toggleElement;

    toggleElement = element.parentElement.tagName.toLowerCase() === "button" ? element.parentElement : element
    
    const elementToExpand = toggleElement.nextElementSibling;
    const icon = document.querySelector(`#${toggleElement.id.split("-")[0]}-expand-icon`);

    if (elementToExpand.classList.contains("show")) {
        elementToExpand.classList.remove("show");
        icon.src = expand_icon;
    }
    else {
        elementToExpand.classList.add("show");
        icon.src = collapse_icon;
    }
}

// Renders the projects
export function renderProjectList(projects) {
    const projectLists = document.querySelector("#projects-list");
    const projectHeader = document.querySelector("#projects-dropdown-btn");

    projectLists.firstElementChild.innerHTML = "";

    let idCounter = 0;

    projects.forEach(project => {
        const newProject = document.createElement('li');
        newProject.innerHTML = project;

        const div = document.createElement('div');
        const removeIcon = document.createElement('img');   

        project === "Archive" ? div.id = project + "-9999": div.id = project + `-${idCounter}`;

        div.classList.add("project");

        removeIcon.classList.add('icon');
        removeIcon.classList.add('remove-icon');
        removeIcon.src = remove_icon;
        
        // Default and Archive projects should not be removeable
        div.appendChild(newProject);
        if (project != "Default" && project != "Archive") {
            div.appendChild(removeIcon);
        }
        else if (project === "Default") {
            div.classList.add("activeProject");
        }

        attachListeners(div);

        // Bind the projects
        if (!projectLists.firstElementChild.lastElementChild || 
            projectLists.firstElementChild.lastElementChild.id.split("-")[0] !== "Archive") {
            projectLists.firstElementChild.appendChild(div);
            idCounter++;
        }
        else {
            projectLists.firstElementChild.lastElementChild.before(div);
        }

        if (!projectLists.classList.contains('show'))
            toggleHeader(projectHeader);

        attachListeners(removeIcon);
    });
}

// Removes project
export function removeProject(event) {
    const defaultProject = document.querySelector("#Default-0");
    const projectLists = document.querySelector("#projects-list");
    const toRemove = event.parentElement;
    const project = event.parentElement.firstElementChild;
    const tasks = document.querySelectorAll(".task");
    const taskList = document.querySelector("#task-list");

    projectLists.firstElementChild.removeChild(toRemove);
    defaultProject.classList.add("activeProject");
    // Render the tasks of the active project

    getTaskList(defaultProject);

    if (projectLists.firstElementChild.childElementCount === 0) {
        toggleHeader(projectLists.previousElementSibling);
    }

    if (projectLists.childElementCount == 1) {
        const defaultProject = projectLists.firstElementChild.firstElementChild;
        if (!defaultProject.classList.contains("activeProject")) {
            defaultProject.classList.toggle("activeProject");
        }
    }

    tasks.forEach(task => {
        if (task.getAttribute("data-project") === toRemove.id)
            taskList.removeChild(task);
    });
}

// Open the add new project page
export function toggleAddProjectModal() {
    const projectModal = document.querySelector("#projectModal");

    projectModal.classList.toggle('active');
    overlay.classList.toggle("active");
}

//
export function renderTasks(tasks, trigger="newTask") {
    const taskList = document.querySelector("#task-list");
    const emptyTaskList = document.querySelector("#empty-task-list");
    const addTask2 = document.querySelector("#img_div");
    const navListItems = document.querySelectorAll(".list-item");
    let activeProject;
    
    // Bind the added task
    if (trigger === "newTask") {
        if (tasks.length !== 0) {
            taskList.innerHTML = "";
            taskList.classList.remove("empty");
            const div = document.createElement("div");
            const addTaskIcon = document.createElement("img");
            addTaskIcon.src = addTask_icon2;
            addTaskIcon.id = "add-task-icon2";
    
            div.id = "img_div";
            div.appendChild(addTaskIcon);
    
            attachListeners(div);
            tasks.push(div);
            tasks.forEach(task => {
                taskList.appendChild(task);
            });

            emptyTaskList.style.display = "none";
            taskList.appendChild(emptyTaskList);
        }
        else{ 
            taskList.classList.add("empty");
        }
    }
    // Show only tasks of the active project
    else if (trigger.closest("li").id != "today" && trigger.closest("li").id != "thisWeek") {
        activeProject = trigger.closest(".project");
        let isEmpty = true;

        tasks.forEach(task => {
            if (task.getAttribute("data-project") === activeProject.id) {
                task.style.display = "flex";
            }
            else {
                task.style.display = "none";
            }
        });

        tasks.forEach(task => {
            if (task.getAttribute("data-project") === activeProject.id) {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            emptyTaskList.style.display = "flex";
            if (addTask2) 
                addTask2.style.display = "none";
            taskList.classList.add("empty");
        }
        else {
            emptyTaskList.style.display = "none";
            if (addTask2) 
                addTask2.style.display = "flex";
            taskList.classList.remove("empty");
        }
    }
    // Show only the tasks for the day or the week
    else if (trigger.closest("li").id=== "today" || trigger.closest("li").id === "thisWeek"){
        activeProject = document.querySelector(".activeProject");
        const dates = document.querySelectorAll("input[type=date]");
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 7)

        if (trigger.closest("li").id === "today") {
            dates.forEach(date => {
                if (date.value === today.toISOString().split("T")[0]) {
                    date.closest(".task").style.display = "flex";
                }
                else {
                    date.closest(".task").style.display = "none";
                }
            });
        }
        else if (trigger.closest("li").id === "thisWeek") {
            dates.forEach(date => {
                if (date.value >= today.toISOString().split("T")[0] 
                    && date.value <= maxDate.toISOString().split("T")[0]) {
                    date.closest(".task").style.display = "flex";
                }
                else {
                    date.closest(".task").style.display = "none";
                }
            });
        }

        if (activeProject) {
            activeProject.classList.remove("activeProject");
        }

        navListItems.forEach(listItem => {
            if (listItem.id === trigger.closest("li").id) {
                listItem.classList.add("active");
            }
            else {
                listItem.classList.remove("active");
            }
        });
    }
}

// Toggles between active projects
export function toggleActiveProject(element) {
    const projectList = document.querySelectorAll(".project");
    const listItem = document.querySelectorAll(".list-item");

    projectList.forEach(project => {
        if (project.classList.contains("activeProject"))
            project.classList.toggle("activeProject");
    });

    const activeProject = element.id == "" ? element.parentElement : element;
    activeProject.classList.toggle("activeProject");

    listItem.forEach(item => {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
        }
    });

    // Render the tasks of the active project
    getTaskList(element);
}