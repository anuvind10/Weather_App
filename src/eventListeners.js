import * as updateDisplay from "./display";
import * as tasks from "./tasks";
import { addProject } from "./projects";
import { getProjectList } from "./projects"

export default function attachListeners(element = "") {
    const expandableHeaders = document.querySelectorAll(".expandable");
    const addProjectBtn = document.querySelector("#add-project-icon");
    const projectName = document.querySelector("#project-name");
    const addTaskBtn = document.querySelector("#add-task-icon");
    const today = document.querySelector("#today");
    const thisWeek = document.querySelector("#thisWeek");
    
    if (!element == "") {
        switch (true) {
            // handle adding new project
            case element.id === "add-project-btn":
                element.addEventListener("click", () => {
                    let projects = getProjectList();
            
                    updateDisplay.renderProjectList(projects)
                    projectName.value = "";
            
                    updateDisplay.toggleAddProjectModal()
                }, {once: true}); // to avoid stacking up eventlisteners
    
                break;
    
            // handle canceling change
            case element.id === "cancel-btn":
                element.addEventListener("click", () => {
                    projectName.value = "";
                    updateDisplay.toggleAddProjectModal()
                }, {once: true});
    
                break;

            // handle adding new task
            case element.id === "img_div":
                element.addEventListener("click", (event) => {
                    tasks.getTaskList(event.target);
                })
                break;

            // handle completing task
            case element.classList.contains("taskCheckbox"):
                element.addEventListener("click", (event) => {
                    tasks.updateTask(event.target);
                })
                break;

            // handle toggling active projects
            case element.classList.contains("project"):
                element.addEventListener("click", (event) => {
                    updateDisplay.toggleActiveProject(event.target);
                });
                break;

            // handle removing project
            case element.classList.contains("remove-icon"):
                element.addEventListener('click', (event) => {
                    updateDisplay.removeProject(event.target);
                    event.stopPropagation();
                })
                break;

            default:
                break;
        }        
    }
    else {
        // handle buttons on pageload
        const defaultProject = document.querySelector("#Default-0");
        const archiveProject = document.querySelector("#Archive-9999");

        expandableHeaders.forEach(header => {
            header.addEventListener("click", (event) => {
               updateDisplay.toggleHeader(event.target)
            })
        });
   
        addProjectBtn.addEventListener("click", (event) => {
            addProject();
            event.stopPropagation();
        })

        addTaskBtn.addEventListener("click", (event) => {
            tasks.getTaskList(event.target);
        });
        
        today.addEventListener("click", (event) => {
            tasks.getTaskList(event.target)
        })

        thisWeek.addEventListener("click", (event) => {
            tasks.getTaskList(event.target)
        })

        defaultProject.addEventListener("click", (event) => {
            updateDisplay.toggleActiveProject(event.target);
        })

        archiveProject.addEventListener("click", (event) => {
            updateDisplay.toggleActiveProject(event.target);
        })
    }
}

