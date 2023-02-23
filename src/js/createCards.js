export function onGaleryCards(hits) {
  const cards = hits
    .map(hit => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = hit;
      return ` <a class="gallery-item" href = ${largeImageURL} onclick="return false;>
      <div class="photo-card">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes</b> ${likes}</p>
        <p class="info-item"><b>Views</b> ${views}</p>
        <p class="info-item"><b>Comments</b> ${comments}</p>
        <p class="info-item"><b>Downloads</b> ${downloads}</p>
      </div>
    </div></a>`;
    })
    .join('');

  return cards;
}
