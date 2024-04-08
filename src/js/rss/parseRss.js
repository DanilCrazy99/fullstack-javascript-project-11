export const countsInFeeds = {
  countPosts: 0,
  countFeeds: 0,
};

export default (feedObjPattern = {
  ids: [],
  feed: {},
  items: [],
}) => (res) => new Promise((resolve, reject) => {
  const feedObj = { ...feedObjPattern };
  const parser = new DOMParser();
  const parsedDOM = parser.parseFromString(res, 'text/xml');

  const feedTitle = parsedDOM.querySelector('channel title').textContent;
  const feedDescription = parsedDOM.querySelector(
    'channel description'
  ).textContent;
  const feedLink = parsedDOM.querySelector('channel link').textContent;
  const feedInfo = {
    title: feedTitle,
    description: feedDescription,
    link: feedLink,
  };
  if (Object.keys(feedObjPattern.feed).length === 0) feedObj.feed = feedInfo;

  const items = parsedDOM.querySelectorAll('channel item');
  [...items].forEach((post) => {
    const title = post.querySelector('title').textContent;
    const link = post.querySelector('link').textContent;
    const description = post.querySelector('description').textContent;

    const postObj = {
      title,
      link,
      description,
    };

    const { link: newItemLink } = postObj;
    if (!feedObj.items.find(({ link: linkInArr }) => newItemLink === linkInArr)) {
      countsInFeeds.countPosts += 1;
      postObj.id = Number(countsInFeeds.countPosts);
      feedObj.items.push(postObj);
      feedObj.ids.push(Number(countsInFeeds.countPosts));
    }
  });

  if (feedObj.ids.length === 0) reject(new Error('emptyRss'));
  countsInFeeds.countFeeds += 1;
  resolve(feedObj);
});
