import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchImages';
import { onGaleryCards } from './js/createCards';

const formEl = document.getElementById('search-form');
const inputFormEl = document.querySelector('.search-form input');
const formButtonEl = document.querySelector('.search-form button');
const galleryEl = document.querySelector('.gallery');
const buttonLoadMoreEl = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
buttonLoadMoreEl.addEventListener('click', onBtnLoadMoreClick);

const perPage = 40;
let page = 1;
let name = '';
buttonLoadMoreEl.style.display = 'none';

function onFormSubmit(event) {
  event.preventDefault();
  page = 1;
  name = inputFormEl.value.trim();
  clearInputFormE();

  if (name === '') {
    return Notiflix.Notify.failure('Please specify your search query.');
  }

  fetchImages(name, page, perPage)
    .then(({ data }) => {
      galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));
      if (data.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      onSimpleLightbox();

      if (page > Math.floor(data.totalHits / perPage)) {
        return Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }

      buttonLoadMoreEl.style.display = 'block';
    })
    .catch(error => console.log(error));
}

function onBtnLoadMoreClick() {
  page += 1;
  fetchImages(name, page, perPage)
    .then(({ data }) => {
      galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));

      onSimpleLightbox();

      if (page > Math.floor(data.totalHits / perPage)) {
        buttonLoadMoreEl.style.display = 'none';
        return Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function onSimpleLightbox() {
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  }).refresh();
}

function clearInputFormE() {
  galleryEl.innerHTML = '';
  page = 1;
  buttonLoadMoreEl.style.display = 'none';
}
