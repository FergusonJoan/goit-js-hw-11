import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { myAPI } from './js/myAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  observedEl: document.querySelector('.sentinel'),
};
const { formEl, galleryEl, observedEl } = refs;

const myApi = new myAPI();
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
  infiniteScroll.unobserve(observedEl);
  renderOnRequest();
}

function renderOnRequest() {
  myApi.getImages().then(data => {
    console.log({ data });
    const { hits, totalHits } = data;
    if (myApi.page === 1) {
      onCheckInput(totalHits);
    }
    cards(hits);
    lightbox.refresh();

    infiniteScroll.observe(observedEl);
    myApi.resetPage();

    if (myApi.page === Math.ceil(totalHits / 40)) {
      infiniteScroll.unobserve(observedEl);

      lightbox.refresh();
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    myApi.incrementPage();
  });
}

function onCheckInput(totalHits) {
  if (myApi.query === '' || totalHits <= 2) {
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
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
        </div>
        </div>`;
      }
    )
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});
const options = { rootMargin: '250px' };
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && myApi.query !== '') {
      if (myApi.page === 1) {
        return;
      }
      renderOnRequest();
    }
  });
};
const infiniteScroll = new IntersectionObserver(onEntry, options);
infiniteScroll.observe(observedEl);
