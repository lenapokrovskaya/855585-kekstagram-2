import {isEscapeKey} from './util';

const bodyElement = document.body;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const buttonUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtag = imgUploadForm.querySelector('.text__hashtags');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: '.img-upload__field-wrapper--error'
  //text-error как errorTextClass?
});

//Проверка длины комментария
function validateTextDescription (value) {
  return value.length >= 0 && value.length <= 140;
}
pristine.addValidator(imgUploadForm.querySelector('.text__description'), validateTextDescription, 'Длина комментария больше 140 символов');

//Проверка валиден ли хэштег регуляркой
function validateHashtag (value) {
  //Тут надо реализовать проверку, на пустоту поля после орезки пробелов trim();
  if (value.includes(' #')) {
    const values = value.split(' ');
    const checkedValues = [];
    values.forEach((item) => {
      const checkedValue = hashtagRegex.test(item.toLowerCase());
      checkedValues.push(checkedValue);
    });

    const isVal = !checkedValues.includes(false);
    return isVal;
  } else {
    return value.length === 0 || hashtagRegex.test(value.toLowerCase());
  }
}

pristine.addValidator(hashtag, validateHashtag, 'Введён невалидный хэштег');

//Проверка не более 5 хэштегов
function validateHashtagCount (value) {
  if (value.includes(' #')) {
    const maxCount = 5;
    const values = value.split(' ');
    const checkedValues = [];
    values.forEach((item) => {
      checkedValues.push(item);
    });

    return checkedValues.length <= maxCount;
  } else {
    return true;
  }
}

pristine.addValidator(hashtag, validateHashtagCount, 'Превышено количество хэштегов');

//Проверка на повтор хэштегов
function validateHashtagRepeat (value) {
  if (value.includes(' #')) {
    const values = value.split(' ');
    const checkedValues = [];
    values.forEach((item) => {
      const checkedValue = item.toLowerCase().replace(/#/, '');
      checkedValues.push(checkedValue);
    });
    const duplicates = checkedValues.filter((number, index, numbers) => {
      return numbers.indexOf(number) !== index;
    });
    return duplicates.length === 0;
  } else {
    return true;
  }
}

pristine.addValidator(hashtag, validateHashtagRepeat, 'Хэштеги повторяются');


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    evt.target.submit();
  }
});

///Доделать - выделить в функции
imgUploadInput.addEventListener('change', () => {
  openUploadForm();
});

buttonUploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    //добпать stopprop по условию
    closeUploadForm();
  }
};

//Открытие формы загрузки
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  //добавить обработчики по клику и keydown
  document.addEventListener('keydown', onDocumentKeydown);
};

//Закрытие формы загрузки
function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  //добавить удаление обработчиков
  imgUploadInput.value = '';
}

