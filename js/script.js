function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification alert alert-${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100); // Delay to allow animation

  setTimeout(() => {
    notification.classList.remove("show");
    notification.addEventListener("transitionend", () => notification.remove());
  }, 3000); // 3 seconds display
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
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
  ${taskValue}
  <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">Delete</button>`;

  taskList.appendChild(li);
  taskInput.value = "";
  taskInput.focus();

  showNotification("Task added successfully!", "success");
}

function removeTask(button) {
  const li = button.parentElement;
  li.classList.add("removing");
  li.addEventListener("transitionend", () => {
    li.remove();
    showNotification("Task removed successfully!", "danger");
  });
}
