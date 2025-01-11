const STEP_SCALE = 25;
const MAX_SCALE = 100;

const previewElement = document.querySelector('.img-upload__preview-container');
const scaleControlSmallerElement = previewElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = previewElement.querySelector('.scale__control--bigger');
const scaleControlInputElement = previewElement.querySelector('.scale__control--value');

const imageElement = previewElement.querySelector('.img-upload__preview img');
const sliderContainerElement = previewElement.querySelector('.img-upload__effect-level');
const effectValue = previewElement.querySelector('.effect-level__value');
const sliderElement = previewElement.querySelector('.effect-level__slider');
const effectsButtons = document.querySelectorAll('.effects__radio');

const effectsOptions = {
  chrome: {
    min: 0.1,
    max: 1,
    start: 1,
    step: 0.1,
    property: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0.1,
    max: 1,
    start: 1,
    step: 0.1,
    property: 'sepia',
    unit: '',
  },
  marvin: {
    min: 1,
    max: 100,
    start: 100,
    step: 1,
    property: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    property: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    property: 'brightness',
    unit: '',
  },
};

//Редактирование масштаба фото
let currentScale = Number(scaleControlInputElement.value.slice(0, -1));

const updateCurrentScale = () => {
  scaleControlInputElement.value = `${currentScale}%`;
  if (currentScale === MAX_SCALE) {
    imageElement.style.transform = 'scale(1)';
  } else {
    imageElement.style.transform = `scale(0.${currentScale})`;
  }
};

const onSmallerControlClick = () => {
  if (currentScale > STEP_SCALE) {
    currentScale -= STEP_SCALE;
    updateCurrentScale();
  }
};

const onBiggerControlClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP_SCALE;
    updateCurrentScale();
  }
};

//Создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 1,
    max: 10,
  },
  start: 10,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderContainerElement.classList.add('hidden');

//Функция для обновления настроек эффекта
const updateSliderOptions = (effectOptions) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectOptions.min,
      max: effectOptions.max,
    },
    start: effectOptions.start,
    step: effectOptions.step,
  });
};

//Функция обновления стилей эффекта
const updateSliderValue = (cssProperty, cssUnit) => {
  imageElement.style.filter = `${cssProperty}(${effectValue.value}${cssUnit})`;
};

//Функция применения настроек эффекта
const onSliderEffectsChange = (evt) => {
  const checkedEffectButton = evt.target.closest('.effects__radio');
  if (checkedEffectButton.value !== 'none') {
    sliderContainerElement.classList.remove('hidden');
    updateSliderOptions(effectsOptions[checkedEffectButton.value]);
  } else {
    sliderContainerElement.classList.add('hidden');
    imageElement.style.filter = '';
  }
};

//Обновение значений при перестаскивании ползунка
sliderElement.noUiSlider.on('update', () => {
  effectValue.value = sliderElement.noUiSlider.get();
  effectsButtons.forEach((button) => {
    if (button.checked) {
      if (button.value !== 'none') {
        updateSliderValue(effectsOptions[button.value].property, effectsOptions[button.value].unit);
      }
    }
  });
});

//Функция сброса фоторедактора
const resetPhotoEditor = () => {
  currentScale = MAX_SCALE;
  imageElement.style.transform = 'scale(1)';
  sliderElement.noUiSlider.reset();
  sliderContainerElement.classList.add('hidden');
  imageElement.style.filter = '';
};

scaleControlBiggerElement.addEventListener('click', onBiggerControlClick);
scaleControlSmallerElement.addEventListener('click', onSmallerControlClick);

export {onSliderEffectsChange, resetPhotoEditor};
