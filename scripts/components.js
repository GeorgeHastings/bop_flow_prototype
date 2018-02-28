import { STEPS, ACTION_COMPONENTS } from './steps.js';
import { STATE } from './state.js';
import { sanitizeInputs } from './helpers.js';
import { BOP_QUOTE } from './schemas.js';
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
      <input id="${options.id}" type="checkbox" ${options.checked ? 'checked' : ''}/>
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
      const progress = (((STATE.index + 1) / (BOP_QUOTE.length)) * 100).toFixed(0);
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
          ${BOP_QUOTE.map((step, index) => {
            if(index > -1) {
              return `<li data-onclick="jumpToStep" data-index="${index}" ${selected === index ? `class="selected"`: ''}>${step.title}</li>`;
            }
          }).join(' ') }
        </ul>
      `;
    },
    loader: (color) => {
      return `
        <svg width="60" height="60" class="loader" viewBox="0 0 44 37" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(1 1)" fill="${color}" stroke="${color}" stroke-width=".5" fill-rule="evenodd">
            <polygon transform="scale(-1 1) rotate(25 0 -65.682)" points="18.3696412 23.6266976 17.610605 10.729616 19.1286773 10.729616"/>
            <polygon transform="scale(-1 1) rotate(57 0 -9.025)" points="15.5865086 26.1304155 14.8274725 13.233334 16.3455448 13.233334"/>
            <polygon transform="matrix(0 1 1 0 -8.674 8.674)" points="14.3599162 29.482746 13.6008801 16.5856645 15.1189524 16.5856645"/>
            <polygon transform="rotate(-119 10.88 28.604)" points="10.8795181 40.0594874 9.61445783 17.147534 12.1445783 17.147534"/>
            <polygon transform="rotate(-155 18.37 28.89)" points="18.3696412 35.3387944 17.610605 22.4417129 19.1286773 22.4417129"/>
            <polygon transform="scale(1 -1) rotate(25 153.998 0)" points="23.6828942 35.3387944 22.923858 22.4417129 24.4419303 22.4417129"/>
            <polygon transform="scale(1 -1) rotate(61 79.68 0)" points="31.1204819 40.0594874 29.8554217 17.147534 32.3855422 17.147534"/>
            <polygon transform="rotate(90 27.517 23.034)" points="27.5165427 29.482746 26.7575066 16.5856645 28.2755789 16.5856645"/>
            <polygon transform="rotate(57 26.213 19.682)" points="26.2130147 26.1304155 25.4539785 13.233334 26.9720508 13.233334"/>
            <polygon transform="rotate(25 23.683 17.178)" points="23.6828942 23.6266976 22.923858 10.729616 24.4419303 10.729616"/>
            <polygon points="21 23.0342052 19.7349398 0.122251854 22.2650602 0.122251854"/>
          </g>
        </svg>`;
    },
    toastLoader: () => {
      return `
        <div class="toast-spinner">${COMPONENTS.elements.loader('#fff')}</div>
        <div class="toast-message"></div>`;
    },
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
      const showBreadCrumbs = !document.querySelector('.new-account-open');
      return `
        ${showBreadCrumbs ? COMPONENTS.elements.breadCrumbs(index) : ''}
        ${COMPONENTS.views.step(STATE.schema[index])}
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
        return `<img id="emptyState" style="-webkit-filter: grayscale(1); filter: grayscale(1); opacity: 0.25" src="https://i.pinimg.com/originals/13/7c/a9/137ca9e2a4de70b11d0ae475997e8004.gif">`;
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
      const query = account.name.split('Dba')[0];
      console.log(query)
      return `
        <iframe
        width="500"
        height="200"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyASP82h4Dj6so3GHv1ngvdFcm7ypWqcAP0
          &q=${STATE.quote.doesBusinessAs || query}" allowfullscreen>
        </iframe>
        <div class="account-detail-content">
          <div class="account-info">
            <h3>${STATE.quote.doesBusinessAs || query}</h3>
            <div class="account-info-wrapper">
              <div class="account-contact-info">
                <ul class="contact-info">
                  <li>${account.contactInfo.phone}</li>
                  <li><a>${account.contactInfo.email}</a></li>
                  <li>${STATE.quote.mailingAddress || account.contactInfo.mailingAddress}</li>
                </ul>
              </div>
              <hr>
              <h4>Operations info</h4>
              <div class="account-detail-group">
                <div class="account-detail-item">
                  <h6>NAICS</h6>
                  <p>722515</p>
                </div>
                <div class="account-detail-item">
                  <h6>Annual Revenue</h6>
                  <p>$450,000</p>
                </div>
                <div class="account-detail-item">
                  <h6>Total Payroll</h6>
                  <p>$180,000</p>
                </div>
                <div class="account-detail-item">
                  <h6>No. Employees</h6>
                  <p>5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
};
