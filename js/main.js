import {createPosts} from './data.js';
import {createFragment} from './thumbnails.js';
import {renderModal} from './modal.js';


const posts = createPosts();
createFragment(posts);
renderModal(posts);

