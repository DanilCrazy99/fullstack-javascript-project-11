import axios from 'axios';

export default (url) => new Promise((resolve, reject) => {
  console.log('getRss, URL: ', url);
  const allOriginsUrl = `https://allorigins.hexlet.app/raw?disableCache=true&url=${encodeURIComponent(url)}`;
  console.log('Prepared URL: ', allOriginsUrl);
  axios({
    method: 'get',
    url: allOriginsUrl,
    responseType: 'text',
  })
    .then((res) => {
      // const result = parseRss(res);
      // console.log(result);
      // if (Object.keys(result.feed).length === 0) reject(new Error('emptyRss'));
      console.log(res);
      resolve(res);
    })
    .catch((e) => {
      console.log(e.toJSON());
      reject(e);
    });
});
