'use strict';

chrome.commands.onCommand.addListener((command, _) => {
  console.log('Command:', command);
});
