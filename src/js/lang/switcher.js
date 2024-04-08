import i18next from 'i18next';
import ru from './ru.js';
import jp from './jp.js';
import en from './en.js';

const headerEl = document.getElementById('header');
const descriptionEl = document.getElementById('description');
const inputEl = document.getElementById('url-input'); // placeholder
const btnInputEl = document.getElementById('btn-input');
const exampleEl = document.getElementById('input-example');
const btnCloseEl = document.getElementById('btn-modal-close');
const btnOpenEl = document.getElementById('btn-modal-open');

export const i18nInstance = i18next.createInstance();

i18nInstance.init({
  lng: 'ru',
  lngs: ['ru', 'jp', 'en'],
  debug: true,
  resources: {
    ru, jp, en,
  },
});

const switchLanguage = () => {
  btnOpenEl.textContent = i18nInstance.t('modal.openBtn');
  btnCloseEl.textContent = i18nInstance.t('modal.closeBtn');
  headerEl.textContent = i18nInstance.t('main.header');
  descriptionEl.textContent = i18nInstance.t('main.description');
  inputEl.setAttribute('placeholder', i18nInstance.t('main.inputPlaceholder'));
  btnInputEl.textContent = i18nInstance.t('main.submit');
  exampleEl.textContent = i18nInstance.t('main.example');
};

export default switchLanguage;
