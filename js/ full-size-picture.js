import {renderComments} from './comments';
const bigPictureElement = document.body.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');


//Функция отрисовки поста в молаьном окне
const renderBigPicture = (picture) => {
  imageElement.src = picture.url;
  likesElement.textContent = picture.likes;
  commentTotalCountElement.textContent = picture.comments.length;
  descriptionElement.textContent = picture.description;
  renderComments(picture);
};

export {renderBigPicture};
