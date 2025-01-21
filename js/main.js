import {openUploadForm} from './upload-photo-form.js';
import {getData} from './api.js';
import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';
import {showDataError} from './notifications.js';
import {onChangeFilterPosts} from './filter.js';
import {onFileInputChange} from './avatar.js';
import {debounce} from './util.js';
const RERENDER_DELAY = 500;

const ERROR_DISPLAY_TIME = 5000;
const templateDataErrorElement = document.querySelector('#data-error').content.querySelector('.data-error');
const dataErrorElement = templateDataErrorElement.cloneNode(true);

const imgFiltersElement = document.querySelector('.img-filters');

openUploadForm();

async function loadPosts() {
  try {
    const posts = await getData();
    createFragment(posts);
    renderModal(posts);
    onChangeFilterPosts(posts);
    imgFiltersElement.classList.remove('img-filters--inactive');
  } catch {
    showDataError(dataErrorElement);
    setTimeout(() => {
      dataErrorElement.remove();
    }, ERROR_DISPLAY_TIME);
  }
}

const loadContent = debounce(loadPosts, RERENDER_DELAY);
loadContent();
onFileInputChange();
