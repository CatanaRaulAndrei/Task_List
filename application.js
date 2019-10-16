// define UI variables
const form = document.querySelector("#task-form");
const task_list = document.querySelector(".collection");
const clear_button = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const task_input = document.querySelector("#task");
// Load all event listeners
loadEventListeners();
// DOM load event
document.addEventListener("DOMContentLoaded", getTasks);
// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  task_list.addEventListener("click", removeTask);
  // Clear task event
  clear_button.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTask);
}
// Add Task
function addTask(event_param) {
  // when nothing is entered
  if (task_input.value === "") {
    alert("Please add a task");
  }
  // when we add a task ,we want to put that task into a list of tasks
  // Create li element
  const li = document.createElement("li");
  // Add a class
  li.className = "collection-item";
  // Create text node adn append to li
  li.appendChild(document.createTextNode(task_input.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class to that link
  link.className = "delete-item secondary-content";
  // Add Icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to the li
  li.appendChild(link);
  // Appent the li to the ul
  task_list.appendChild(li);
  // Store in Local Storage
  storeTaskInLocalSotrage(task_input.value);
  // Clear Input
  task_input.value = "";

  event_param.preventDefault();
}
// Remove Task
function removeTask(event_param) {
  if (event_param.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure ?")) {
      event_param.target.parentElement.parentElement.remove();
      // Remove from local storage
      removeTaskFromLocalStorage(event_param.target.parentElement.parentElement);
    }
  }
}
// Remove tasks from local storage
function removeTaskFromLocalStorage(task_item){
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(task_item.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  while (task_list.firstChild) {
    task_list.removeChild(task_list.firstChild);
  }
  // Clear from local storage
  clearTasksFromLocalStorage();
}
// Filter Tasks
function filterTask(event_param) {
  const text = event_param.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
// Store Task
function storeTaskInLocalSotrage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Get Tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    // Add a class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class to that link
    link.className = "delete-item secondary-content";
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the li
    li.appendChild(link);
    // Appent the li to the ul
    task_list.appendChild(li);
  });
}
// Clear tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}