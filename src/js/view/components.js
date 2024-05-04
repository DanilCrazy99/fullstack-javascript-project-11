/* eslint-disable no-param-reassign */
import { Modal } from 'bootstrap';
import i18nInstance from '../lang/initLang.js';

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
  const postsContainer = document.getElementById('posts');

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
  const wholeElements = {
    inputEl: document.getElementById('url-input'),
    feedBackEl: document.getElementById('feedback'),
    btnEl: document.getElementById('btn-input'),
    modalEl: document.getElementById('modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    headerEl: document.getElementById('header'),
    descriptionEl: document.getElementById('description'),
    exampleEl: document.getElementById('input-example'),
    creatorLinkEl: document.getElementById('creatorLink'),
    lngRuEl: document.getElementById('lng_ru'),
    lngEnEl: document.getElementById('lng_en'),
    lngJpEl: document.getElementById('lng_jp'),
    headTitle: document.getElementById('title'),
    btnOpenEl: document.getElementById('btn-modal-open'),
    btnCloseEl: document.getElementById('btn-modal-close'),
    btnCloseCrossEl: document.getElementById('btn-modal-close-cross'),
  };

  const modalElClass = new Modal(wholeElements.modalEl);

  wholeElements.modalElClass = modalElClass;

  const watcherAppState = appState(wholeElements);

  wholeElements.btnOpenEl.ariaLabel = i18nInstance.t('modal.aria.openBtn');
  wholeElements.btnCloseEl.ariaLabel = i18nInstance.t('modal.aria.closeBtn');
  wholeElements.btnCloseCrossEl.ariaLabel = i18nInstance.t('modal.aria.closeBtn');

  document.documentElement.setAttribute('lang', i18nInstance.t('meta.lang'));

  const headEl = document.head;

  const metaLocale = createMetaElement('og:locale', i18nInstance.t('meta.locale'));
  const metaLanguage = createMetaElement('og:title', i18nInstance.t('meta.lang'));
  const metaUrl = createMetaElement('og:url', i18nInstance.t('meta.url'));

  headEl.append(metaLocale, metaLanguage, metaUrl);

  wholeElements.lngRuEl.textContent = i18nInstance.t('lng.ru');
  wholeElements.lngEnEl.textContent = i18nInstance.t('lng.en');
  wholeElements.lngJpEl.textContent = i18nInstance.t('lng.jp');
  wholeElements.btnOpenEl.textContent = i18nInstance.t('modal.openBtn');
  wholeElements.btnCloseEl.textContent = i18nInstance.t('modal.closeBtn');
  wholeElements.headTitle.textContent = i18nInstance.t('main.description');
  wholeElements.headerEl.textContent = i18nInstance.t('main.header');
  wholeElements.descriptionEl.textContent = i18nInstance.t('main.description');
  wholeElements.btnEl.textContent = i18nInstance.t('main.submit');
  wholeElements.exampleEl.textContent = i18nInstance.t('main.example');

  wholeElements.creatorLinkEl.ariaLabel = i18nInstance.t('main.aria.creator');
  wholeElements.exampleEl.ariaLabel = i18nInstance.t('main.aria.example');
  wholeElements.btnEl.ariaLabel = i18nInstance.t('main.aria.btn-input');
  wholeElements.inputEl.ariaLabel = i18nInstance.t('main.aria.url-input');
  wholeElements.lngRuEl.ariaLabel = i18nInstance.t('lng.aria.ru');
  wholeElements.lngEnEl.ariaLabel = i18nInstance.t('lng.aria.en');
  wholeElements.lngJpEl.ariaLabel = i18nInstance.t('lng.aria.jp');

  wholeElements.inputEl.setAttribute(
    'placeholder',
    i18nInstance.t('main.inputPlaceholder'),
  );

  wholeElements.btnEl.addEventListener('click', (e) => {
    e.preventDefault();
    watcherAppState.value = wholeElements.inputEl.value;
  });

  wholeElements.modalEl.addEventListener('show.bs.modal', (e) => {
    const postId = Number(e.relatedTarget.dataset.id);
    e.relatedTarget.previousSibling.classList.replace('fw-bold', 'fw-normal');
    e.relatedTarget.previousSibling.classList.add('link-secondary');
    const item = feeds.find(({ feed }) => {
      const { ids } = feed;
      if (ids.includes(postId)) return true;
      return false;
    });
    const { title, description } = item.feed.items.find(({ id }) => id === postId);
    wholeElements.modalTitle.textContent = title;
    wholeElements.modalBody.textContent = description;
  });
  const switchLanguage = () => {
    wholeElements.headTitle.textContent = i18nInstance.t('main.description');
    wholeElements.btnOpenEl.textContent = i18nInstance.t('modal.openBtn');
    wholeElements.btnCloseEl.textContent = i18nInstance.t('modal.closeBtn');
    wholeElements.headerEl.textContent = i18nInstance.t('main.header');
    wholeElements.descriptionEl.textContent = i18nInstance.t('main.description');

    wholeElements.inputEl.setAttribute(
      'placeholder',
      i18nInstance.t('main.inputPlaceholder'),
    );
    wholeElements.btnEl.textContent = i18nInstance.t('main.submit');
    wholeElements.exampleEl.textContent = i18nInstance.t('main.example');
  };
  [
    wholeElements.lngEnEl,
    wholeElements.lngJpEl,
    wholeElements.lngRuEl,
  ].forEach((btn) => {
    btn.addEventListener('click', (e) => {
      i18nInstance.changeLanguage(e.target.dataset.lng);
      switchLanguage();
    });
  });
};

export const makeFeedbackEl = (elements, type, msg = null) => {
  elements.feedBackEl.textContent = i18nInstance.t(msg);
  switch (type) {
    case 'error':
      elements.feedBackEl.className = 'text-danger m-0';
      break;
    case 'info':
      elements.feedBackEl.className = 'text-success m-0';
      break;
    default:
      break;
  }
};

export const disableInputEls = (elements) => {
  elements.btnEl.classList.add('disabled');
  elements.inputEl.setAttribute('disabled', 'disabled');
};

export const enableInputEls = (elements) => {
  elements.btnEl.classList.remove('disabled');
  elements.inputEl.removeAttribute('disabled', 'disabled');
};
