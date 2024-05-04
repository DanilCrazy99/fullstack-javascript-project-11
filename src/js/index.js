import appState, { appStateInit } from './view/watcher.js';
import { initFunction } from './view/components.js';

const app = () => {
  initFunction(appStateInit.feeds, appState);
};

app();
