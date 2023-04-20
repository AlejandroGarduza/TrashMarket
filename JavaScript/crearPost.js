import { guardarPost, storage, subirArchivo } from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {});

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  const url = await subirArchivo(taskForm["fileInput"].files[0]);

  const autor = ''+localStorage.getItem('correo');

  guardarPost(title.value, description.value, url, autor);
  taskForm.reset();
});


