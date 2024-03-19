import 'bootstrap/scss/bootstrap.scss';
import { appState, inputEl } from './view/watcher.js';

const btnEl = document.getElementById('btn-input');

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  appState.value = inputEl.value.trim();
});
