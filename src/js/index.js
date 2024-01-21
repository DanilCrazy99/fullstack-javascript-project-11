// Import our custom CSS
import '../scss/styles.scss';
import onChange from 'on-change';
import validation from './validation.js';

const state = {
  items: [],
  input: {
    state: 'valid',
  },
};

const inputEl = document.querySelector('input#urlInput');
const btnEl = document.querySelector('button');

const proxyState = onChange(state, (path, value) => {
  if (path === 'input.isValid') {
    const map = {
      valid: () => {
        inputEl.classList.remove('is-invalid');
      },
      invalid: () => {
        inputEl.classList.add('is-invalid');
      },
    };
    map[value]();
  }
});

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  try {
    const { value } = inputEl;
    validation(value).then((result) => {
      proxyState.input.isValid = result ? 'valid' : 'invalid';
    });
    console.log(state);
  } catch (err) {
    console.error(err);
  }
});
