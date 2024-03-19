import onChange from 'on-change';
import i18next from 'i18next';
import userScheme from '../validation.js';
import ru from '../lang/ru.js';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

const infoBlock = document.getElementById('info-block');
export const inputEl = document.getElementById('url-input');

export const appState = onChange(
  {
    value: null,
    urls: [],
    error: '',
    info: [],
  },
  (path, value) => {
    // console.log('path:', path);
    // console.log('value:', value);
    // console.log(prevValue);
    // console.log(applyData);
    const feedBackEl = document.createElement('p');
    switch (path) {
      case 'error': {
        if (value === null) return;
        feedBackEl.classList.add('text-danger', 'm-0');
        feedBackEl.textContent = i18next.t(`feedback.errors.${value}`);
        infoBlock.replaceChildren(feedBackEl);
        inputEl.classList.add('is-invalid');
        break;
      }
      case 'value': {
        if (value === null) return;
        if (appState.urls.includes(value)) {
          appState.error = 'doubleUrl';
        } else {
          userScheme
            .validate({ value })
            .then((result) => {
              appState.error = null;
              inputEl.classList.remove('is-invalid');
              appState.urls.push(value);
              feedBackEl.classList.add('text-success', 'm-0');
              feedBackEl.textContent = i18next.t('feedback.info.urlAdded');
              infoBlock.replaceChildren(feedBackEl);
              inputEl.value = '';
              inputEl.focus();
              appState.value = null;
            })
            .catch((e) => {
              appState.error = e.message;
              console.log(e);
            });
        }
        break;
      }
      default:
        break;
    }
  }
);
