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

export {
  createNode,
  getRadioValue,
  getFormElement,
  getClosest
};
