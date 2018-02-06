import { STEPS, ACTION_COMPONENTS } from './steps.js';
import { COMPONENTS } from './components.js';
import { createNode, getRadioValue, getFormElement, getClosest } from './helpers.js';
import { tippet } from './libs/tippet.js';

const STATE = {
  index: 0,
  quote: {}
};

const APP = document.getElementById('app');
const PROGRESSBAR = document.getElementById('progressBar');

const ACTIONS = {
  navigate: (direction) => {
    const scrollElement = document.documentElement || document.body;
    let progress;
    scrollElement.scrollTop = 0;
    STATE.index += direction;
    progress = (((STATE.index) / (SCHEMA.length - 1)) * 100).toFixed(0);
    animateStepTransition();
    setTimeout(function() {
      render(APP, COMPONENTS.views.step(SCHEMA[STATE.index]));
      PROGRESSBAR.setAttribute('style', `transform: translate3d(${progress}%, 0, 0)`);
    }, 150);
  },
  advanceStep: () => {
    ACTIONS.navigate(1);
  },
  previousStep: () => {
    ACTIONS.navigate(-1);
  },
  addAdditionalInsured: () => {
    STATE.quote.additionalInsureds = STATE.quote.additionalInsureds || [];
    if(STATE.quote.additionalInsuredType) {
      STATE.quote.additionalInsureds.push({
        name: STATE.quote.additionalInsuredBizName || STATE.quote.additionalInsuredFirstName + STATE.quote.additionalInsuredLastName,
        address: STATE.quote.additionalInsuredBizAddress || STATE.quote.additionalInsuredPersonAddress
      });
      sanitizeInputs(SCHEMA[8].inputs);
    }
    ACTIONS.navigate(0);
  },
  maskMoney: (event) => {
    let val = event.target.value.toString();
    let commator = 3;
    val = val.replace(/\,/g,'');
    val = val.replace(/\$/g,'');
    val = val.replace(/\D/g,'');
    let len = val.length;
    while(commator < len) {
      let comma = len - commator;
      val = val.splice(comma, 0, ',');
      commator += 3;
    }
    event.target.value = '$' + val;
  },
  maskTelephone: (event) => {
    let val = event.target.value.toString();
    val = val.replace(/\,/g,'');
    val = val.replace(/\$/g,'');
    val = val.replace(/\D/g,'');
    let len = val.length;
    if(len >= 3) {
      val = val.splice(3, 0, '-');
    }
    if(len >= 7) {
      val = val.splice(7, 0, '-');
    }
    event.target.value = val;
  },
  bindGoogleSearchAPI: (el) => {
    const locationAddress = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (
        el), {
      componentRestrictions: {country: "US"}
    });
  }
};

const animateStepTransition = () => {
  APP.classList.remove('animate-transition');
  APP.setAttribute('width', APP.offsetWidth);
  APP.classList.add('animate-transition');
};


const getInputValue = (e) => {
  const el = e.target || e;
  const type = el.getAttribute('type') || 'select';
  let id;
  const value = type === 'radio' ? getRadioValue(document.querySelectorAll(`[name=${el.getAttribute('name')}]`)) : el.value;
  switch(type) {
    case 'radio':
      id = el.getAttribute('name', 'radio');
      break;
    case 'range':
      id = el.getAttribute('name');
      break;
    case 'number':
      id = el.getAttribute('name');
      break;
    case 'text':
      id = el.getAttribute('id');
      break;
    case 'date':
      id = el.getAttribute('id');
      break;
    case 'select':
      id = el.getAttribute('id');
      break;
    case 'checkbox':
      id = el.getAttribute('id');
      break;
  }
  return {
    id: id,
    value: value
  };
};

