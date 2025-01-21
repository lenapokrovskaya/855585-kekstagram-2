const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const imagePreviewElements = document.querySelectorAll('.effects__preview');
const uploadFileInputElement = document.querySelector('#upload-file');

const onFileInputChange = () => {
  uploadFileInputElement.addEventListener('change', () => {
    const file = uploadFileInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      imagePreviewElement.src = URL.createObjectURL(file);
      imagePreviewElements.forEach((el) => el.style.setProperty('background-image', `url(${URL.createObjectURL(file)})`));
    }
  });
};

export {onFileInputChange};
