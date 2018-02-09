import { STATE } from './state.js';
import { STEPS, ACTION_COMPONENTS } from './steps.js';
import { SCHEMA } from './bopschema.js';
import { ACTIONS } from './actions.js';
import { COMPONENTS } from './components.js';
import { createNode, getRadioValue, getFormElement, getClosest, getInputValue } from './helpers.js';
import { tippet } from './libs/tippet.js';

const ACCOUNT_LIST = document.getElementById('accountsList');
const QUOTE_FLOW = document.getElementById('quoteFlow');
const PROGRESSBAR = document.getElementById('progressBar');
const BOP_CONTAINER = document.getElementById('bopQuote');
const ACCOUNT_WRAPPER = document.getElementById('accountWrapper');
const POLICY_DETAIL_WRAPPER = document.querySelector('.policy-detail-wrapper');

const animateStepTransition = () => {
  QUOTE_FLOW.classList.remove('animate-transition');
  QUOTE_FLOW.setAttribute('width', QUOTE_FLOW.offsetWidth);
  QUOTE_FLOW.classList.add('animate-transition');
};


const handleInput = (e) => {
  const inputResult = getInputValue(e);
  STATE.quote[inputResult.id] = inputResult.value;
  console.log(STATE.quote);
  handleConditionalLogic(inputResult);
};

const NESTED_CONDITIONALS = {
  'locationSameAsMailing': {
    'No': [
      'locationAddress'
    ]
  },
  'eblCoverage': {
    'Yes': [
      'eblCoverageRetroactiveDate',
      'eblEachEmployeeLimit',
      'eblAggregateLimit',
      'eblDeductible'
    ]
  },
  'eplCoverage': {
    'Yes': [
      'eplCoverageRetroactiveDate',
      'eplEachEmployeeLimit',
      'eplAggregateLimit',
      'eplDeductible'
    ]
  },
  'cyberLiability': {
    'Yes': [
      'cyberRetroactiveDate',
      'cyberAggregateLimit',
      'cyberDeductible'
    ]
  },
  'additionalInsuredOption': {
    'Yes': [
      'additionalInsuredBizName',
      'additionalInsuredBizType',
      'additionalInsuredBizAddress',
      'additionalInsuredBizAddressType',
      'addAdditionalInsured'
    ]
  },
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
  document.getElementById('newQuote').onclick = () => {
    BOP_CONTAINER.classList.remove('hidden');
    ACCOUNT_WRAPPER.classList.add('quote-open');
    render(QUOTE_FLOW, COMPONENTS.views.step(SCHEMA[0]));
  };

  document.getElementById('closeQuote').onclick = () => {
    BOP_CONTAINER.classList.add('hidden');
    ACCOUNT_WRAPPER.classList.remove('quote-open');
  };

  document.getElementById('closeQuoteDetail').onclick = () => {
    POLICY_DETAIL_WRAPPER.classList.add('hidden');
  };
};

const render = (container, component) => {
  container.innerHTML = component;

  const inputs = container.querySelectorAll('input, select');
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

export { STATE, SCHEMA, animateStepTransition, render, QUOTE_FLOW, BOP_CONTAINER, PROGRESSBAR, POLICY_DETAIL_WRAPPER };
