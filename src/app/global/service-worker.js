'use strict';

import { QuickAction } from '../features/quick-action/quick-action';

chrome.commands.onCommand.addListener((command) => {
  console.log('Command:', command);

  if (command === 'bookmark-open-manager') {
    const quickAction = new QuickAction();

    quickAction.toggle();
  }
});
