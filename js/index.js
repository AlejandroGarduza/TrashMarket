import { saveTask, uploadFile } from "./firebase.js";


window.addEventListener("DOMContentLoaded",()=>{
    
})

const taskForm=document.getElementById("task-form");

taskForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const title=taskForm["task-title"]
    const description=taskForm["task-description"]

    const url = uploadFile(taskForm["fileInput"].files[0]);
    
    
    saveTask(title.value,description.value, "");


})