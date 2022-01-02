import {
  LEVERS,
  HTML_CLASS,
  unLevers,
} from './constants.js';

function renderStartWork() {
  document.querySelector(`.${HTML_CLASS.BTN}`).style.display = 'none';
  document.querySelector(`.${HTML_CLASS.MAIN}`).style.display = 'block';
};

function renderPushedLever(num) {
  let currentLever = document.getElementById(num);

  if (currentLever.style.background === 'red') {
    currentLever.style.background = 'green';
    return;
  }

  currentLever.style.background = 'red';
};

function leverChangeRecord(num) {
  unLevers[num] = Number(!unLevers[num]);
};

function requestBody(action, Id, lever1, lever2) {
  return JSON.stringify({
    action: action,
    [LEVERS[1]]: lever1,
    [LEVERS[2]]: lever2,
    stateId: Id
  });
};

function renderToken(token) {
  document.querySelectorAll(`.${HTML_CLASS.LEVER}`).forEach(lever => {
    lever.style.background = 'green';
  });
  setTimeout(() => {
    document.querySelectorAll(`.${HTML_CLASS.LEVER}`).forEach(lever => {
      lever.style.display = 'none';
    });
    document.body.style.background = 'url("./image/bg2.jpeg ")';
    document.querySelector(`.${HTML_CLASS.MAIN}`).style.background = 'url("./image/main2.jpeg") no-repeat';
    document.querySelector(`.${HTML_CLASS.MAIN}`).style.backgroundSize = '100%';
    document.querySelector(`.${HTML_CLASS.TOKEN}`).style.display = 'block'
    document.querySelector(`.${HTML_CLASS.TOKEN}`).innerHTML = token;
  }, 1000);
};

export { renderStartWork, requestBody, renderPushedLever, leverChangeRecord, renderToken };
