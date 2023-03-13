import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MyAPI } from './js/MyAPI';
// import cards from './js/renderImages';

export const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  // observedEl: document.querySelector(''),
};
const { formEl, galleryEl } = refs;

const myApi = new MyAPI();
formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  myApi.query = event.currentTarget.elements.searchQuery.value.trim();

  if (!myApi.query) {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  galleryEl.innerHTML = '';

  fetchCards();
  myApi.resetPage();
}

function fetchCards() {
  //observedEl - убирает наблюдение по этому элементу
  renderOnRequest();
}

function renderOnRequest() {
  myApi.getImages().then(({ hits, totalHits }) => {
    if (myApi.page === 1) {
      onCheckInput(totalHits);
    }
    cards(hits);
    // lightbox.refresh();
    //observedEl - начинает наблюдение по этому элементу
    if (myApi.page === Math.ceil(totalHits / 40)) {
      //observedEl - убирает наблюдение по этому элементу
      // lightbox.refresh();
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    myApi.incrementPage();
  });
}
function onCheckInput(totalHits) {
  if (myApi.query === '') {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

function cards(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        // largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>`;
      }
    )
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}
