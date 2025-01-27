function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification alert alert-${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    notification.addEventListener("transitionend", () => notification.remove());
  }, 3000);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    document.getElementById("errorMessage").innerText = "Please enter a task";
    return;
  }

  document.getElementById("errorMessage").innerText = "";

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <span onclick="toggleTaskCompletion(this)">${taskValue}</span>
    <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">Delete</button>
  `;

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
  updateTaskCount();
  showNotification("Task added successfully!", "success");
}

function removeTask(button) {
  const li = button.parentElement;
  li.classList.add("removing");
  li.addEventListener("transitionend", () => {
    li.remove();
    saveTasks();
    updateTaskCount();
    showNotification("Task removed successfully!", "danger");
  });
}

function clearAllTasks() {
  document.getElementById("taskList").innerHTML = "";
  saveTasks();
  updateTaskCount();
  showNotification("All tasks cleared!", "danger");
}

function updateTaskCount() {
  const taskCount = document.getElementById("taskList").children.length;
  document.getElementById("taskCount").innerText = taskCount;

  // إظهار زر Clear All فقط لو فيه 2 تاسك أو أكتر
  const clearAllBtn = document.getElementById("clearAllBtn");
  if (taskCount >= 2) {
    clearAllBtn.classList.remove("d-none");
  } else {
    clearAllBtn.classList.add("d-none");
  }
}

function saveTasks() {
  const tasks = [...document.querySelectorAll("#taskList li span")].map(task => task.innerText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  savedTasks.forEach(taskText => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span onclick="toggleTaskCompletion(this)">${taskText}</span>
      <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">Delete</button>
    `;
    document.getElementById("taskList").appendChild(li);
  });
  updateTaskCount();
}

window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
  loadTasks();
};
