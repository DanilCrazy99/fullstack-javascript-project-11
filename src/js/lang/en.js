export default {
  translation: {
    main: {
      header: 'RSS aggregator',
      description: "Start reading RSS today! It's easy, it's beautiful.",
      example: 'Example: https://lorem-rss.hexlet.app/feed',
      submit: 'Add',
      inputPlaceholder: 'Link to RSS',
    },
    feedback: {
      errors: {
        doubleUrl: 'This RSS already exists in list',
        invalidUrl: 'Not correct format',
        nullValue: 'URL must not be empty',
        'Network Error': 'Network Error',
        emptyRss: 'RSS not exists on that URL',
      },
      info: {
        urlAdded: 'URL successfuly added',
      },
    },
    lists: {
      feeds: 'Feeds',
      posts: 'Posts',
    },
    buttons: {
      posts: 'Open the post',
    },
    modal: {
      closeBtn: 'Close',
      openBtn: 'Read the full post',
    },
  },
};
