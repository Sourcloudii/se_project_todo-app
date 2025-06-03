class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    this._popupEl.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
  this._popupEl.classList.add("popup_visible");
  document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
  this._popupEl.classList.remove("popup_visible");
  document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;
