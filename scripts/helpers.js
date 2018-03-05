import { STATE } from './state.js';

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const createNode = (template) => {
  const frag = document.createElement('div');
  frag.innerHTML = template;
  // nodes.appendChild(frag);
  return frag;
};

const getRadioValue = (radios) => {
  let result;
  radios.forEach(radio => {
    if(radio.checked) {
      result = radio.nextElementSibling.innerText;
    }
  });
  return result;
};

const getFormElement = (id) => {
  const el = document.getElementById(id) || document.querySelector(`[name=${id}`);
  const form = getClosest(el, '.form-group') || el;
  return form;
};

const createPhoneNumbers = () => {
  const results = [];
  for(let i = 0; i < 100000000000; i++) {
    let number = (100000000000 - i).toString();
    number.splice(3, 0, '-');
    number.splice(6, 0, '-');
    results.push(number);
  }
  return results;
};

const getClosest = function ( elem, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get closest match
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}

	return null;
};

const getInputValue = (e) => {
  const el = e.target || e;
  const type = el.getAttribute('type') || 'select';
  let id;
  let value = el.value;
  switch(type) {
    case 'radio':
      id = el.getAttribute('name', 'radio');
      value = getRadioValue(document.querySelectorAll(`[name=${el.getAttribute('name')}]`));
      break;
    case 'range':
      id = el.getAttribute('name');
      value = el.nextElementSibling.innerText;
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
      value = el.checked;
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

const deselectAccounts = () => {
  const accounts = document.querySelectorAll('#accountsList li');
  accounts.forEach(account => {
    account.classList.remove('account-selected');
  });
};

const adjustProgressBar = (length) => {
  const PROGRESSBAR = document.getElementById('progressBar');
  let progress;
  progress = (((STATE.index + 1) / length) * 100).toFixed(0);
  PROGRESSBAR.setAttribute('style', `width: ${progress}%`);
};

const getIndices = () => {
  let locationIndex = -1;
  let buildingIndex = -1;

  for(let i = 0; i < STATE.index + 1; i++) {
    const type = STATE.schema[i].type;
    if(type === 'location') {
      locationIndex++;
      buildingIndex = -1;
    }
    if(type === 'building') {
      buildingIndex++;
    }
  }
  return {
    location: locationIndex < 0 ? 0 : locationIndex,
    building: buildingIndex < 0 ? 0 : buildingIndex
  };
};

export {
  createNode,
  getRadioValue,
  getFormElement,
  getClosest,
  getInputValue,
  sanitizeInputs,
  deselectAccounts,
  adjustProgressBar,
  getIndices
};
