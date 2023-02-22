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

  fetchImages(name, page, perPage).then(({ data }) => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    galleryEl.insertAdjacentHTML('beforeend', onGaleryCards(data.hits));
  });
}

function onBtnLoadMoreClick() {}

function clearInputFormE() {
  galleryEl.innerHTML = '';
  page = 1;
  buttonLoadMoreEl.style.display = 'none';
}
// fetch('https://pixabay.com/api/?key=33817651-997e7e2cbe1c3994ebc4bd75c&q=car')
//   .then(response => response.json())
//   .then(posts => console.log(posts))
//   .catch(error => console.log(error));
// axios
//   .get('https://pixabay.com/api/?key=33817651-997e7e2cbe1c3994ebc4bd75c&q=car')
//   .then(({ data }) => console.log(data));
