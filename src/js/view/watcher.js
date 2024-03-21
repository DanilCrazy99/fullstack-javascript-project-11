import onChange from 'on-change';
import i18next from 'i18next';
import userScheme from '../utils/validation.js';
import ru from '../lang/ru.js';
import getRss from '../rss/getRss.js';
import { infoBlock, inputEl, btnEl } from './components.js';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

export default onChange(
  {
    value: null,
    urls: [],
    error: '',
    info: [],
  },
  function cbWatcher(path, value) {
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
        if (this.urls.includes(value)) {
          this.error = 'doubleUrl';
        } else {
          userScheme
            .validate({ value })
            .then(() => {
              btnEl.classList.add('disabled');
              inputEl.setAttribute('disabled', 'disabled');
              this.error = null;
              return value;
            })
            .then(getRss)
            .then(() => {
              inputEl.classList.remove('is-invalid');
              this.urls.push(value);
              feedBackEl.classList.add('text-success', 'm-0');
              feedBackEl.textContent = i18next.t('feedback.info.urlAdded');
              infoBlock.replaceChildren(feedBackEl);
              inputEl.value = '';
              inputEl.focus();
              this.value = null;
            })
            .catch((e) => {
              this.value = null;
              this.error = e.message;
            })
            .finally(() => {
              btnEl.classList.remove('disabled');
              inputEl.removeAttribute('disabled', 'disabled');
            });
        }
        break;
      }
      default:
        break;
    }
  }
);
