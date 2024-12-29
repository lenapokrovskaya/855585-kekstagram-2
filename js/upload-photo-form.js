import {isEscapeKey} from './util';
import {onFormSubmit} from './form-validation';

const bodyElement = document.body;
const imgUploadFormElement = bodyElement.querySelector('.img-upload__form');
const imgUploadFormInput = imgUploadFormElement.querySelector('.img-upload__input');
const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement = imgUploadFormElement.querySelector('.text__description');
const imgUploadOverlay = imgUploadFormElement.querySelector('.img-upload__overlay');
const buttonUploadCancel = imgUploadFormElement.querySelector('.img-upload__cancel');

//Функция-обработчик закрытия формы по ESC
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsInputElement || document.activeElement === descriptionInutElement) {
      evt.stopPropagation();
    } else {
      closeUploadForm();
      imgUploadFormElement.reset();
    }
  }
};

//Функция закрытия формы по нажатию на кнопку
const onCloseButtonClick = () => closeUploadForm();

//Закрытие формы загрузки
function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadFormElement.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonUploadCancel.removeEventListener('click', onCloseButtonClick);
  imgUploadFormInput.value = '';
}

//Открытие формы загрузки
const openUploadForm = () => {
  imgUploadFormInput.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    imgUploadFormElement.addEventListener('submit', onFormSubmit);//почему из без вызова работает
    document.addEventListener('keydown', onDocumentKeydown);
    buttonUploadCancel.addEventListener('click', onCloseButtonClick);
  });
};

export {openUploadForm};
