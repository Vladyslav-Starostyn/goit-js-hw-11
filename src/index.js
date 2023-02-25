import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetchImages';
import { onGaleryCards } from './js/createCards';

const formEl = document.getElementById('search-form');
const inputFormEl = document.querySelector('.search-form input');
const galleryEl = document.querySelector('.gallery');
const buttonLoadMoreEl = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
buttonLoadMoreEl.addEventListener('click', onBtnLoadMoreClick);

const options = {
  perPage: 40,
  page: 1,
  name: '',
};

function onFormSubmit(event) {
  event.preventDefault();
  options.page = 1;
  options.name = inputFormEl.value.trim();
  clearInputFormE();

  if (options.name === '') {
    return Notiflix.Notify.failure('Please specify your search query.');
  }

  fetchImages(options)
    .then(({ data }) => {
      galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));
      if (data.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      onSimpleLightbox();

      if (options.page > Math.floor(data.totalHits / options.perPage)) {
        return Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      buttonLoadMoreEl.classList.remove('is-hidden');
    })
    .catch(error => console.log(error));
}

function onBtnLoadMoreClick() {
  options.page += 1;
  fetchImages(options)
    .then(({ data }) => {
      galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));

      onSimpleLightbox();

      if (options.page > Math.floor(data.totalHits / options.perPage)) {
        buttonLoadMoreEl.classList.add('is-hidden');
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
  options.page = 1;
  buttonLoadMoreEl.classList.add('is-hidden');
}
