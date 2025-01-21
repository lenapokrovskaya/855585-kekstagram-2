import {isEscapeKey} from './util.js';

const bodyElement = document.body;
const fragmentElement = document.createDocumentFragment();
const templateErrorElement = bodyElement.querySelector('#error').content.querySelector('.error');
const errorElement = templateErrorElement.cloneNode(true);
const errorButtonElement = errorElement.querySelector('.error__button');
const errorBlockElement = errorElement.querySelector('.error__inner');

const templateSuccessElement = bodyElement.querySelector('#success').content.querySelector('.success');
const successElement = templateSuccessElement.cloneNode(true);
const successButtonElement = successElement.querySelector('.success__button');
const successBlockElement = successElement.querySelector('.success__inner');

const showDataError = (error) => {
  fragmentElement.appendChild(error);
  bodyElement.append(fragmentElement);
};

// Функция для удаления сообщения и обработчиков
const closeMessageBox = (element, onEscClick, onOverlayClick) => {
  element.remove();
  document.removeEventListener('keydown', onEscClick);
  document.removeEventListener('click', onOverlayClick);
};

// Обработчик закрытия окна сообщения по клику
const onClickCloseMessage = (element, onEscClick, onOverlayClick) => {
  closeMessageBox(element, onEscClick, onOverlayClick);
};

// Обработчик закрытия окна сообщения по Esc
function onEscCloseMessage(evt, element, onEscClick, onOverlayClick) {
  if (isEscapeKey(evt)) {
    closeMessageBox(element, onEscClick, onOverlayClick);
  }
}

// Обработчик закрытия окна сообщения по нажатию на оверлэй
function onOverlayCloseMessage(evt, messageBlock, element, onEscClick, onOverlayClick) {
  if (!messageBlock.contains(evt.target)) {
    closeMessageBox(element, onEscClick, onOverlayClick);
  }
}

// Показ сообщения об ошибке
const showError = () => {
  fragmentElement.appendChild(errorElement);
  bodyElement.append(fragmentElement);

  // Обработчики для Esc и клика на оверлэй
  function onEscClick(evt) {
    onEscCloseMessage(evt, errorElement, onEscClick, onOverlayClick);
  }

  function onOverlayClick(evt) {
    onOverlayCloseMessage(evt, errorBlockElement, errorElement, onEscClick, onOverlayClick);
  }

  errorButtonElement.addEventListener('click', () => onClickCloseMessage(errorElement, onEscClick, onOverlayClick));
  document.addEventListener('keydown', onEscClick);
  document.addEventListener('click', onOverlayClick);
};

// Показ сообщения об успехе
const showSuccess = () => {
  fragmentElement.appendChild(successElement);
  bodyElement.append(fragmentElement);

  // Обработчики для Esc и клика на оверлэй
  function onEscClick(evt) {
    onEscCloseMessage(evt, successElement, onEscClick, onOverlayClick);
  }

  function onOverlayClick(evt) {
    onOverlayCloseMessage(evt, successBlockElement, successElement, onEscClick, onOverlayClick);
  }

  successButtonElement.addEventListener('click', () => onClickCloseMessage(successElement, onEscClick, onOverlayClick));
  document.addEventListener('keydown', onEscClick);
  document.addEventListener('click', onOverlayClick);
};

export {showDataError, showError, showSuccess};
