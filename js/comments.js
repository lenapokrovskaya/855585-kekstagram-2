const сommentsListElement = document.querySelector('.social__comments');
const socialCommentElement = сommentsListElement.querySelector('.social__comment');
const fragmentElement = document.createDocumentFragment();

//Функция создания комментария
const renderComment = ({avatar, name, message}) => {
  const clonedCommentElement = socialCommentElement.cloneNode(true);
  const commentPictureElement = clonedCommentElement.querySelector('.social__picture');
  const commentText = clonedCommentElement.querySelector('.social__text');
  commentPictureElement.src = avatar;
  commentPictureElement.alt = name;
  commentText.textContent = message;
  return clonedCommentElement;
};

//Отрисуем массив комментариев для каждого поста
const renderComments = (comments) => {
  const postСomments = comments;
  postСomments.forEach((comment) => {
    const commentElement = renderComment(comment);
    сommentsListElement.appendChild(commentElement);
    fragmentElement.appendChild(commentElement);
  });

  сommentsListElement.innerHTML = '';
  сommentsListElement.appendChild(fragmentElement);
};


export {renderComments};

