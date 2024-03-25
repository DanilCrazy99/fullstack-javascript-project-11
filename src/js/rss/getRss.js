import axios from 'axios';
import parseRss from './parseRss.js';

export default (url) =>
  new Promise((resolve, reject) => {
    const allOriginsUrl = `http://localhost:1458/${url}`;
    axios({
      method: 'get',
      url: allOriginsUrl,
      responseType: 'text',
    })
      .then((res) => {
        const result = parseRss(res);
        resolve(result);
      })
      .catch(reject);
  });
