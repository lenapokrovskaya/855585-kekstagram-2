import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';
import {debounce} from './util.js';

const POST_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFiltersForm = document.querySelector('.img-filters__form');
const buttonsElements = imgFiltersForm.querySelectorAll('.img-filters__button');

const updatePosts = debounce((posts) => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((el) => el.remove());
  createFragment(posts);
  renderModal(posts);
}, RERENDER_DELAY);

const onChangeFilterPosts = (pictures) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const targetButton = evt.target.closest('.img-filters__button');
    if (targetButton) {
      buttonsElements.forEach((el) => el.classList.remove('img-filters__button--active'));
      targetButton.classList.add('img-filters__button--active');

      switch (evt.target.id) {
        case 'filter-default':
          updatePosts(pictures);
          break;

        case 'filter-random':
          updatePosts(pictures.toSorted(() => 0.5 - Math.random()).slice(0, POST_COUNT));
          break;

        case 'filter-discussed':
          updatePosts(pictures.toSorted((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length));
          break;
      }
    }
  });
};

export {onChangeFilterPosts};

