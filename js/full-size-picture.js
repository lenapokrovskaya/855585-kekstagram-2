import {renderComments} from './comments.js';
const bigPictureElement = document.body.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');


//Функция отрисовки поста в модальном окне
const renderBigPicture = ({url, likes, comments, description}) => {
  imageElement.setAttribute('src', url);
  likesElement.textContent = likes;
  commentTotalCountElement.textContent = comments.length;
  descriptionElement.textContent = description;
  renderComments(comments);
};

export {renderBigPicture};
