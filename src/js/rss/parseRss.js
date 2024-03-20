export default (res) => {
  const objXML = JSON.parse(res.data).contents;
  const parser = new DOMParser();
  const parsedDOM = parser.parseFromString(objXML, 'text/xml');
  // console.log(parsedDOM);
  console.log(parsedDOM);
  // document.body.innerHTML = parsedDOM.children[0].children[0].innerHTML;
  const feed = {
    mainFeed: {},
    items: [],
  };
  // Фильтрует информацию по фиду, забирает description, link, title
  const callbackFilterFeed = (tags) => ([, value]) => tags.includes(value.tagName);
  // Добавляет значения тегов в объект mainFeed
  const callbackAddToFeedObj = ([, value]) => {
    const { tagName } = value;
    feed.mainFeed[tagName] = value.textContent;
  };

  const callbackAddToItems = ([, value]) => {
    const itemObj = {};
    const item = Object.entries(value.children).filter(
      callbackFilterFeed(['description', 'link', 'title']),
    );
    item.forEach(([, value1]) => {
      if (['description', 'link', 'title'].includes(value1.tagName)) {
        itemObj[value1.tagName] = value1.textContent;
      }
    });
    feed.items.push(itemObj);
  };

  Object.entries(parsedDOM.children[0].children).forEach(([, value]) => {
    Object.entries(value.children)
      .filter(callbackFilterFeed(['description', 'link', 'title']))
      .forEach(callbackAddToFeedObj);
    Object.entries(value.children)
      .filter(callbackFilterFeed(['item']))
      .forEach(callbackAddToItems);
  });
  console.log(feed);
};
