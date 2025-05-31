import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

function updateTodoCounter(increment) {
  todoCounter.updateCompleted(increment);
}

function updateTodoTotal(increment) {
  todoCounter.updateTotal(increment);
}

function handleDeleteTodo(todoElement) {
  if (todoElement) {
    todoCounter.updateTotal(false);
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", updateTodoCounter, handleDeleteTodo);
  const todoElement = todo.getView();

  return todoElement;
};

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    const name = data.name;
    const dateInput = data.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    updateTodoTotal(true);
    section.addItem(generateTodo(values));
    addTodoPopup.close(addTodoPopupEl);
    todoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
