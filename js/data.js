import {getRandomInteger, createUniqueRandomInteger} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTORS = [
  'Артём',
  'Наталья',
  'Фёдор',
  'Мария',
  'Алексей',
  'Ирина',
];

const DESCRIPTIONS = [
  'Магия утра',
  'Вечерний свет',
  'Мир в кадре',
  'Летний вечер',
  'Утро на море',
  'Волшебство гор',
  'Вечерняя прогулка',
  'Лунный свет',
  'Городские просторы',
  'Ритм города',
  'Погружение в природу',
  'Мгновение спокойствия',
  'Жизнь в движении',
  'Вдохновение в кадре',
  'Красота повседневности',
  'Гармония внутри',
  'Тихий закат',
  'Яркие цвета',
  'Мечта о будущем',
  'Светлые воспоминания',
  'Вдохновение дня',
  'Очарование природы',
  'Вечерняя тишина',
  'Тепло и уют',
  'Моменты с друзьями',
];

const POST_COUNT = 25;

const LikesQuantity = {
  MIN: 1,
  MAX: 200,
};

const CommentsQuantity = {
  MIN: 0,
  MAX: 30,
};

const MessageLength = {
  MIN: 1,
  MAX: 2,
};

const AvatarsQuantity = {
  MIN: 1,
  MAX:6,
};

const maxCommentsIdQuantity = 1000;

const randomUniqueId = createUniqueRandomInteger(1, POST_COUNT);
const randomUniqueUrl = createUniqueRandomInteger(1, POST_COUNT);
const randomUniqueСommentId = createUniqueRandomInteger(1, maxCommentsIdQuantity);

//Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

//Функция, возращающая случайное число строк для комментариев
const getRandomMessageLength = () =>
  getRandomInteger(MessageLength.MIN, MessageLength.MAX);

//Функция, создающая объект комментария
const createComment = () => {
  const messagesQuantity = [];
  while (messagesQuantity.length < getRandomMessageLength()) {
    messagesQuantity.push(getRandomArrayElement(MESSAGES));
  }
  return {
    id: randomUniqueСommentId(),
    avatar: `img/avatar-${getRandomInteger(AvatarsQuantity.MIN, AvatarsQuantity.MAX)}.svg`,
    message: messagesQuantity.join(' '),
    name: getRandomArrayElement(AUTORS),
  };
};

//Функция, создающая объект поста
const createPost = () => {
  //Массив объектов комментариев
  const comments = Array.from({length: getRandomInteger(CommentsQuantity.MIN, CommentsQuantity.MAX)}, createComment);
  return {
    id: randomUniqueId(),
    url: `photos/${randomUniqueUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LikesQuantity.MIN, LikesQuantity.MAX),
    comments,
  };
};

//Функция, создающая массив объектов постов
const createPosts = () =>
  Array.from({length: POST_COUNT}, createPost);

export {createPosts};

