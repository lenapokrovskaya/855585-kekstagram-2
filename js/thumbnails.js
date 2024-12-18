const templateElement = document.querySelector('#picture').content.querySelector('.picture');
const containerElement = document.querySelector('.pictures');
const fragmentElement = document.createDocumentFragment();

//Функция создания перевью
const createThumbnail = (picture) => {
  const thumbnailElement = templateElement.cloneNode(true);
  const imageElement = thumbnailElement.querySelector('.picture__img');
  thumbnailElement.href = picture.url;
  thumbnailElement.dataset.id = picture.id;
  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  thumbnailElement.querySelector('.picture__likes').textContent = picture.likes;
  thumbnailElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return thumbnailElement;
};

//Проходимся по массиву данных и создадим первью для каждого элемента функцией
const createFragment = (data) => {
  data.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    fragmentElement.appendChild(thumbnailElement);
  });

  containerElement.appendChild(fragmentElement);
};

export {createFragment};
