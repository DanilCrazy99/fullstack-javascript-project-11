import appState, { appStateInit } from './view/watcher.js';
import { inputEl, btnEl, initFunc } from './view/components.js';
import switcher from './lang/switcher.js';

const app = () => {
  btnEl.addEventListener('click', (e) => {
    e.preventDefault();
    appState.value = inputEl.value;
  });

  initFunc(appStateInit.feeds);
  switcher();
};

app();
