'use strict';

import './popup.scss';
import { getLogger } from '../../global/services/logger-factory';
import { BusFactory } from '../../global/services/bus';
import { backgroundBus$ } from '../background/background';

export const popupBus$ = BusFactory('popup');

const logger = getLogger('popup');

popupBus$.add('pong', (value) => {
  logger.log('popup:pong - was called', value);

  return {
    message: 'Pong from popup.js',
  };
});

const render = (content) => {
  const popup = document.querySelector('#popup');
  popup.innerHTML = content;

  return popup;
};

const popup = () => {
  const popup = render(`
    <div class="popup">
      <button class="button h-bg-grey h-font-white" id="pingButton">Ping</button>
    </div>
  `);

  popup.querySelector('#pingButton').addEventListener('click', async () => {
    const result = await backgroundBus$.call('background:ping', {
      ping: 'Ping from popup.js',
    });

    logger.log('Result of background:ping', result);
  });
};

popup();
