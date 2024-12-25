const STEP_COMMENTS = 5;
let currentCommentCount = 0;
let currentPostComments = [];

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsElement.querySelector('.social__comment');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
socialCommentsElement.innerHTML = '';

//Функция создания комментария
const renderComment = ({avatar, name, message}) => {
  const clonedCommentElement = socialCommentElement.cloneNode(true);
  const commentPictureElement = clonedCommentElement.querySelector('.social__picture');
  const commentTextElement = clonedCommentElement.querySelector('.social__text');
  commentPictureElement.src = avatar;
  commentPictureElement.alt = name;
  commentTextElement.textContent = message;
  return clonedCommentElement;
};

//Функция отрисовки показываемых комментариев частями
const renderShownComments = () => {
  const fragmentElement = document.createDocumentFragment();
  const shownComments = currentPostComments.slice(currentCommentCount, currentCommentCount + STEP_COMMENTS);
  const shownCommentsLength = shownComments.length + currentCommentCount;

  shownComments.forEach((comment) => {
    const commentElement = renderComment(comment);
    fragmentElement.appendChild(commentElement);
  });

  socialCommentsElement.appendChild(fragmentElement);
  commentShownCountElement.textContent = shownCommentsLength;
  commentTotalCountElement.textContent = currentPostComments.length;
  commentsLoaderElement.classList.toggle('hidden', shownCommentsLength >= currentPostComments.length);
  currentCommentCount += STEP_COMMENTS;
};

//Функция отрисовки и обновления по клику количества комментариев
const renderComments = (comments) => {
  currentPostComments = comments;
  renderShownComments();
  commentsLoaderElement.addEventListener('click', renderShownComments);
};

//Функция очистки комментариев
const clearComments = () => {
  currentCommentCount = 0;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', renderShownComments);
};

export {renderComments, clearComments};
