import { createFragment } from './thumbnails.js';
import { renderModal } from './modal.js';
import { showDataError, showError, showSuccess } from './notifications.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные.',
  SEND_DATA: 'Не удалось отправить форму.',
};

const bodyElement = document.body;
const imgUploadFormElement = bodyElement.querySelector('.img-upload__form');
const templateDataErrorElement = bodyElement.querySelector('#data-error').content.querySelector('.data-error');
const dataErrorElement = templateDataErrorElement.cloneNode(true);
const templateErrorElement = bodyElement.querySelector('#error').content.querySelector('.error');
const errorElement = templateErrorElement.cloneNode(true);


//Получаем данные с сервера
const getData = () => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText.GET_DATA);
      }
      return response.json();
    })
    .then((posts) => {
      createFragment(posts);
      renderModal(posts);
    })
    .catch(() => {
      showDataError(dataErrorElement);
      setTimeout(() => {
        dataErrorElement.remove();
      }, 5000);
    });
};

//Отправляем данные формы на сервер
const sendData = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(ErrorText.SEND_DATA);
    }

    // const json = await response.json();
    showSuccess();
    imgUploadFormElement.reset();
  } catch {
    showError(errorElement);
  }
};


export {getData, sendData};
