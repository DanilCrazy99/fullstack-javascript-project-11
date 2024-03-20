import axios from 'axios';
import parseRss from './parseRss.js';

export default (url) => {
  const allOriginsUrl = `http://localhost:1458/get?url=${encodeURIComponent(
    url,
  )}`;
  axios({
    method: 'get',
    url: allOriginsUrl,
    responseType: 'text',
  })
    .then((res) => {
      parseRss(res);
    })
    .catch(console.error);
};
