import {createThumbnails} from './thumbnails.js';
import {debounce} from './util.js';

const POST_COUNT = 10;

const imgFiltersFormElement = document.querySelector('.img-filters__form');
const imageFiltersButtonElements = imgFiltersFormElement.querySelectorAll('.img-filters__button');

const activateFilterButton = (button) => {
  imageFiltersButtonElements.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
};

imageFiltersButtonElements.forEach((button) => {
  button.addEventListener('click', () => {
    activateFilterButton(button);
  });
});

const updatePosts = debounce((posts) => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((el) => el.remove());
  createThumbnails(posts);
});

const onChangeFilterPosts = (pictures) => {
  imgFiltersFormElement.addEventListener('click', (evt) => {
    const targetButtonElement = evt.target.closest('.img-filters__button');
    if (targetButtonElement) {
      switch (evt.target.id) {
        case 'filter-random':
          updatePosts(pictures.toSorted(() => 0.5 - Math.random()).slice(0, POST_COUNT));
          break;

        case 'filter-discussed':
          updatePosts(pictures.toSorted((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length));
          break;

        default:
          updatePosts(pictures);
          break;
      }
    }
  });
};

export {onChangeFilterPosts};
