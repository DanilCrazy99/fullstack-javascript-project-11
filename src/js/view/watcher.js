import onChange from 'on-change';
import userScheme from '../validation.js';

const infoBlock = document.getElementById('info-block');
export const inputEl = document.getElementById('url-input');

export const appState = onChange(
  {
    value: '',
    urls: [],
    error: '',
    info: [],
  },
  (path, value) => {
    // console.log(path);
    // console.log(value);
    // console.log(prevValue);
    // console.log(applyData);
    const feedBackEl = document.createElement('p');
    switch (path) {
      case 'error': {
        const dict = {
          doubleUrl: 'В списке уже есть такой URL',
          invalidUrl: 'Некорректный URL',
        };
        feedBackEl.classList.add('text-danger', 'm-0');
        feedBackEl.textContent = dict[value];
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
            .isValid({ value })
            .then((result) => {
              if (result) {
                appState.error = '';
                inputEl.classList.remove('is-invalid');
                appState.urls.push(value);
                feedBackEl.classList.add('text-success', 'm-0');
                feedBackEl.textContent = 'URL успешно добавлен';
                infoBlock.replaceChildren(feedBackEl);
                inputEl.value = '';
                inputEl.focus();
                appState.value = null;
              } else {
                appState.error = 'invalidUrl';
              }
            })
            .catch(console.error);
        }
        break;
      }
      default:
        break;
    }
  }
);
