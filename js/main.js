import {openUploadForm, closeUploadForm} from './upload-photo-form.js';
import {setUserFormSubmit} from './form-validation.js';
import {getData} from './api.js';
import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';
import {showDataError} from './notifications.js';
import {onChangeFilterPosts} from './filter.js';

const ERROR_DISPLAY_TIME = 5000;
const templateDataErrorElement = document.querySelector('#data-error').content.querySelector('.data-error');
const dataErrorElement = templateDataErrorElement.cloneNode(true);

const imgFiltersElement = document.querySelector('.img-filters');

openUploadForm();

getData()
  .then((posts) => {
    createFragment(posts);
    renderModal(posts);
    imgFiltersElement.classList.remove('img-filters--inactive');
    onChangeFilterPosts(posts);
  })
  .catch(() => {
    showDataError(dataErrorElement);
    setTimeout(() => {
      dataErrorElement.remove();
    }, ERROR_DISPLAY_TIME);
  });


setUserFormSubmit(closeUploadForm);
