import {createPosts} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();

//Функция создания перевью
const createThumbnail = function (picture) {
  const pictureThumbnail = pictureTemplate.cloneNode(true);
  const pictureImage = pictureThumbnail.querySelector('.picture__img');
  pictureThumbnail.href = picture.url;
  pictureThumbnail.dataset.id = picture.id;
  pictureImage.src = picture.url;
  pictureImage.alt = picture.description;
  pictureThumbnail.querySelector('.picture__likes').textContent = picture.likes;
  pictureThumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureThumbnail;
};

//Создадаем массив данных для превью
const mokedPictures = createPosts();

//Проходимся по массиву и создадим первью для каждого элемента функцией
mokedPictures.forEach((picture) => {
  const pictureThumbnail = createThumbnail(picture);
  pictureFragment.appendChild(pictureThumbnail);
});

pictureContainer.appendChild(pictureFragment);
