import {isEscapeKey} from './util.js';
import {onSliderEffectsChange, resetPhotoEditor} from './photo-editor.js';
import {resetValidator, setUserFormSubmit} from './form-validation.js';

const bodyElement = document.body;
const imgUploadFormElement = bodyElement.querySelector('.img-upload__form');
const imgUploadFormInputElement = imgUploadFormElement.querySelector('.img-upload__input');
const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement = imgUploadFormElement.querySelector('.text__description');
const imgUploadOverlay = imgUploadFormElement.querySelector('.img-upload__overlay');
const buttonUploadCancelElement = imgUploadFormElement.querySelector('.img-upload__cancel');
const effectsElement = imgUploadFormElement.querySelector('.img-upload__effects');

//Функция-обработчик закрытия формы по ESC
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsInputElement || document.activeElement === descriptionInutElement) {
      evt.stopPropagation();
      return;
    }

    const errorModal = document.querySelector('.error');
    if (errorModal) {
      return;
    }

    closeUploadForm();
    imgUploadFormElement.reset();
  }
};

//Функция закрытия формы по нажатию на кнопку
const onCloseButtonClick = () => closeUploadForm();

//Закрытие формы загрузки
function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonUploadCancelElement.removeEventListener('click', onCloseButtonClick);
  resetPhotoEditor();
  resetValidator();
}

//Открытие формы загрузки
const openUploadForm = () => {
  imgUploadFormInputElement.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    imgUploadFormElement.addEventListener('submit', setUserFormSubmit);
    document.addEventListener('keydown', onDocumentKeydown);
    buttonUploadCancelElement.addEventListener('click', onCloseButtonClick);
    effectsElement.addEventListener('change', onSliderEffectsChange);
  });
};

export {openUploadForm, closeUploadForm, onDocumentKeydown};
