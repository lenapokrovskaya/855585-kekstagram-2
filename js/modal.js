import {isEscapeKey} from './util.js';
import {renderBigPicture} from './full-size-picture.js';
import {clearComments} from './comments.js';

const renderModal = (posts) => {
  const bigPictureElement = document.body.querySelector('.big-picture');
  const picturesParentElement = document.querySelector('.pictures');
  const pictureCloseButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

  const onModalEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  function closeModal () {
    clearComments();
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscKeyDown);
    document.body.classList.remove('modal-open');
  }

  const onCloseButtonClick = (button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeModal();
    });
  };

  onCloseButtonClick(pictureCloseButtonElement);

  const openModal = () => {
    bigPictureElement.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscKeyDown);
    document.body.classList.add('modal-open');
  };

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
