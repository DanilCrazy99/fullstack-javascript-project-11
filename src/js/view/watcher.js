import onChange from 'on-change';
import i18nInstance from '../lang/initLang.js';
import userScheme from '../utils/validation.js';
import getRss from '../rss/getRss.js';
import {
  inputEl,
  makeFeedbackEl,
  disableInputEls,
  enableInputEls,
  makePostsEl,
} from './components.js';
import parseRss, { countsInFeeds } from '../rss/parseRss.js';

export const appStateInit = {
  value: null,
  urls: [],
  error: '',
  info: [],
  state: 'idle',
  feeds: [],
};

export default onChange(appStateInit, function cbWatcher(path, value) {
  if (/feeds/.test(path)) {
    makePostsEl(appStateInit.feeds);
    return;
  }
  switch (path) {
    case 'error': {
      if (value === null) {
        makeFeedbackEl();
        return;
      }
      makeFeedbackEl('error', `feedback.errors.${value}`);
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
        this.error = null;
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
              .then(parseRss())
              .then((feed) => {
                this.urls.push(value);
                makeFeedbackEl('info', 'feedback.info.urlAdded');
                this.value = null;
                enableInputEls();
                const newFeed = {
                  id: countsInFeeds.countFeeds,
                  feed,
                  url: value,
                };
                this.feeds.push(newFeed);
                const feedObjInWatcher = this.feeds.find(({ url: feedUrl }) => value === feedUrl);
                countsInFeeds.countFeeds += 1;
                const timeoutCallback = () => {
                  getRss(feedObjInWatcher.url)
                    .then(parseRss(feedObjInWatcher.feed))
                    .catch(console.log)
                    .finally(() => {
                      setTimeout(timeoutCallback, 5000);
                    });
                };
                timeoutCallback();
              })
              .catch((e) => {
                this.state = 'idle';
                this.error = e.message;
                enableInputEls();
              });
          })
          .catch((e) => {
            this.state = 'idle';
            this.error = e.message;
            enableInputEls();
          });
      }
      break;
    }
    case 'state':
      if (value === 'idle') return;
      if (value === 'pending') {
        makeFeedbackEl();
      }
      break;
    default:
      break;
  }
});
