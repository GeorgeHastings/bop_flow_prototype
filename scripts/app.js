import { STATE } from './state.js';
import { STEPS, ACTION_COMPONENTS } from './steps.js';
import { BOP_QUOTE, NEW_ACCOUNT } from './schemas.js';
import { ACTIONS } from './actions.js';
import { COMPONENTS } from './components.js';
import { NESTED_CONDITIONALS } from './conditionals.js';
import { createNode, getRadioValue, getFormElement, getClosest, getInputValue } from './helpers.js';
import { tippet } from './libs/tippet.js';

const ACCOUNT_LIST = document.getElementById('accountsList');
const QUOTE_FLOW = document.getElementById('quoteFlow');
const BOP_CONTAINER = document.getElementById('bopQuote');
const ACCOUNT_WRAPPER = document.getElementById('accountWrapper');
const POLICY_DETAIL_WRAPPER = document.querySelector('.policy-detail-wrapper');
const FLOW_TITLE = document.getElementById('flowTitle');

const animateStepTransition = () => {
  QUOTE_FLOW.classList.remove('animate-transition');
  QUOTE_FLOW.setAttribute('width', QUOTE_FLOW.offsetWidth);
  QUOTE_FLOW.classList.add('animate-transition');
};


const handleInput = (e) => {
  const inputResult = getInputValue(e);
  const addingBuildings = STATE.schema[0].title === 'Basic info' && STATE.index > 1;
  if(addingBuildings) {
    STATE.quote.buildings[STATE.index - 2][inputResult.id] = inputResult.value;
  }
  else {
    STATE.quote[inputResult.id] = inputResult.value;
  }
  console.log(STATE)
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
  document.getElementById('newAccount').onclick = () => {
    STATE.schema = NEW_ACCOUNT;
    BOP_CONTAINER.classList.remove('hidden');
    BOP_CONTAINER.classList.add('new-account-open');
    ACCOUNT_WRAPPER.classList.add('account-open');
    FLOW_TITLE.innerText = 'New Account';
    render(QUOTE_FLOW, COMPONENTS.views.step(NEW_ACCOUNT[0]));
  };

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
