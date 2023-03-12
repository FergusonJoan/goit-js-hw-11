import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { myAPI } from './js/myAPI';

const refs = {
  form: document.querySelector('.search-form'),
  input: form.firstElementChild,
  btnSearch: form.lastElementChild,
  btnLoad: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};
const { form, input, btnSearch, btnLoad, gallery } = refs;

let pageNumber = 1;
let perPage = 40;

const myAPI = new myAPI();

const handleSubmit = event => {
  event.preventDefault();

  const { query } = event.currentTarget.elements;
  getImages.query = query.value.trim();

  if (unsplashApi.query === '') {
    Notify.warning('Enter some word!');
    return;
  }

  list.innerHTML = '';
  unsplashApi.page = 1;

  // scrollAndLoadMore();
};
