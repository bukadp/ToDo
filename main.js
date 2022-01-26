import { format } from './node_modules/date-fns';

const checkboxs = document.querySelectorAll('.todo__checkbox-input');
const btnDeletes = document.querySelectorAll('.delete__btn');
const changeStatus = new AddClickAction(checkboxs, ChangeStatus);
const deleteTask = new AddClickAction(btnDeletes, DeleteTask);

function AddClickAction(elts, callbackFunction) {
    this.elements = elts;
    this.callback = callbackFunction;
    this.action = function() {
        for (let element of this.elements) {
            element.addEventListener('click', this.callback)
        }
    };
}

const textTasks = document.querySelectorAll('.todo__add');
for (let textTask of textTasks) {
    textTask.addEventListener('submit', addTask);
}

changeStatus.action();
deleteTask.action();

function ChangeStatus() {
    if (this.checked == true) {
        this.parentElement.style.backgroundColor = '#989898';
    } else {
        this.parentElement.style.backgroundColor = '#ffffff';
    }
}

function addTask (element) {
    element.preventDefault();
    const statusElement = element.currentTarget.parentElement;
    const task = element.currentTarget.querySelector('.task:first-child');
    if (task.value == '') {
        alert('введите какой-то текст задачи');
        return false;
    }
    const lastTask = statusElement.querySelector('.todo__checkbox-box:last-child');
    const newTask = lastTask.cloneNode(true); // клонировать сообщение

    lastTask.after(newTask); // показать клонированный элемент после существующего div
    initNewElement(newTask, task.value);
    const currentTask = statusElement.querySelector('.todo__checkbox-box:last-child');
    const currentRemoveBtn = currentTask.querySelector('.delete__btn');
    const currentCheckboxBtn = currentTask.querySelector('.todo__checkbox-input');
    currentRemoveBtn.addEventListener('click', DeleteTask);
    currentCheckboxBtn.addEventListener('click', ChangeStatus);
    clearTask(task);
}

function clearTask(task) {
    task.value = '';
}

function DeleteTask() {
    this.parentElement.remove();
}

function initNewElement(element, newTask) {
    const addTime = format(new Date(), 'MM/dd/yyyy');
    element.querySelector('.todo__text').innerHTML = newTask; // изменить клонированный элемент
    element.querySelector('.todo__text-time').innerHTML = addTime;
    element.querySelector('.todo__checkbox-input').checked = false; // изменить клонированный элемент
    element.style.backgroundColor = '#ffffff';
}