const sanitizeInputs = (inputs) => {
  inputs.forEach(input => {
    delete STATE.quote[input];
  });
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
      'eblDeductible',
      'eblConsecutiveYears'
    ]
  },
  'eplCoverage': {
    'Yes': [
      'eplCoverageRetroactiveDate',
      'eplEachEmployeeLimit',
      'eplAggregateLimit',
      'eplDeductible',
      'eplConsecutiveYears'
    ]
  },
  'cyberLiability': {
    'Yes': [
      'cyberRetroactiveDate',
      'cyberAggregateLimit',
      'cyberDeductible'
    ]
  },
  'additionalInsuredType': {
    'Person': [
      'additionalInsuredFirstName',
      'additionalInsuredLastName',
      'additionalInsuredPersonAddress',
      'additionalInsuredPersonAddressType',
      'addAdditionalInsured'
    ],
    'Business': [
      'additionalInsuredBizName',
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

const SCHEMA = [
  {
    title: 'New Account',
    inputs: [
      'legalBusinessName',
      'doesBusinessAs',
      'legalEntityType',
      'policyHolderPhoneNumber',
      'policyHolderEmail',
      'mailingAddress'
    ],
    actions: [
      'createAccount'
    ]
  },
  {
    title: 'New Quote',
    inputs: [
      'locationSameAsMailing',
      'locationAddress'
    ],
    actions: [
      'previousStep',
      'nextStep'
    ]
  },
  {
    title: 'Building Eligibility',
    inputs: [
      'buildingClassCode',
      'numEmployees',
      'yearBuilt',
      'yearRoofReplaced',
      'constructionType',
      'areaSquareFeet',
      'numStories',
      'plumbingElectricalUpdated',
      'sprinklerSystem',
      'burglerAlarm',
      'fireAlarm',
      'totalSales',
      'liquorSales',
      'payroll',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Building Coverage',
    inputs: [
      'buildingDeductible',
      'buildingCoverage',
      'buildingPersonalPropertyCoverage',
      'businessIncomeExtraExpensePeriod',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Building Coverage',
    inputs: [
      'equipmentBreakdown',
      'greenUpgrades',
      'utilityServicesTimeElement',
      'utilityServicesDirectDamage',
      'additionalDebrisRemoval',
      'spoilage',
      'Ordinance or Law Coverage',
      'ordinanceOrLawOne',
      'ordinanceOrLawTwoThree',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Building',
    inputs: [
      'additionalBuilding'
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Building',
    inputs: [
      'additionalLocation'
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Liability Coverages',
    inputs: [
      'liabilityAndMedical',
      'glAggregateLimit',
      'medicalExpenses',
      'glDamageToRentedPremises',
      'eblCoverage',
      'eblCoverageRetroactiveDate',
      'eblEachEmployeeLimit',
      'eblAggregateLimit',
      'eblDeductible',
      'eblConsecutiveYears',
      'eplCoverage',
      'eplCoverageRetroactiveDate',
      'eplEachEmployeeLimit',
      'eplAggregateLimit',
      'eplDeductible',
      'eplConsecutiveYears',
      'actsOfTerror',
      'cyberLiability',
      'cyberRetroactiveDate',
      'cyberAggregateLimit',
      'cyberDeductible',
      'employeeDishonestyLimit',
      'Class Coverages',
      'professionalLiability',
      'snowPlowProducts',
      'hiredNonOwnedAutoCoverage',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Insureds',
    elements: [
      'additionalInsuredAdded'
    ],
    inputs: [
      'additionalInsuredType',
      'additionalInsuredBizName',
      'additionalInsuredBizAddress',
      'additionalInsuredBizAddressType',
      'addAdditionalInsured',
      'additionalInsuredFirstName',
      'additionalInsuredLastName',
      'additionalInsuredPersonAddress',
      'additionalInsuredPersonAddressType',
      'addAdditionalInsured'
    ],
    actions: [
      'previousStep',
      'reviewSummary'
    ],
  },
  {
    title: 'Quote Summary',
    elements: [
      'summary'
    ],
    actions: [
      'previousStep',
      'reviewSummary'
    ],
  }
];

const render = (container, component) => {
  container.innerHTML = component;

  const inputs = container.querySelectorAll('input, select');
  const actions = container.querySelectorAll('.button');

  if(actions) {
    bindActionEvents(actions);
  }
  if(inputs){
    bindInputEvents(inputs);
    inputs.forEach(input => {
      handleConditionalLogic(getInputValue(input));
    });
  }

  tippet.init();
};

render(APP, COMPONENTS.views.step(SCHEMA[STATE.index]));

export { STATE, SCHEMA, sanitizeInputs };
