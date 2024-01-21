// Import our custom CSS
import '../scss/styles.scss';
import validation from './validation.js';
import watchers from './view/watchers.js';

const state = {
  items: [],
  input: {
    state: 'valid',
  },
};

const inputEl = document.querySelector('input#urlInput');
const btnEl = document.querySelector('button');

const proxyState = watchers(state, inputEl);

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  const { value } = inputEl;
  validation(value).then((result) => {
    proxyState.input.state = result
      ? proxyState.input.state = (!state.items.findIndex(({ url }) => url === value))
        ? 'exists' : 'valid'
      : 'invalid';
  }).then(() => {
    if (state.input.state === 'valid') {
      state.items.push({ url: value });
      inputEl.value = '';
      inputEl.focus();
    }
  }).catch(console.error);
});
