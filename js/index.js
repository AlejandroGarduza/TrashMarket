import { guardarPost, subirArchivo } from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {});

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //const title = taskForm["task-title"];
  //const description = taskForm["task-description"];

  const url = await subirArchivo(taskForm["fileInput"].files[0]);

  //guardarPost(title.value, description.value, url);
  //taskForm.reset();
});
