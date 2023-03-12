import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MyAPI } from './js/MyAPI';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  loadBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};
const { form, input, loadBtn, gallery } = refs;

let pageNumber = 1;
let perPage = 40;

const myApi = new MyAPI();

const handleSubmit = event => {
  event.preventDefault();

  const { query } = event.currentTarget.elements;
  myApi.query = query.value.trim();

  if (myApi.query === '') {
    Notify.warning('Enter something!');
    return;
  }

  list.innerHTML = '';
  myApi.page = 1;

  // scrollAndLoadMore();
};

form.addEventListener('submit', handleSubmit);
// loadBtn.addEventListener('click', loadMore);
