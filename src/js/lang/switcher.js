import i18next from 'i18next';
import ru from './ru.js';
import jp from './jp.js';
import en from './en.js';
import { makePostsEl } from '../view/components.js';
import { appStateInit } from '../view/watcher.js';

const headerEl = document.getElementById('header');
const descriptionEl = document.getElementById('description');
const inputEl = document.getElementById('url-input'); // placeholder
const btnInputEl = document.getElementById('btn-input');
const exampleEl = document.getElementById('input-example');
const lngRuEl = document.getElementById('lng_ru');
const lngEnEl = document.getElementById('lng_en');
const lngJpEl = document.getElementById('lng_jp');
const btnCloseEl = document.getElementById('btn-modal-close');
const btnOpenEl = document.getElementById('btn-modal-open');

i18next.init({
  lng: 'ru',
  lngs: ['ru', 'jp', 'en'],
  debug: true,
  resources: {
    ru, jp, en,
  },
});

const switchLanguage = () => {
  btnOpenEl.textContent = i18next.t('modal.openBtn');
  btnCloseEl.textContent = i18next.t('modal.closeBtn');
  headerEl.textContent = i18next.t('main.header');
  descriptionEl.textContent = i18next.t('main.description');
  inputEl.setAttribute('placeholder', i18next.t('main.inputPlaceholder'));
  btnInputEl.textContent = i18next.t('main.submit');
  exampleEl.textContent = i18next.t('main.example');
  if (appStateInit.feeds.length > 0) {
    makePostsEl(appStateInit.feeds, {
      btnText: i18next.t('buttons.posts'),
      textPostsList: i18next.t('lists.posts'),
      textFeedsList: i18next.t('lists.feeds'),
    });
  }
};

[lngEnEl, lngJpEl, lngRuEl].forEach((btn) => {
  btn.addEventListener('click', (e) => {
    i18next.changeLanguage(e.target.dataset.lng);
    switchLanguage();
  });
});

export default switchLanguage;
