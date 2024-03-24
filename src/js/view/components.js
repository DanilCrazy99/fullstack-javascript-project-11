export const btnEl = document.getElementById('btn-input');
export const infoBlock = document.getElementById('info-block');
export const inputEl = document.getElementById('url-input');
export const feedBackEl = document.getElementById('feedback');

export const makeFeedbackEl = (type, msg) => {
  feedBackEl.textContent = msg;
  switch (type) {
    case 'error':
      feedBackEl.className = 'text-danger m-0';
      break;
    case 'info':
      feedBackEl.className = 'text-success m-0';
      break;
    default:
      break;
  }
};

export const disableInputEls = () => {
  btnEl.classList.add('disabled');
  inputEl.setAttribute('disabled', 'disabled');
};

export const enableInputEls = () => {
  btnEl.classList.remove('disabled');
  inputEl.removeAttribute('disabled', 'disabled');
}