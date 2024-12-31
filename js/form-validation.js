const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const descriptionInutElement = imgUploadFormElement.querySelector('.text__description');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/;

//Создали объект и передали конфиг
const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

//Проверка длины комментария
const validatesCommentLength = (value) => value.length >= 0 && value.length <= MAX_COMMENT_LENGTH;

const getValues = (value) => value.toLowerCase().trim().split(' ');

//Проверка валиден ли хэштег
const validatesHashtagWithRegex = (value) => {
  const values = getValues(value);
  const isValid = values.every((item) => hashtagRegex.test(item));
  return isValid || value.toLowerCase().trim().length === 0;
};

//Проверка на ввод не более 5 хэштегов
const validatesHashtagCount = (value) => getValues(value).length <= MAX_HASHTAGS;

//Проверка на повтор хэштегов
const validatesHashtagRepeats = (value) => {
  const duplicates = getValues(value).filter((number, index, numbers) =>
    numbers.indexOf(number) !== index);
  return duplicates.length === 0;
};

pristine.addValidator(hashtagsInputElement, validatesHashtagCount, 'Превышено количество хэштегов');
pristine.addValidator(hashtagsInputElement, validatesHashtagWithRegex, 'Введён невалидный хэштег');
pristine.addValidator(hashtagsInputElement, validatesHashtagRepeats, 'Хэштеги повторяются');
pristine.addValidator(descriptionInutElement, validatesCommentLength, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    evt.target.submit();
  }
};

export {onFormSubmit};

