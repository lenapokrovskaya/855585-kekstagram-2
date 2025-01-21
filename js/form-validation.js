import {sendData} from './api.js';
import {showError, showSuccess} from './notifications.js';
import {closeUploadForm} from './upload-photo-form.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const bodyElement = document.body;
const imgUploadFormElement = bodyElement.querySelector('.img-upload__form');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');
const templateErrorElement = bodyElement.querySelector('#error').content.querySelector('.error');
const errorElement = templateErrorElement.cloneNode(true);

const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement = imgUploadFormElement.querySelector('.text__description');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

//Создали объект и передали конфиг
const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

//Проверка длины комментария
const validatesCommentLength = (value) => value.length >= 0 && value.length <= MAX_COMMENT_LENGTH;

const getValues = (value) => value.trim().split(/ +/g);

//Проверка валиден ли хэштег
const validatesHashtagWithRegex = (value) => {
  const values = getValues(value);
  const isValid = values.every((item) => hashtagRegex.test(item));
  return isValid || value.trim().length === 0;
};

//Проверка на ввод не более 5 хэштегов
const validatesHashtagCount = (value) => getValues(value).length <= MAX_HASHTAGS;

//Проверка на повтор хэштегов
const validatesHashtagRepeats = (value) => {
  const duplicates = getValues(value.toLowerCase()).filter((number, index, numbers) =>
    numbers.indexOf(number) !== index);
  return duplicates.length === 0;
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const setUserFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    const sendDataPromise = sendData(formData);
    sendDataPromise
      .then(() => {
        imgUploadFormElement.reset();
        showSuccess();
        closeUploadForm();
      })
      .catch(() => {
        showError(errorElement);
      })
      .finally(unblockSubmitButton);
  }
};

const resetValidator = () => pristine.reset();

pristine.addValidator(hashtagsInputElement, validatesHashtagCount, 'Превышено количество хэштегов');
pristine.addValidator(hashtagsInputElement, validatesHashtagWithRegex, 'Введён невалидный хэштег');
pristine.addValidator(hashtagsInputElement, validatesHashtagRepeats, 'Хэштеги повторяются');
pristine.addValidator(descriptionInutElement, validatesCommentLength, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

export {setUserFormSubmit, resetValidator};
