import {isEscapeKey} from './util.js';
import {renderBigPicture} from './full-size-picture.js';

const renderModal = (posts) => {
  const bigPictureElement = document.body.querySelector('.big-picture');
  const picturesParentElement = document.querySelector('.pictures');
  const pictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
  const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
  const commentsLoader = bigPictureElement.querySelector('.comments-loader');

  //Функция-обработчик закрытия модалки ESC
  const onModalEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMоdal();
    }
  };

  //Функция закрытия модалки
  function closeMоdal () {
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
      closeMоdal();
    });
  };

  onCloseButtonClick(pictureCloseButton);

  //Функция открытия модалки
  const openModal = () => {
    bigPictureElement.classList.remove('hidden');
    //Добавляем обработчик закрытия превью ESC
    document.addEventListener('keydown', onModalEscKeyDown);
    //Добавляем класс, чтобы контейнер с фото не прокручивался
    document.body.classList.add('modal-open');
  };

  //Функция обработчика клика, показывает модалку
  const onThumbnailClick = (evt) => {
    const currentPictureElement = evt.target.closest('.picture');
    if (currentPictureElement) {
      evt.preventDefault();
      //Находим элемент из массива постов с таким же id как у текущего элемента
      const foundedPictureByIdElement = posts.find((picture) => picture.id === Number(currentPictureElement.dataset.pictureId));
      renderBigPicture(foundedPictureByIdElement);
      openModal();
      // Скрываем блоки счетчика комментариев и загрузки новых комментариев
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
    }
  };

  picturesParentElement.addEventListener('click', onThumbnailClick);
};

export {renderModal};
