
let checkboxs = document.querySelectorAll(".todo__checkbox-input");
let btn_deletes = document.querySelectorAll(".delete__btn");

for (let checkbox of checkboxs) {
    checkbox.addEventListener("click", ChangeStatus)
}

for (let btn_delete of btn_deletes) {
    btn_delete.addEventListener("click", DeleteTask)
}

function ChangeStatus(){   
    if (this.checked == true){
        this.parentElement.style.backgroundColor = "#989898";
    } else {
        this.parentElement.style.backgroundColor = "#ffffff";
    }
}

function AddTask (element){
   let statusElement = element.parentElement;

    let task = element.querySelector(".task:first-child");
    if (task.value == ''){
        alert ("введите какой-то текст задачи")
        return false;
    }

    let lastTask = statusElement.querySelector(".todo__checkbox-box:last-child");
    
    let newTask = lastTask.cloneNode(true); // клонировать сообщение
    
    lastTask.after(newTask); // показать клонированный элемент после существующего div
    initNewElement(newTask, task.value);
    let currentTask = statusElement.querySelector(".todo__checkbox-box:last-child")
    let currentRemoveBtn = currentTask.querySelector('.delete__btn')
    let currentCheckboxBtn = currentTask.querySelector('.todo__checkbox-input')

    currentRemoveBtn.addEventListener("click", DeleteTask) 
    currentCheckboxBtn.addEventListener("click", ChangeStatus)

    clearTask (task)
}

function clearTask (task){
     task.value = ""; 
}

function DeleteTask(){
   this.parentElement.remove();
}

function initNewElement(element, newTask){
    element.querySelector('.todo__text').innerHTML = newTask; // изменить клонированный элемент
    element.querySelector('.todo__checkbox-input').checked = false; // изменить клонированный элемент
    element.style.backgroundColor = "#ffffff"
}