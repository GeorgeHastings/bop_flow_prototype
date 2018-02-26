import {
  animateStepTransition,
  render,
  QUOTE_FLOW,
  POLICY_DETAIL_WRAPPER,
  BOP_CONTAINER,
  ACCOUNT_WRAPPER,
  ACCOUNT_LIST
} from './app.js';
import { STATE } from './state.js';
import { NEW_ACCOUNT, BOP_QUOTE } from './schemas.js';
import { ACCOUNTS } from './accounts.js';
import { generateAccount } from './accountgen.js';
import { deselectAccounts, sanitizeInputs, adjustProgressBar } from './helpers.js';
import { COMPONENTS } from './components.js';
import { bindNaicsEvents } from './modules/naics.js';

// const SCHEMAS = {
//   'NEW_ACCOUNT': NEW_ACCOUNT,
//   'BOP_QUOTE': BOP_QUOTE
// };

export const ACTIONS = {
  navigate: (direction) => {
    const scrollElement = document.getElementById('bopQuote');
    STATE.index += direction;
    animateStepTransition();
    setTimeout(function() {
      scrollElement.scrollTop = 0;
      render(QUOTE_FLOW, COMPONENTS.views.quoteFlow(STATE.index));
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
    const naicsInput = document.getElementById('naicsInput');
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
    render(document.getElementById('accountDetail'), COMPONENTS.views.accountDetail(account));
    render(document.getElementById('policyContainer'), COMPONENTS.views.accountPolicyList(account.quotes));
  },
  closePanelModal: () => {
    BOP_CONTAINER.classList.add('hidden');
    BOP_CONTAINER.classList.remove('new-account-open');
    ACCOUNT_WRAPPER.classList.remove('quote-open');
    ACCOUNT_WRAPPER.classList.remove('account-open');
    STATE.index = 0;
    adjustProgressBar(STATE.schema.length);
  },
  startNewQuote: () => {
    STATE.schema = BOP_QUOTE;
    BOP_CONTAINER.classList.remove('hidden');
    ACCOUNT_WRAPPER.classList.add('quote-open');
    document.getElementById('flowTitle').innerText = 'New BOP Quote';
    adjustProgressBar(STATE.schema.length);
    // render(document.getElementById('toastLoader'), COMPONENTS.elements.toastLoader());
    render(QUOTE_FLOW, COMPONENTS.views.quoteFlow(0));
  },
  createAccount: () => {
    const newAccount = generateAccount();
    newAccount.quotes = [];
    ACCOUNTS.unshift(newAccount);
    ACTIONS.closePanelModal();
    render(ACCOUNT_LIST, COMPONENTS.views.accounts());
    ACTIONS.showAccountDetail(0);
  },
  addMultiBuildings: () => {
    const bldgs = parseInt(STATE.quote.numLocations);
    for(let i = 1; i < bldgs; i++) {
      const action = i >= bldgs - 1 ? 'createAccount' : 'nextStep';
      let newStep = JSON.parse(JSON.stringify(NEW_ACCOUNT[2]));
      newStep.title = `Building ${i + 1}`;
      newStep.actions.pop();
      newStep.actions.push(action);
      NEW_ACCOUNT.push(newStep);
    }
    ACTIONS.advanceStep();
  },
  getQuote: () => {
    BOP_CONTAINER.classList.add('hidden');
    document.getElementById('accountWrapper').classList.remove('quote-open');
    let options = {
      type: 'Business Owners Policy',
      status: 'quoted',
      premium: '$2,350',
      style: 'quote-quoting'
    };
    document.getElementById('policyContainer').innerHTML += COMPONENTS.elements.quoteListing(options);
    setTimeout(() => {
      const newQuote = document.getElementById('policyContainer').querySelector('.policy:last-child');
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
