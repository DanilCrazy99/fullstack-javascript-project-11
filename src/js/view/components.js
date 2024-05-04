import { Modal } from 'bootstrap';
import i18nInstance from '../lang/initLang.js';

export const btnEl = document.getElementById('btn-input');
export const infoBlock = document.getElementById('info-block');
export const inputEl = document.getElementById('url-input');
export const feedBackEl = document.getElementById('feedback');
export const postsContainer = document.getElementById('posts');
export const mainEl = document.getElementsByTagName('main');
export const modalEl = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const headerEl = document.getElementById('header');
const descriptionEl = document.getElementById('description');
const exampleEl = document.getElementById('input-example');
const creatorLinkEl = document.getElementById('creatorLink');

const lngRuEl = document.getElementById('lng_ru');
const lngEnEl = document.getElementById('lng_en');
const lngJpEl = document.getElementById('lng_jp');

const headTitle = document.getElementById('title');

const bootstrapEls = {};

export const makePostsEl = (feeds) => {
  const allPosts = feeds.map(({ feed }) => feed.items).flat();

  const allFeeds = feeds.map(({ feed }) => feed.feed).flat();

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
        'border-end-0',
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
      btnPostEl.textContent = i18nInstance.t('buttons.posts');
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
    <h2 class="card-title h4">${i18nInstance.t('lists.posts')}</h2>
    </div>
    ${createListPosts(allPosts).outerHTML}
    </div>
    </div>
    <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
    <div class='card border-0'>
      <div class='card-body'>
        <h2 class='card-title h4'>${i18nInstance.t('lists.feeds')}</h2>
        </div>
        ${createListFeeds(allFeeds).outerHTML}
    </div>
  </div>`;
};

const createMetaElement = (property, content) => {
  const element = document.createElement('meta');
  element.setAttribute('property', property);
  element.setAttribute('content', content);
  return element;
};

export const initFunction = (feeds, appState) => {
  bootstrapEls.modal = new Modal(modalEl);
  const btnOpenEl = document.getElementById('btn-modal-open');
  const btnCloseEl = document.getElementById('btn-modal-close');
  const btnCloseCrossEl = document.getElementById('btn-modal-close-cross');

  btnOpenEl.ariaLabel = i18nInstance.t('modal.aria.openBtn');
  btnCloseEl.ariaLabel = i18nInstance.t('modal.aria.closeBtn');
  btnCloseCrossEl.ariaLabel = i18nInstance.t('modal.aria.closeBtn');

  document.documentElement.setAttribute('lang', i18nInstance.t('meta.lang'));

  const headEl = document.head;

  const metaLocale = createMetaElement('og:locale', i18nInstance.t('meta.locale'));
  const metaLanguage = createMetaElement('og:title', i18nInstance.t('meta.lang'));
  const metaUrl = createMetaElement('og:url', i18nInstance.t('meta.url'));

  headEl.append(metaLocale, metaLanguage, metaUrl);

  lngRuEl.textContent = i18nInstance.t('lng.ru');
  lngEnEl.textContent = i18nInstance.t('lng.en');
  lngJpEl.textContent = i18nInstance.t('lng.jp');
  btnOpenEl.textContent = i18nInstance.t('modal.openBtn');
  btnCloseEl.textContent = i18nInstance.t('modal.closeBtn');
  headTitle.textContent = i18nInstance.t('main.description');
  headerEl.textContent = i18nInstance.t('main.header');
  descriptionEl.textContent = i18nInstance.t('main.description');
  btnEl.textContent = i18nInstance.t('main.submit');
  exampleEl.textContent = i18nInstance.t('main.example');

  creatorLinkEl.ariaLabel = i18nInstance.t('main.aria.creator');
  exampleEl.ariaLabel = i18nInstance.t('main.aria.example');
  btnEl.ariaLabel = i18nInstance.t('main.aria.btn-input');
  inputEl.ariaLabel = i18nInstance.t('main.aria.url-input');
  lngRuEl.ariaLabel = i18nInstance.t('lng.aria.ru');
  lngEnEl.ariaLabel = i18nInstance.t('lng.aria.en');
  lngJpEl.ariaLabel = i18nInstance.t('lng.aria.jp');

  inputEl.setAttribute(
    'placeholder',
    i18nInstance.t('main.inputPlaceholder'),
  );

  btnEl.addEventListener('click', (e) => {
    e.preventDefault();
    appState.value = inputEl.value;
  });

  modalEl.addEventListener('show.bs.modal', (e) => {
    const postId = Number(e.relatedTarget.dataset.id);
    e.relatedTarget.previousSibling.classList.replace('fw-bold', 'fw-normal');
    e.relatedTarget.previousSibling.classList.add('link-secondary');
    const item = feeds.find(({ feed }) => {
      const { ids } = feed;
      if (ids.includes(postId)) return true;
      return false;
    });
    const { title, description } = item.feed.items.find(({ id }) => id === postId);
    modalTitle.textContent = title;
    modalBody.textContent = description;
  });
  const switchLanguage = () => {
    headTitle.textContent = i18nInstance.t('main.description');
    btnOpenEl.textContent = i18nInstance.t('modal.openBtn');
    btnCloseEl.textContent = i18nInstance.t('modal.closeBtn');
    headerEl.textContent = i18nInstance.t('main.header');
    descriptionEl.textContent = i18nInstance.t('main.description');

    inputEl.setAttribute(
      'placeholder',
      i18nInstance.t('main.inputPlaceholder'),
    );
    btnEl.textContent = i18nInstance.t('main.submit');
    exampleEl.textContent = i18nInstance.t('main.example');
  };
  [lngEnEl, lngJpEl, lngRuEl].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      i18nInstance.changeLanguage(e.target.dataset.lng);
      switchLanguage();
    });
  });
};

export const makeFeedbackEl = (type, msg = null) => {
  feedBackEl.textContent = i18nInstance.t(msg);
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
