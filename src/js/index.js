import 'bootstrap/scss/bootstrap.scss';
import appState from './view/watcher.js';
import { inputEl, btnEl } from './view/components.js';

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  appState.value = inputEl.value;
});
