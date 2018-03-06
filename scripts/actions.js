import {
  animateStepTransition,
  render,
  POLICY_DETAIL_WRAPPER
} from './app.js';
import { STATE } from './state.js';
import { NEW_ACCOUNT, BOP_QUOTE } from './schemas.js';
import { ACCOUNTS } from './accounts.js';
import { generateAccount } from './accountgen.js';
import { deselectAccounts, sanitizeInputs, adjustProgressBar, getIndices, $ } from './helpers.js';
import { COMPONENTS } from './components.js';
import { bindNaicsEvents } from './modules/naics.js';

export const ACTIONS = {
  navigate: (direction) => {
    const scrollElement = $('bopQuote');
    STATE.index += direction;
    animateStepTransition();
    setTimeout(function() {
      scrollElement.scrollTop = 0;
      render($('quoteFlow'), COMPONENTS.views.quoteFlow(STATE.index));
      adjustProgressBar(STATE.schema.length);
    }, 150);
  },
  advanceStep: () => {
    ACTIONS.navigate(1);
  },
  previousStep: () => {
    ACTIONS.navigate(-1);
  },
  jumpToStep: (e) => {
    const index = e.target.getAttribute('data-index') || e;
    const inc = index - STATE.index;
    ACTIONS.navigate(inc);
  },
  addAdditionalInsured: () => {
    STATE.quote.additionalInsureds = STATE.quote.additionalInsureds || [];
    if(STATE.quote.additionalInsuredOption) {
      STATE.quote.additionalInsureds.push({
        name: STATE.quote.additionalInsuredBizName,
        address: STATE.quote.additionalInsuredBizAddress
      });
      sanitizeInputs(STATE.schema[8].inputs);
    }
    ACTIONS.navigate(0);
  },
  maskMoney: (event) => {
    let el = event.target || event;
    let val = el.value.toString();
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
    el.value = '$' + val;
  },
  sliderMaskMoney: (event) => {
    let el = event.target;
    let output = el.nextElementSibling;
    output.value = el.value;
    ACTIONS.maskMoney(output);
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
  },
  bindNaicsSelector: () => {
    const naicsInput = $('naicsInput');
    bindNaicsEvents(naicsInput);
  },
  openPolicyDetail: () => {
    POLICY_DETAIL_WRAPPER.classList.remove('hidden');
  },
  showAccountDetail: (e) => {
    let index = e.target ? e.target.getAttribute('data-index') : e;
    const account = ACCOUNTS[index];
    deselectAccounts();
    document.querySelectorAll('#accountsList li')[index].classList.add('account-selected');
    render($('accountDetail'), COMPONENTS.views.accountDetail(account));
    render($('policyContainer'), COMPONENTS.views.accountPolicyList(account.quotes));
  },
  closePanelModal: () => {
    $('bopQuote').classList.add('hidden');
    $('bopQuote').classList.remove('new-account-open');
    $('accountWrapper').classList.remove(...['quote-open', 'account-open']);
    STATE.index = 0;
    adjustProgressBar(STATE.schema.length);
  },
  startNewQuote: () => {
    STATE.schema = STATE.schema || JSON.parse(JSON.stringify(BOP_QUOTE));
    $('bopQuote').classList.remove('hidden');
    $('accountWrapper').classList.add('quote-open');
    $('flowTitle').innerText = 'New BOP Quote';
    adjustProgressBar(STATE.schema.length);
    // render($('toastLoader'), COMPONENTS.elements.toastLoader());
    render($('quoteFlow'), COMPONENTS.views.quoteFlow(0));
  },
  startNewAccount: () => {
    STATE.schema = JSON.parse(JSON.stringify(NEW_ACCOUNT));
    console.log(STATE.schema)
    $('bopQuote').classList.remove('hidden');
    $('bopQuote').classList.add('new-account-open');
    $('accountWrapper').classList.add('account-open');
    $('flowTitle').innerText = 'New Account';
    render($('quoteFlow'), COMPONENTS.views.quoteFlow(0));
  },
  createAccount: () => {
    const newAccount = generateAccount();
    const base = BOP_QUOTE[0];
    const TITLES = [];
    newAccount.quotes = [];
    ACCOUNTS.unshift(newAccount);
    ACTIONS.closePanelModal();
    ACTIONS.showAccountDetail(0);
    $('bopQuote').scrollTop = 0;
    STATE.quote.buildings = [];
    STATE.schema = JSON.parse(JSON.stringify(BOP_QUOTE));

    STATE.quote.locations.forEach((loc, index) => {
      loc.buildings.forEach((bldg, bindex) => {
        const newbldg = {};
        base.inputs.forEach(input => {
          location[input] = null;
        });
        newbldg.title = `Loc ${index + 1}/Bldg ${bindex + 1} Coverage`;
        STATE.quote.buildings.push(newbldg);
        TITLES.unshift(`Loc ${index + 1}/Bldg ${bindex + 1} Coverage`);
      });
    });

    STATE.schema.shift();

    for(let i = 0; i < STATE.quote.buildings.length; i++){
      let newStep = JSON.parse(JSON.stringify(base));
      newStep.title = TITLES[i];
      STATE.schema.unshift(newStep);
    }
    render($('accountsList'), COMPONENTS.views.accounts());
  },
  addMultiLocations: () => {
    const locations = STATE.quote.numLocations || 1;
    const locationSteps = [];
    const base = {
      title: 'Location 1',
      type: 'location',
      inputs: [
        'locationAddress',
        'totalSales',
        'payroll',
        'numEmployees',
        'numBuildings',
        'tooManyBuildings'
      ],
      actions: [
        'previousStep',
        'chooseNumBuildings'
      ]
    };

    STATE.quote.locations = [];

    for(let i = 0; i < locations; i++) {
      let newStep = JSON.parse(JSON.stringify(base));
      newStep.title = `Location ${i + 1}`;
      locationSteps.push(newStep);

      const location = {};
      base.inputs.forEach(input => {
        location[input] = null;
      });
      location.numBuildings = '1';
      location.name = newStep.title;
      location.buildings = [];
      STATE.quote.locations.push(location);
    }

    const getExistingLocations = () => {
      let count = 0;
      STATE.schema.forEach(step => {
        if(step.type && step.type === 'location') {
          count++;
        }
      });
      return count;
    };
    STATE.schema.splice(1, getExistingLocations());
    STATE.schema.splice(1, 0, ...locationSteps);
    ACTIONS.advanceStep();

  },
  addMultiBuildings: () => {
    const indices = getIndices();
    const bldgs = STATE.quote.locations[indices.location].numBuildings || 1;
    const buildingSteps = [];
    const base = {
      title: 'Building 1',
      type: 'building',
      inputs: [
        'buildingLessorsRisk',
        'buildingClassCode',
        'buildingCoverage',
        'buildingPersonalPropertyLimit',
        'yearBuilt',
        'constructionType',
        'areaSquareFeet',
        'numStories',
        'yearRoofReplaced',
        'plumbingElectricalUpdated',
        'sprinklerSystem',
        'burglerAlarm',
        'fireAlarm',
      ],
      actions: [
        'previousStep',
        'nextStep'
      ]
    };

    STATE.quote.locations[indices.location].buildings.length = 0;

    for(let i = 0; i < bldgs; i++) {
      const action = i >= bldgs - 1 && STATE.index === STATE.schema.length - 1 ? 'createAccount' : 'nextStep';
      let newStep = JSON.parse(JSON.stringify(base));
      newStep.title = `Loc ${indices.location + 1} / Bldg ${i + 1}`;
      newStep.actions.pop();
      newStep.actions.push(action);
      buildingSteps.push(newStep);

      const building = {};
      base.inputs.forEach(input => {
        building[input] = null;
      });
      building.name = newStep.title;
      STATE.quote.locations[indices.location].buildings.push(building);
    }

    const getNumBuildings = () => {
      let count = 0;
      for(let i = STATE.index; i < STATE.schema.length; i++) {
        if(STATE.schema[i+1].type && STATE.schema[i+1].type === 'building') {
          count++;
        }
        else {
          return count;
        }
      }
    };

    if(STATE.schema[STATE.index + 1]) {
      STATE.schema.splice(STATE.index+1, getNumBuildings());
    }

    STATE.schema.splice(STATE.index+1, 0, ...buildingSteps);
    ACTIONS.advanceStep();
  },
  getQuote: () => {
    $('bopQuote').classList.add('hidden');
    if($('emptyState')){
      $('emptyState').remove();
    };

    $('accountWrapper').classList.remove('quote-open');
    let options = {
      type: 'Business Owners Policy',
      status: 'quoted',
      premium: '$2,350',
      style: 'quote-quoting'
    };
    $('policyContainer').innerHTML += COMPONENTS.elements.quoteListing(options);
    setTimeout(() => {
      const newQuote = $('policyContainer').querySelector('.policy:last-child');
      newQuote.classList.remove('quote-quoting');
      newQuote.onclick = ACTIONS.openPolicyDetail;
      const src = `https://georgehastings.github.io/rome/assets/sounds/chaching.mp3`;
      const sound = document.createElement('audio');
      sound.setAttribute('src', src);
      sound.play();
      sound.remove();
      STATE.index = 0;
    }, 5000);
  }
};
