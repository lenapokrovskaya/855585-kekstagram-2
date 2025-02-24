import {isEscapeKey} from './util.js';
import {onSliderEffectsChange, resetPhotoEditor} from './photo-editor.js';
import {resetValidator, onUserFormSubmit} from './form-validation.js';

const bodyElement = document.body;
const imgUploadFormElement = bodyElement.querySelector('.img-upload__form');
const imgUploadFormInputElement = imgUploadFormElement.querySelector('.img-upload__input');
const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement = imgUploadFormElement.querySelector('.text__description');
const imgUploadOverlay = imgUploadFormElement.querySelector('.img-upload__overlay');
const buttonUploadCancelElement = imgUploadFormElement.querySelector('.img-upload__cancel');
const effectsElement = imgUploadFormElement.querySelector('.img-upload__effects');

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

const onCloseButtonClick = () => closeUploadForm();

function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonUploadCancelElement.removeEventListener('click', onCloseButtonClick);
  imgUploadFormElement.removeEventListener('submit', onUserFormSubmit);
  resetPhotoEditor();
  resetValidator();
}

const openUploadForm = () => {
  imgUploadFormInputElement.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    imgUploadFormElement.addEventListener('submit', onUserFormSubmit);
    document.addEventListener('keydown', onDocumentKeydown);
    buttonUploadCancelElement.addEventListener('click', onCloseButtonClick);
    effectsElement.addEventListener('change', onSliderEffectsChange);
  });
};

export {openUploadForm, closeUploadForm, onDocumentKeydown};
