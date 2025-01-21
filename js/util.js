//Функция, возвращающая случайное число в заданном диапазоне (включительно)
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Функция, возвращающая уникальные значения из заданного диапазона
const createUniqueRandomInteger = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//Функция проверяющая клавиша esc или нет
const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, createUniqueRandomInteger, isEscapeKey, debounce};
