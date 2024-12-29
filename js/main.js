import {createPosts} from './data.js';
import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';
import {openUploadForm} from './upload-photo-form.js';


const posts = createPosts();
createFragment(posts);
renderModal(posts);
openUploadForm();

