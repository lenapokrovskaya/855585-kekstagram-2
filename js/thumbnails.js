const templateElement = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');
const fragmentElement = document.createDocumentFragment();

//Функция создания перевью
const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnailElement = templateElement.cloneNode(true);
  const imageElement = thumbnailElement.querySelector('.picture__img');
  thumbnailElement.setAttribute('href','');
  thumbnailElement.setAttribute('data-picture-id', id);
  imageElement.setAttribute('src', url);
  imageElement.setAttribute('alt', description);
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  return thumbnailElement;
};

//Проходимся по массиву данных и создадим первью для каждого элемента функцией
const createFragment = (posts) => {
  posts.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    fragmentElement.appendChild(thumbnailElement);
  });

  containerElement.appendChild(fragmentElement);
};

export {createFragment};
