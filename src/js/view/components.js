import { Modal } from 'bootstrap';
import i18next from 'i18next';

export const btnEl = document.getElementById('btn-input');
export const infoBlock = document.getElementById('info-block');
export const inputEl = document.getElementById('url-input');
export const feedBackEl = document.getElementById('feedback');
export const postsContainer = document.getElementById('posts');
export const mainEl = document.getElementsByTagName('main');
export const modalEl = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const bootstrapEls = {};

export const initFunc = (feeds) => {
  bootstrapEls.modal = new Modal(modalEl);
  const btnOpenEl = document.getElementById('btn-modal-open');
  const btnCloseEl = document.getElementById('btn-modal-close');

  btnOpenEl.textContent = i18next.t('modal.openBtn');
  btnCloseEl.textContent = i18next.t('modal.closeBtn');

  modalEl.addEventListener('show.bs.modal', (e) => {
    // console.log(feeds);
    // console.log(e.relatedTarget.dataset.id);
    const postId = Number(e.relatedTarget.dataset.id);
    // console.log(postId);
    const item = feeds.find(({ feed }) => {
      const { ids } = feed;
      // console.log(feed);
      if (ids.includes(postId)) return true;
    });
    const { title, description } = item.feed.items.find(
      ({ id }) => id === postId,
    );
    modalTitle.textContent = title;
    modalBody.textContent = description;
    // modalTitle.textContent =
  });
};

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
};

export const makePostsEl = (feeds, options) => {
  const {
    btnText = 'Просмотр',
    textPostsList = 'Посты',
    textFeedsList = 'Фиды',
  } = options;

  const allPosts = feeds.map(({ feed }) => feed.items).flat();

  const allFeeds = feeds.map(({ feed }) => feed.feed).flat();
  console.log('createListPosts: ', allFeeds);

  const createListPosts = (posts) => {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('list-group', 'border-0', 'rounded-0');

    const liEls = posts.map((post) => {
      const liEl = document.createElement('li');
      liEl.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0'
      );

      const aEl = document.createElement('a');
      aEl.classList.add('fw-bold');
      aEl.setAttribute('data-id', post.id);
      aEl.setAttribute('target', '_blank');
      aEl.setAttribute('rel', 'noopener noreferrer');
      aEl.setAttribute('href', post.link);
      aEl.textContent = post.title;

      const btnPostEl = document.createElement('button');
      btnPostEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      btnPostEl.setAttribute('type', 'button');
      btnPostEl.setAttribute('data-id', post.id);
      btnPostEl.textContent = btnText;
      btnPostEl.setAttribute('data-bs-toggle', 'modal');
      btnPostEl.setAttribute('data-bs-target', '#modal');

      liEl.replaceChildren(aEl, btnPostEl);
      return liEl;
    });

    ulEl.replaceChildren(...liEls);
    return ulEl;
  };

  const createListFeeds = (feedsInfo) => {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('list-group', 'border-0', 'rounded-0');
    const liEls = feedsInfo.map((item) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item', 'border-0', 'border-end-0');

      const h3El = document.createElement('h3');
      h3El.classList.add('h6', 'm-0');
      h3El.textContent = item.title;

      const pEl = document.createElement('p');
      pEl.classList.add('m-0', 'small', 'text-black-50');
      pEl.textContent = item.description;

      liEl.replaceChildren(h3El, pEl);

      return liEl;
    });

    ulEl.replaceChildren(...liEls);
    return ulEl;
  };

  postsContainer.innerHTML = `<div class="row">
  <div class="col-md-10 col-lg-8 order-1 mx-auto posts">
    <div class="card border-0">
    <div class="card-body">
    <h2 class="card-title h4">${textPostsList}</h2>
    </div>
    ${createListPosts(allPosts).outerHTML}
    </div>
    </div>
  <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
    <div class='card border-0'>
      <div class='card-body'>
        <h2 class='card-title h4'>${textFeedsList}</h2>
      </div>
      ${createListFeeds(allFeeds).outerHTML}
    </div>
  </div>`;
};

export const makeModal = ({
  closeBtn = 'Закрыть',
  openBtn = 'Читать полностью',
}) => {
  const modalContainerEl = document.createElement('div');
  modalContainerEl.classList.add('modal', 'fade');
  modalContainerEl.setAttribute('id', 'modal');
  modalContainerEl.setAttribute('tabindex', '-1');
  modalContainerEl.setAttribute('aria-labelledby', 'exampleModalLabel');
  modalContainerEl.setAttribute('aria-hidden', 'true');

  modalContainerEl.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalBody">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${closeBtn}</button>
        <button type="button" class="btn btn-primary">${openBtn}</button>
      </div>
    </div>
  </div>`;
  return modalContainerEl;
};
