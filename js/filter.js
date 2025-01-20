import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';
import {debounce} from './util.js';

const POST_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFiltersForm = document.querySelector('.img-filters__form');
const buttonsElements = imgFiltersForm.querySelectorAll('.img-filters__button');

const updatePosts = (posts) => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((el) => el.remove());
  createFragment(posts);
  renderModal(posts);
};

const onChangeFilterPosts = (pictures) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const targetButton = evt.target.closest('.img-filters__button');
    if (targetButton) {
      buttonsElements.forEach((el) => el.classList.remove('img-filters__button--active'));
      targetButton.classList.add('img-filters__button--active');

      switch (evt.target.id) {
        case 'filter-default':
          debounce(() => updatePosts(pictures), RERENDER_DELAY)();
          break;

        case 'filter-random':
          debounce(() => updatePosts(pictures.toSorted(() => 0.5 - Math.random()).slice(0, POST_COUNT)), RERENDER_DELAY)();
          break;

        case 'filter-discussed':
          debounce(() => updatePosts(pictures.toSorted((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length)), RERENDER_DELAY)();
          break;
      }
    }
  });
};

export {onChangeFilterPosts};
