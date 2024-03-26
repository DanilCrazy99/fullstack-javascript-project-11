import 'bootstrap/scss/bootstrap.scss';
import appState, { appStateInit } from './view/watcher.js';
import { inputEl, btnEl, initFunc } from './view/components.js';

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  appState.value = inputEl.value;
});

initFunc(appStateInit.feeds);
