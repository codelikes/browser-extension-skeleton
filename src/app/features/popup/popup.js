'use strict';

// styles
import './popup.scss';

const render = (content) => {
  const popup = document.querySelector('#popup');
  popup.innerHTML = content;

  return popup;
};

const popup = () => {
  const popup = render(`
    <div class="popup">
      <button class="button h-bg-grey h-font-white" id="buttonEl">Ping</button>
    </div>
  `);

  popup.querySelector('#buttonEl').addEventListener('click', () => {
    const pongMessage = 'Pong from popup.js';
    console.log(pongMessage);
    alert(pongMessage);
  });
};

popup();
