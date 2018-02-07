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
  return getClosest(el, '.form-group');
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
      value = 'Yes';
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

export {
  createNode,
  getRadioValue,
  getFormElement,
  getClosest,
  getInputValue,
  sanitizeInputs,
  deselectAccounts
};
