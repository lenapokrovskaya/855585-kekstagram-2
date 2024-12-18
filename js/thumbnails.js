const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainerElement = document.querySelector('.pictures');
const pictureFragmentElement = document.createDocumentFragment();

//Функция создания перевью
const createThumbnailElement = function (picture) {
  const pictureThumbnailElement = pictureTemplateElement.cloneNode(true);
  const pictureImageElement = pictureThumbnailElement.querySelector('.picture__img');
  pictureThumbnailElement.href = picture.url;
  pictureThumbnailElement.dataset.id = picture.id;
  pictureImageElement.src = picture.url;
  pictureImageElement.alt = picture.description;
  pictureThumbnailElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureThumbnailElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureThumbnailElement;
};

//Проходимся по массиву данных и создадим первью для каждого элемента функцией
const createFragmentElement = function (data) {
  data.forEach((picture) => {
    const pictureThumbnailElement = createThumbnailElement(picture);
    pictureFragmentElement.appendChild(pictureThumbnailElement);
  });

  pictureContainerElement.appendChild(pictureFragmentElement);
};

export {createFragmentElement};
