import onChange from 'on-change';
import i18next from 'i18next';
import userScheme from '../utils/validation.js';
import ru from '../lang/ru.js';
import getRss from '../rss/getRss.js';
import {
  inputEl,
  makeFeedbackEl,
  disableInputEls,
  enableInputEls,
} from './components.js';

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
    state: 'idle',
  },
  function cbWatcher(path, value) {
    // console.log('path:', path);
    // console.log('value:', value);
    // console.log(prevValue);
    // console.log(applyData);
    switch (path) {
      case 'error': {
        if (value === null) return;
        makeFeedbackEl('error', i18next.t(`feedback.errors.${value}`));
        inputEl.classList.add('is-invalid');
        break;
      }
      case 'value': {
        if (value === null) {
          inputEl.value = '';
          inputEl.focus();
          return;
        }
        if (this.urls.includes(value)) {
          this.error = 'doubleUrl';
        } else {
          disableInputEls();
          userScheme
            .validate({ value })
            .then(() => {
              this.state = 'pending';
              this.error = null;
              return value;
            })
            .then((result) => {
              inputEl.classList.remove('is-invalid');
              getRss(result)
                .then(() => {
                  this.urls.push(value);
                  makeFeedbackEl('info', i18next.t('feedback.info.urlAdded'));
                  this.value = null;
                  enableInputEls();
                })
                .catch((e) => {
                  this.state = 'idle';
                  // this.value = null;
                  this.error = e.message;
                  enableInputEls();
                });
            })
            .catch((e) => {
              this.state = 'idle';
              // this.value = null;
              this.error = e.message;
              enableInputEls();
            });
        }
        break;
      }
      case 'state':
        console.log(value);
        if (value === 'idle') return;
        if (value === 'pending') {
          makeFeedbackEl();
        }
        break;
      default:
        break;
    }
  }
);
