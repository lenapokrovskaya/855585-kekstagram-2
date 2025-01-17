import {openUploadForm, closeUploadForm} from './upload-photo-form.js';
import {setUserFormSubmit} from './form-validation.js';
import {getData} from './api.js';

getData();
openUploadForm();
setUserFormSubmit(closeUploadForm);
