import { STATE } from './state.js';
import { STEPS, ACTION_COMPONENTS } from './steps.js';
import { BOP_QUOTE, NEW_ACCOUNT } from './schemas.js';
import { ACTIONS } from './actions.js';
import { COMPONENTS } from './components.js';
import { NESTED_CONDITIONALS } from './conditionals.js';
import { createNode, getRadioValue, getFormElement, getClosest, getInputValue, getIndices } from './helpers.js';
import { tippet } from './libs/tippet.js';

const ACCOUNT_LIST = document.getElementById('accountsList');
const QUOTE_FLOW = document.getElementById('quoteFlow');
const BOP_CONTAINER = document.getElementById('bopQuote');
const ACCOUNT_WRAPPER = document.getElementById('accountWrapper');
const POLICY_DETAIL_WRAPPER = document.querySelector('.policy-detail-wrapper');

const animateStepTransition = () => {
  QUOTE_FLOW.classList.remove('animate-transition');
  QUOTE_FLOW.setAttribute('width', QUOTE_FLOW.offsetWidth);
  QUOTE_FLOW.classList.add('animate-transition');
};

const getHandlerDataTree = (inputResult) => {
  const indices = getIndices();
  STATE.locationIndex = indices.location;
  STATE.buildingIndex = indices.building;
  logInputValue(indices, inputResult);
};

const logInputValue = (indices, inputResult) => {
  const isLocation = STATE.schema[STATE.index].type && STATE.schema[STATE.index].type === 'location';
  const isBuilding = STATE.schema[STATE.index].type && STATE.schema[STATE.index].type === 'building';
  const locationIndex = indices.location;
  const buildingIndex = indices.building;
  const doingQuote = STATE.schema[0].title !== 'Basic info';

  if(doingQuote) {
    if(STATE.index < STATE.quote.buildings.length) {
      STATE.quote.buildings[STATE.index][inputResult.id] = inputResult.value;
    }
    else {
      STATE.quote[inputResult.id] = inputResult.value;
    }
  }
  else if(isBuilding) {
    STATE.quote.locations[locationIndex].buildings[buildingIndex][inputResult.id] = inputResult.value;
  }
  else if(isLocation) {
    STATE.quote.locations[locationIndex][inputResult.id] = inputResult.value;
  }
  else {
    STATE.quote[inputResult.id] = inputResult.value;
  }
};

const handleInput = (e) => {
  const inputResult = getInputValue(e);
  const addingLocations = STATE.schema[0].title === 'Basic info' && STATE.index > 0;
  getHandlerDataTree(inputResult);
  console.log(STATE);
  handleConditionalLogic(inputResult);
};

const handleConditionalLogic = (input) => {
  for(let conditional in NESTED_CONDITIONALS) {
    if(input.id === conditional) {
      const cond = NESTED_CONDITIONALS[conditional];
      handleNestedConditional(input, cond);
    }
  }
};

const handleNestedConditional = (input, cond) => {
  for(let key in cond) {
    let targets = cond[key];
    targets.forEach(target => {
      if(input.value === key) {
        getFormElement(target).classList.remove('hidden');
        getFormElement(target).classList.add('child-indent');
      }
      else {
        getFormElement(target).classList.add('hidden');
      }
    });
  }
};

const bindActionEvents = (actions) =>
  actions.forEach(function(action) {
    const fn = action.getAttribute('data-onclick');
    action.onclick = ACTIONS[fn];
  });

const bindInputEvents = (inputs) =>
  inputs.forEach(function(input) {
    if(input.getAttribute('data-oninput')){
      const fn = input.getAttribute('data-oninput');
      input.oninput = ACTIONS[fn];
    }
    if(input.getAttribute('data-onload')){
      const fn = input.getAttribute('data-onload');
      ACTIONS[fn](input);
    }
    input.onchange = handleInput;
});

const bindStaticEvents = () => {
  document.getElementById('newAccount').onclick = ACTIONS.startNewAccount;

  document.getElementById('newQuote').onclick = ACTIONS.startNewQuote;

  document.getElementById('closeQuote').onclick = ACTIONS.closePanelModal;

  document.getElementById('closeQuoteDetail').onclick = () => {
    POLICY_DETAIL_WRAPPER.classList.add('hidden');
  };
};

const render = (container, component) => {
  container.innerHTML = component;

  const inputs = container.querySelectorAll('input, select, form');
  const buttons = container.querySelectorAll('.button');
  const clickeEvents = container.querySelectorAll('[data-onclick]');

  if(clickeEvents) {
    bindActionEvents(clickeEvents);
  }
  if(buttons) {
    bindActionEvents(buttons);
  }
  if(inputs){
    bindInputEvents(inputs);
    inputs.forEach(input => {
      handleConditionalLogic(getInputValue(input));
    });
  }

  tippet.init();
};

const init = () => {
  render(ACCOUNT_LIST, COMPONENTS.views.accounts());
  ACTIONS.showAccountDetail(0);
  bindStaticEvents();
};

init();

export {
  STATE,
  BOP_QUOTE,
  animateStepTransition,
  render,
  QUOTE_FLOW,
  BOP_CONTAINER,
  ACCOUNT_WRAPPER,
  POLICY_DETAIL_WRAPPER,
  ACCOUNT_LIST
};
