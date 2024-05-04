/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import userScheme from '../utils/validation.js';
import getRss from '../rss/getRss.js';
import {
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

export default (wholeElements) => onChange(appStateInit, function cbWatcher(path, value) {
  if (/feeds/.test(path)) {
    makePostsEl(appStateInit.feeds);
    return;
  }
  switch (path) {
    case 'error': {
      if (value === null) {
        makeFeedbackEl(wholeElements);
        return;
      }
      makeFeedbackEl(wholeElements, 'error', `feedback.errors.${value}`);
      wholeElements.inputEl.classList.add('is-invalid');
      break;
    }
    case 'value': {
      if (value === null) {
        wholeElements.inputEl.value = '';
        wholeElements.inputEl.focus();
        return;
      }
      if (this.urls.includes(value)) {
        this.error = 'doubleUrl';
      } else {
        disableInputEls(wholeElements);
        this.error = null;
        userScheme
          .validate({ value })
          .then(() => {
            this.state = 'pending';
            this.error = null;
            return value;
          })
          .then((result) => {
            wholeElements.inputEl.classList.remove('is-invalid');
            getRss(result)
              .then(parseRss())
              .then((feed) => {
                this.urls.push(value);
                makeFeedbackEl(wholeElements, 'info', 'feedback.info.urlAdded');
                this.value = null;
                enableInputEls(wholeElements);
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
                enableInputEls(wholeElements);
              });
          })
          .catch((e) => {
            this.state = 'idle';
            this.error = e.message;
            enableInputEls(wholeElements);
          });
      }
      break;
    }
    case 'state':
      if (value === 'idle') return;
      if (value === 'pending') {
        makeFeedbackEl(wholeElements);
      }
      break;
    default:
      break;
  }
});
