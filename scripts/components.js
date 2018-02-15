import { STEPS, ACTION_COMPONENTS } from './steps.js';
import { STATE } from './state.js';
import { sanitizeInputs } from './helpers.js';
import { SCHEMA } from './bopschema.js';
import { ACCOUNTS } from './accounts.js';
import { generateAccount } from './accountgen.js';
import { tippet } from './libs/tippet.js';

export const COMPONENTS = {
  inputs: {
    input: (options) => `
      <input type="${options.type}" class="${options.style || ''}" id="${options.id}" placeholder="${options.placeholder || ''}" value="${options.value || ''}">
    `,
    location: (options) => `
      <input type="text" class="${options.style || ''}" id="${options.id}" value="${options.value || ''}" data-onload="bindGoogleSearchAPI">
    `,
    naics: (options) => `
      <input type="text" class="${options.style || ''}" id="naicsInput" value="${options.value || ''}" data-onload="bindNaicsSelector" placeholder="${options.placeholder}">
      <div id="naicsResults"></div>
    `,
    money: (options) => `
      <input type="text" class="${options.style || ''}" id="${options.id}" placeholder="${options.placeholder}" value="${options.value || ''}" data-oninput="maskMoney">
    `,
    number: (options) => `
      <div class="number-input">
        <input class="quantity" min="${options.min}" max="${options.max}" name="${options.id}" value="${options.value || ''}" placeholder="0" type="number">
        ${options.increment ? `<button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus"></button>` : ''}
      </div>
    `,
    phoneNumber: (options) => `
      <input type="text" class="${options.style}" id="${options.id}" placeholder="${options.placeholder}" value="${options.value || ''}" data-oninput="maskTelephone">
    `,
    radioGroup: (options) => `
      <div class="radio-group">
        ${options.values.map((value, index) => {
          const checked = value === options.default || options.value === value ? 'checked' : '';
          return `<div class="radio-button">
            <input id="${options.id + index}" type="radio" name="${options.id}" ${checked}>
            <label for=${options.id + index}>${value}</label>
          </div>`;
        }).join(' ')}
      </div>
    `,
    rangeSlider: (options) => `
      <form class="range-slider" data-oninput="sliderMaskMoney">
        <input type="range" name="${options.id}" value="${options.value || options.min}" min="${options.min}" max="${options.max}" step="${options.step}"/>
        <output name="result">$${options.value}</output>
      </form>
    `,
    dropDown: (options) => `
      <select id=${options.id} value="${options.value || ''}">
        <option class="placeholder" selected disabled value="">Choose one</option>
        ${options.values.map((value) => {
          return `<option value="${value}" ${options.value === value ? 'selected' : ''}>${value}</option>`;
        }).join(' ')}
      </select>
    `,
    checkBox: (options) => `
      <input id="${options.id}" type="checkbox" />
      <label for="${options.id}">${options.label}</label>
    `,
    date: (options) => `
      <input type="text" class="${options.style || ''}" id="${options.id}" placeholder="${options.placeholder}" value="${options.value || ''}" data-valid-example="05/18/2019" pattern="(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/\d{4}">
    `,
    submit: (options) => COMPONENTS.actions.button(options)
  },
  actions: {
    button: (options) => `<div id="${options.id}" class="button ${options.style || ''}" data-onclick="${options.action}">${options.label}</div>`
  },
  elements: {
    progressBar: (options) => {
      const progress = (((STATE.index + 1) / (SCHEMA.length)) * 100).toFixed(0);
      return `<div class="prog-bar" style="width: ${progress}%;"></div>`;
    },
    additionalInsuredAdded: () => {
      if(STATE.quote.additionalInsureds) {
        return STATE.quote.additionalInsureds.map(element => {
          return `
            <div class="additional-insured">
              <p>${element.name}</p>
              <p>${element.address}</p>
            </div>
          `;
        }).join(' ');
      }
    },
    quoteListing: (options) => {
      return `
        <div class="policy ${options.style || ''}" data-onclick="openPolicyDetail">
          <div class="policy-icon"><img src="assets/images/store.svg"></div>
          <div class="policy-info">
            <span>${options.type}</span>
            <span class="tag ${options.status}">${options.status}</span>
            <span>2/15/18</span>
            <b>${options.premium}</b>
          </div>
        </div>
      `;
    },
    summary: () => {
      let summary = '';
      for(let prop in STATE.quote) {
        if(!Array.isArray(STATE.quote[prop])) {
          if(STEPS[prop]) {
            summary += `<p class="flex-row ${STEPS[prop].hidden ? 'indent' : ''}"><span>${STEPS[prop].label}:</span><span>${STATE.quote[prop]}</span></p>`;
          }
        }
      }
      return `
        <div class="summary-container">
          ${summary}
        </div>
      `;
    },
    breadCrumbs: (selected) => {
      return `
        <ul class="breadcrumb-container" id="breadcrumbs">
          ${SCHEMA.map((step, index) => {
            if(index > 0) {
              return `<li data-onclick="jumpToStep" data-index="${index}" ${selected === index ? `class="selected"`: ''}>${step.title}</li>`;
            }
          }).join(' ') }
        </ul>
      `;
    }
  },
  views: {
    step: (step) => {
      return `
        <div class="question-container">
          ${step.title ? `<h3>${step.title}</h3>` : ''}
          ${step.elements ? step.elements.map(element => {
            return COMPONENTS.elements[element]();
          }).join(' ') : ''}
          ${step.inputs ? step.inputs.map(input => {
            if(!STEPS[input]) {
              return `<h4>${input}</h4>`;
            }
            input = STEPS[input];
            const valueHasBeenEntered = STATE.quote[input.id];
            const conditional = input.hidden !== undefined && input.hidden === false;
            input.value = valueHasBeenEntered || input.value;
            input.label = input.label && input.tooltip ? input.label.replace('*tooltip*', input.tooltip) : input.label;
            return `
              <div class="form-group ${input.hidden ? 'hidden' : ''} ${conditional ? 'child-indent' : ''} ${input.size ? input.size : 'skip'}">
                ${input.label && input.component !== 'checkBox' && input.component !== 'submit' ? `<label>${input.label}</label>` : ''}
                ${COMPONENTS.inputs[input.component](input ? input : '')}
                ${input.description ? `<p class="note">${input.description}</p>` : ''}
              </div>`;
          }).join(' ') : ''}
          <hr>
          <div class="button-group">
            ${step.actions.map(action => {
              action = ACTION_COMPONENTS[action];
              return COMPONENTS.actions[action.component](action);
            }).join(' ')}
          </div>
        </div>`;
    },
    quoteFlow: (index) => {
      return `
        ${COMPONENTS.elements.breadCrumbs(index)}
        ${COMPONENTS.views.step(SCHEMA[index])}
      `;
    },
    accountPolicyList: (quotes) => {
      if(quotes.length > 0) {
        return `${quotes.map(quote => {
          return COMPONENTS.elements.quoteListing(quote);
        }).join(' ')}
        `;
      }
      else {
        return `<img src="assets/images/emptystate.png">`;
      }
    },
    accounts: () => {
      return `
        ${ACCOUNTS.map((account, index) => {
          return `<li data-index="${index}" data-onclick="showAccountDetail">${account.name}</li>`;
        }).join(' ')}
      `;
    },
    accountDetail: (account) => {
      return `
        <div class="header small-pad">
          <h5>Account details</h5>
          <div class="button button-small button-secondary">Edit</div>
        </div>
        <div class="account-detail-content">
          <div class="account-info">
            <h3>${account.name}</h3>
            <div class="account-info-wrapper">
              <div class="account-contact-info">
                <h5>Contact info</h5>
                <ul class="contact-info">
                  <li>${account.contactInfo.phone}</li>
                  <li><a>${account.contactInfo.email}</a></li>
                  <li>${account.contactInfo.mailingAddress}</li>
                </ul>
              </div>
              <hr>
              <div class="account-detail-item">
                <h5>Account No.</h5>
                <p>${account.number}</p>
              </div>
              <div class="account-detail-item">
                <h5>Billing status</h5>
                ${account.quotes.length > 0 ? `<span class="tag quoted">Paid</span>` : `<span>N/A</span>`}
              </div>
              <div class="account-detail-item">
                <h5>Next invoice due:</h5>
                ${account.quotes.length > 0 ? `<span>3/16/18</span>` : `<span>N/A</span>`}
              </div>
              <hr>
              <div class="account-detail-item">
                <h5>NAICS code</h5>
                <p>Coffee Merchant - 722515</p>
              </div>
              <div class="account-detail-item">
                <h5>Annual Revenue</h5>
                <p>$450,000</p>
              </div>
              <div class="account-detail-item">
                <h5>Total Payroll</h5>
                <p>$180,000</p>
              </div>
              <div class="account-detail-item">
                <h5>Number of employees</h5>
                <p>5</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
};
