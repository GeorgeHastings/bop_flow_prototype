import { animateStepTransition, render, QUOTE_FLOW, PROGRESSBAR, POLICY_DETAIL_WRAPPER, BOP_CONTAINER } from './app.js';
import { STATE } from './state.js';
import { SCHEMA } from './bopschema.js';
import { ACCOUNTS } from './accounts.js';
import { deselectAccounts, sanitizeInputs } from './helpers.js';
import { COMPONENTS } from './components.js';
import { bindNaicsEvents } from './modules/naics.js';

export const ACTIONS = {
  navigate: (direction) => {
    const scrollElement = document.getElementById('bopQuote');
    let progress;
    STATE.index += direction;
    progress = (((STATE.index) / (SCHEMA.length - 1)) * 100).toFixed(0);
    animateStepTransition();
    setTimeout(function() {
      scrollElement.scrollTop = 0;
      render(QUOTE_FLOW, COMPONENTS.views.step(SCHEMA[STATE.index]));
      PROGRESSBAR.setAttribute('style', `width: ${progress}%`);
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
    if(STATE.quote.additionalInsuredOption) {
      STATE.quote.additionalInsureds.push({
        name: STATE.quote.additionalInsuredBizName,
        address: STATE.quote.additionalInsuredBizAddress
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
    }, 8000);
  }
};
