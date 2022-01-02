import {
  ACTION,
  MAIN_URL,
  HTML_CLASS,
  unLevers,
  unsuccessMessege,
  USER_NAME,
  X
} from './constants.js';

import {
  leverChangeRecord,
  renderStartWork,
  requestBody,
  renderPushedLever,
  renderToken
} from './serveses.js'

function attemptSaveWorld() {
  let firstAttempt = true;
  const ws = new WebSocket(MAIN_URL, USER_NAME);


  ws.onmessage = res => {
    const data = JSON.parse(res.data);


    if (unLevers[0] === X && !Reflect.has(data, 'same')) {
      ws.send(requestBody(ACTION.CHECK, data.stateId, 0, 1))
    } else if (unLevers.includes(X) && !Reflect.has(data, 'same')) {
      let unk = unLevers.indexOf(X);
      ws.send(requestBody(ACTION.CHECK, data.stateId, 0, unk));
    }


    if (Reflect.has(data, 'pulled')) {

      if (unLevers[data.pulled] !== X) {
        leverChangeRecord(data.pulled)
        renderPushedLever(data.pulled)
      }

    } else if (Reflect.has(data, 'same')) {

      if (data.same && unLevers[data.lever1] !== X) {
        unLevers[data.lever2] = unLevers[data.lever1];
      } else if (!data.same && unLevers[data.lever1] !== X) {
        unLevers[data.lever2] = Number(!unLevers[data.lever1]);
      } else {
        unLevers[data.lever1] = 1;
      }

      renderPushedLever(data.lever2)
    }

    let numberOfIncludedLever = unLevers.reduce((number, leverPos) => number += leverPos);

    if (!firstAttempt && numberOfIncludedLever === 0) {
      ws.send(requestBody(ACTION.POWER_OFF, data.stateId));
    }

    if (firstAttempt && (numberOfIncludedLever === 0 || numberOfIncludedLever === 4)) {
      ws.send(requestBody(ACTION.POWER_OFF, data.stateId));
      firstAttempt = false;
    }

    if (data.token) {
      renderToken(data.token)
      ws.close()
    }

    if (data.message === unsuccessMessege) {
      unLevers.fill(1);
      document.querySelectorAll(`.${HTML_CLASS.LEVER}`).forEach(lever => {
        lever.style.background = 'red';
      });
    }

  };

}

document.querySelector(`.${HTML_CLASS.BTN}`).onclick = () => {
  renderStartWork();
  attemptSaveWorld();
};
