import { guardarVenta, subirArchivo } from "./firebase.js";


window.addEventListener("DOMContentLoaded",()=>{
    
})

const taskForm=document.getElementById("task-form");

taskForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const title=taskForm["task-title"]
    const description=taskForm["task-description"]

    
    guardarVenta(title.value,description.value);
    subirArchivo(taskForm["fileInput"].files[0]);
})