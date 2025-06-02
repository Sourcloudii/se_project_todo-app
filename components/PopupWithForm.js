import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupEl.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupEl.querySelectorAll(".popup__input");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

    const values = this._getInputValues();

      this._handleFormSubmit(values);
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
}

export default PopupWithForm;
