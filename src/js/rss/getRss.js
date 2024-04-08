import axios from 'axios';

const makeUrl = (url) => {
  const allOriginsUrl = new URL('https://allorigins.hexlet.app/get');
  allOriginsUrl.searchParams.append('disableCache', true);
  allOriginsUrl.searchParams.append('url', url);
  return allOriginsUrl;
};

export default (url) => new Promise((resolve, reject) => {
  const preparedUrl = makeUrl(url);
  axios({
    method: 'get',
    url: preparedUrl,
    responseType: 'text',
  })
    .then((res) => {
      const preparedData = JSON.parse(res.data).contents;
      resolve(preparedData);
    })
    .catch(reject);
});
