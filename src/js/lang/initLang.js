import i18next from 'i18next';
import ru from './ru.js';
import jp from './jp.js';
import en from './en.js';

const i18nInstance = i18next.createInstance();

i18nInstance.init({
  lng: 'ru',
  lngs: ['ru', 'jp', 'en'],
  debug: true,
  resources: {
    ru, jp, en,
  },
});

export default i18nInstance;
