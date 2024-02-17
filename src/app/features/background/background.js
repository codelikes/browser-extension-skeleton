'use strict';

import { getLogger } from '../../global/services/logger-factory';
import { BusFactory } from '../../global/services/bus';
// import { popupBus$ } from '../popup/popup';

export const backgroundBus$ = BusFactory('background');

backgroundBus$.add('ping', (value) => {
  const logger = getLogger('background');

  logger.log('background:ping - was called', value);

  setTimeout(async () => {
    // const result = await popupBus$.call('popup:pong', {
    //   message: 'Ping from background.js',
    // });

    // logger.log('Result of popup:pong', result);
    logger.log('Result of popup:pong', 1234);
  }, 3000);

  return {
    message: 'Pong from background.js',
  };
});
