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
      <input type="text" class="${options.style}" id="${options.id}" value="${options.value || ''}" data-onload="bindGoogleSearchAPI">
    `,
    money: (options) => `
      <input type="text" class="${options.style}" id="${options.id}" placeholder="${options.placeholder}" value="${options.value || ''}" data-oninput="maskMoney">
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
      <form class="range-slider" oninput="result.value=${options.id}.value">
        <input type="range" name="${options.id}" value="${options.value || options.min}" min="${options.min}" max="${options.max}" step="${options.step}"/>
        <output name="result">0</output>
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
    submit: (options) => COMPONENTS.actions.button(options)
  },
  actions: {
    button: (options) => `<div id="${options.id}" class="button ${options.style}" data-onclick="${options.action}">${options.label}</div>`
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
        <div class="policy" data-onclick="openPolicyDetail">
          <div class="policy-icon"></div>
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
          summary += `<p class="flex-row"><b>${STEPS[prop].label}:</b><span>${STATE.quote[prop]}</span></p>`;
        }
      }
      return `
        <div class="summary-container">
          ${summary}
        </div>
      `;
    }
  },
  views: {
    step: (step) => {
      return `
        <h3>${step.title}</h3>
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
            <div class="form-group ${input.hidden ? 'hidden' : ''} ${conditional ? 'child-indent' : ''} ${input.size ? input.size : ''}">
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
        </div>`;
    },
    accountPolicyList: (quotes) => {
      return `${quotes.map(quote => {
        return COMPONENTS.elements.quoteListing(quote);
      }).join(' ')}
      `;
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
          <h5>${account.name}</h5>
          <div class="button button-small button-secondary">Edit</div>
        </div>
        <div class="account-detail-content">
          <div class="account-info">
            <h2>${account.name}</h2>
            <div class="account-info-wrapper">
              <div class="account-summary">
                <h4>Summary</h4>
                <p>${account.summary}</p>
              </div>
              <div class="account-contact-info">
                <h4>Contact info</h4>
                <ul class="contact-info">
                  <li>${account.contactInfo.phone}</li>
                  <li>${account.contactInfo.email}</li>
                  <li>${account.contactInfo.mailingAddress}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
};
