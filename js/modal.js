import {isEscapeKey} from './util.js';
import {renderBigPicture} from './full-size-picture.js';
import {clearComments} from './comments.js';

const renderModal = (posts) => {
  const bigPictureElement = document.body.querySelector('.big-picture');
  const picturesParentElement = document.querySelector('.pictures');
  const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');


  //Функция-обработчик закрытия модалки ESC
  const onModalEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  //Функция закрытия модалки
  function closeModal () {
    clearComments();
    bigPictureElement.classList.add('hidden');
    //Удаляем обработчик закрытия превью ESC
    document.removeEventListener('keydown', onModalEscKeyDown);
    //Удаляем класс,  чтобы контейнер с фото прокручивался
    document.body.classList.remove('modal-open');
  }

  //Функция закрытия модалки по нажатию на кнопку
  const onCloseButtonClick = (button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeModal();
    });
  };

  onCloseButtonClick(pictureCloseButtonElement);

  //Функция открытия модалки
  const openModal = () => {
    bigPictureElement.classList.remove('hidden');
    //Добавляем обработчик закрытия превью ESC
    document.addEventListener('keydown', onModalEscKeyDown);
    //Добавляем класс, чтобы контейнер с фото не прокручивался
    document.body.classList.add('modal-open');
  };

  //Функция обработчика клика, показывает модалку
  function onThumbnailClick (evt) {
    const currentPictureElement = evt.target.closest('.picture');
    if (currentPictureElement) {
      evt.preventDefault();
      //Находим элемент из массива постов с таким же id как у текущего элемента
      const foundedPictureByIdElement = posts.find((picture) => picture.id === Number(currentPictureElement.getAttribute('data-picture-id')));
      renderBigPicture(foundedPictureByIdElement);
      openModal();
    }
  }

  picturesParentElement.addEventListener('click', onThumbnailClick);
};

export {renderModal};
