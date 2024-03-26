import axios from 'axios';
import parseRss from './parseRss.js';

export default (url) => new Promise((resolve, reject) => {
  const allOriginsUrl = `https://allorigins.hexlet.app/raw?disableCache=true&url=${encodeURIComponent(url)}`;
  axios({
    method: 'get',
    url: allOriginsUrl,
    responseType: 'text',
  })
    .then((res) => {
      console.log(res);
      const result = parseRss(res);
      if (Object.keys(result.feed).length === 0) reject(new Error('emptyRss'));
      resolve(result);
    })
    .catch(reject);
});
