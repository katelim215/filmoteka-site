import { fetchTodayPopularMovies, fetchTrailerById } from './api';
import * as basicLightbox from 'basiclightbox';


export const onLoadMarkup = async () => {
  try {
    const { results } = await fetchTodayPopularMovies();
    renderMarkupSlider(results);
  } catch (error) {
    console.error(error.message);
  }
};

export const onLinkPlayClick = async evt => {
  evt.preventDefault();
  if (evt.target.nodeName !== 'A') return;
  try {
    const { results } = await fetchTrailerById(evt.target.dataset.id);
    const { key } = results[results.length - 1];
    const closeModal = e => {
      if (e.code === 'Escape') {
        instance.close();
      }
    };
    const instance = basicLightbox.create(
      `<iframe class="youtube-frame" width="560" height="315" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      {
        onShow: () => {
          document.addEventListener('keydown', closeModal);
        },
        onClose: () => {
          document.removeEventListener('keydown', closeModal);
        },
      }
    );

    instance.show();
  } catch (error) {
    console.error(error.message);
  }
};
