export const countsInFeeds = {
  countPosts: 0,
  countFeeds: 0,
};

const parser = new DOMParser();

export default (
  feedObj = {
    ids: [],
    feed: {},
    items: [],
  },
) => (res) => new Promise((resolve, reject) => {
  // console.log(feedObj);
  // console.log(objXML);
  // const objXML = JSON.parse(res.data);
  const parsedDOM = parser.parseFromString(res, 'text/xml');
  // console.log(parsedDOM);
  // console.log(parsedDOM);
  // document.body.innerHTML = parsedDOM.children[0].children[0].innerHTML;
  // Фильтрует информацию по фиду, забирает description, link, title
  const callbackFilterFeed = (tags) => ([, value]) => tags.includes(value.tagName);
  // Добавляет значения тегов в объект feed
  const callbackAddToFeedObj = ([, value]) => {
    const { tagName } = value;
    // eslint-disable-next-line no-param-reassign
    feedObj.feed[tagName] = value.textContent;
  };
  // Создаёт объект поста с описанием, названием и link и возвращает его
  const callbackMakeItemObj = ([, value]) => {
    const itemObj = {};
    const item = Object.entries(value.children).filter(callbackFilterFeed(['description', 'link', 'title']));
    item.forEach(([, value1]) => {
      if (['description', 'link', 'title'].includes(value1.tagName)) {
        itemObj[value1.tagName] = value1.textContent;
      }
    });
    return itemObj;
  };
  Object.entries(parsedDOM.children[0].children).forEach(([, value]) => {
    if (Object.keys(feedObj.feed).length === 0) {
      Object.entries(value.children)
        .filter(callbackFilterFeed(['description', 'link', 'title']))
        .forEach(callbackAddToFeedObj);
    }
    Object.entries(value.children)
      .filter(callbackFilterFeed(['item']))
      .map(callbackMakeItemObj)
      .forEach((item) => {
        const { link: newItemLink } = item;
        if (feedObj.items.find(({ link }) => newItemLink === link)) {
          // console.log('Same link: ', item);
          return;
        }
        const copyItem = item;
        countsInFeeds.countPosts += 1;
        copyItem.id = Number(countsInFeeds.countPosts);
        feedObj.items.push(copyItem);
        feedObj.ids.push(Number(countsInFeeds.countPosts));
        // console.log(copyItem);
        // console.log(feedObj);
        // feedObj.items.push(itemObj);
        // item.id =
      });
  });
  // console.log(feed);
  if (Object.keys(feedObj.feed).length === 0) reject(new Error('emptyRss'));
  countsInFeeds.countFeeds += 1;
  resolve(feedObj);
});
