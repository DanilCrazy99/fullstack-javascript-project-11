import onChange from 'on-change';

const proxyState = (state, inputEl) => onChange(state, (path, value) => {
  if (path === 'input.state') {
    const map = {
      valid: () => {
        inputEl.classList.remove('is-invalid');
      },
      invalid: () => {
        inputEl.classList.add('is-invalid');
      },
      exists: () => {
        inputEl.classList.add('is-invalid');
      },
    };
    map[value]();
  }
});

export default proxyState;
