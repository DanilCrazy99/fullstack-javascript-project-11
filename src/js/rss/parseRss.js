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
) =>
  (res) =>
    new Promise((resolve, reject) => {
      // console.log(objXML);
      // const objXML = JSON.parse(res.data);
      const parsedDOM = parser.parseFromString(res.data, 'text/xml');
      // console.log(parsedDOM);
      // console.log(parsedDOM);
      // document.body.innerHTML = parsedDOM.children[0].children[0].innerHTML;
      // Фильтрует информацию по фиду, забирает description, link, title
      const callbackFilterFeed = (tags) => ([, value]) => tags.includes(value.tagName);
      // Добавляет значения тегов в объект feed
      const callbackAddToFeedObj = ([, value]) => {
        const { tagName } = value;
        feedObj.feed[tagName] = value.textContent;
      };

      const callbackAddToItems = ([, value]) => {
        const itemObj = {};
        const item = Object.entries(value.children).filter(
          callbackFilterFeed(['description', 'link', 'title'])
        );
        item.forEach(([, value1]) => {
          if (['description', 'link', 'title'].includes(value1.tagName)) {
            itemObj[value1.tagName] = value1.textContent;
          }
        });
        countsInFeeds.countPosts += 1;
        itemObj.id = Number(countsInFeeds.countPosts);
        feedObj.ids.push(Number(countsInFeeds.countPosts));
        feedObj.items.push(itemObj);
      };

      Object.entries(parsedDOM.children[0].children).forEach(([, value]) => {
        Object.entries(value.children)
          .filter(callbackFilterFeed(['description', 'link', 'title']))
          .forEach(callbackAddToFeedObj);
        Object.entries(value.children)
          .filter(callbackFilterFeed(['item']))
          .forEach(callbackAddToItems);
      });
      // console.log(feed);
      if (Object.keys(feedObj.feed).length === 0) reject(new Error('emptyRss'));
      countsInFeeds.countFeeds += 1;
      resolve(feedObj);
    });
