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

const renderComment = ({avatar, name, message}) => {
  const clonedCommentElement = socialCommentElement.cloneNode(true);
  const commentPictureElement = clonedCommentElement.querySelector('.social__picture');
  const commentTextElement = clonedCommentElement.querySelector('.social__text');
  commentPictureElement.setAttribute('src', avatar);
  commentPictureElement.setAttribute('alt', name);
  commentTextElement.textContent = message;
  return clonedCommentElement;
};

const onCommentsLoaderClick = () => {
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

const renderComments = (comments) => {
  currentPostComments = comments;
  onCommentsLoaderClick();
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

const clearComments = () => {
  currentCommentCount = 0;
  socialCommentsElement.innerHTML = '';
  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

export {renderComments, clearComments};
