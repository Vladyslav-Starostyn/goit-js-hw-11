import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

import { fetchImages } from './js/fetchImages';
import { onGaleryCards } from './js/createCards';

const formEl = document.getElementById('search-form');
const inputFormEl = document.querySelector('.search-form input');
const formButtonEl = document.querySelector('.search-form button');
const galleryEl = document.querySelector('.gallery');
const buttonLoadMoreEl = document.querySelector('.load-more');

console.log(formEl);
console.log(inputFormEl);
console.log(formButtonEl);
console.log(galleryEl);
console.log(buttonLoadMoreEl);

const perPage = 40;
let page = 1;
let name = '';
let totalHits = 0;

buttonLoadMoreEl.style.display = 'none';

formEl.addEventListener('submit', onFormSubmit);
buttonLoadMoreEl.addEventListener('click', onBtnLoadMoreClick);

function onFormSubmit(event) {
  event.preventDefault();
  page = 1;
  name = inputFormEl.value.trim();
  clearInputFormE();
  buttonLoadMoreEl.style.display = 'block';
  if (name === '') {
    return;
  }

  fetchImages(name, page, perPage)
    .then(({ data }) => {
      galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

      new SimpleLightbox('.gallery a', {
        captionDelay: 250,
      }).refresh();

      if (data.totalHits < perPage) {
        buttonLoadMoreEl.style.display = 'none';
      }
    })
    .catch(error => console.log(error));
}

function onBtnLoadMoreClick() {
  page += 1;
  fetchImages(name, page, perPage)
    .then(({ data }) => {
      galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));

      new SimpleLightbox('.gallery a', {
        captionDelay: 250,
      }).refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        buttonLoadMoreEl.style.display = 'none';
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function clearInputFormE() {
  galleryEl.innerHTML = '';
  page = 1;
  buttonLoadMoreEl.style.display = 'none';
}
