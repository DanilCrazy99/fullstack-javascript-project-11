import proxyServer from 'cors-anywhere';

const host = 'localhost';
const port = 1458;

proxyServer
  .createServer({
    originWhitelist: [], // Allow all origins
    // requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
