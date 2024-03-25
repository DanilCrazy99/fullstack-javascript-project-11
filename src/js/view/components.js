export const btnEl = document.getElementById('btn-input');
export const infoBlock = document.getElementById('info-block');
export const inputEl = document.getElementById('url-input');
export const feedBackEl = document.getElementById('feedback');
export const postsContainer = document.getElementById('posts');

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

export const makePostsList = (posts, options) => {
  const { btnText = 'Просмотр' } = options;
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
    aEl.setAttribute('data-id', post.postId);
    aEl.setAttribute('target', '_blank');
    aEl.setAttribute('rel', 'noopener noreferrer');
    aEl.setAttribute('href', post.link);
    aEl.textContent = post.title;

    const btnPostEl = document.createElement('button');
    btnPostEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    btnPostEl.setAttribute('type', 'button');
    btnPostEl.setAttribute('data-id', post.postId);
    btnPostEl.textContent = btnText;

    liEl.replaceChildren(aEl, btnPostEl);
    return liEl;
  });

  ulEl.replaceChildren(...liEls);

  postsContainer.innerHTML = `<div class="row">
    <div class="col-md-10 col-lg-8 order-1 mx-auto posts">
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Посты</h2>
      </div>
      ${ulEl.outerHTML}
    </div>
    <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
    
    </div>
  </div>`;
};

export const makeModal = ({ title, description }) => {
  return `<!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ${description}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`;
};
