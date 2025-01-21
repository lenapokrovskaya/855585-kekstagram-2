const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarElement = document.querySelector('.img-upload__preview img');
const avatarPreviews = document.querySelectorAll('.effects__preview');
const uploadFileInputElement = document.querySelector('#upload-file');

const onFileInputChange = () => {
  uploadFileInputElement.addEventListener('change', () => {
    const file = uploadFileInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      avatarElement.src = URL.createObjectURL(file);
      avatarPreviews.forEach((el) => el.style.setProperty('background-image', `url(${URL.createObjectURL(file)})`));
    }
  });
};

export {onFileInputChange};
