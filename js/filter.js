import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';
import {getRandomArrayElement} from './util.js';
import {debounce} from './util.js';

const POST_COUNT = 10;
const RERENDER_DELAY = 500;

const imgFiltersForm = document.querySelector('.img-filters__form');
const buttonsElements = imgFiltersForm.querySelectorAll('.img-filters__button');

const getRandomPosts = (postArray) =>
  postArray.slice(0, POST_COUNT).map(() => getRandomArrayElement(postArray));

const updatePosts = (posts) => {
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((el) => el.remove());
  createFragment(posts);
  renderModal(posts);
};

const onChangeFilterPosts = (data) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    const targetButton = evt.target.closest('.img-filters__button');
    if (targetButton) {
      buttonsElements.forEach((el) => el.classList.remove('img-filters__button--active'));
      targetButton.classList.add('img-filters__button--active');

      switch (evt.target.id) {
        case 'filter-default':
          debounce(() => updatePosts(data), RERENDER_DELAY)();
          break;

        case 'filter-random':
          debounce(() => updatePosts(getRandomPosts(data), RERENDER_DELAY))();
          break;

        case 'filter-discussed':
          debounce(() => updatePosts(data.toSorted((a, b) => b.comments.length - a.comments.length)), RERENDER_DELAY)();
          break;
      }
    }
  });
};

export {getRandomPosts, onChangeFilterPosts};
