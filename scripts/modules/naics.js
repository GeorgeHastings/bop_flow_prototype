import { NAICS } from '../data/naics_data.js';

let naicsInput = document.getElementById('naicsInput');
let naicsResults = document.getElementById('naicsResults');

var buildNaicsDescs = function() {
  var results = [];
  NAICS.forEach(function(naic) {
    results.push(naic.description.toLowerCase());
  });
  return results;
};

const NAICS_LOCAL = buildNaicsDescs();

var getNaics = function(event) {
  const result = event.target.innerText.toLowerCase();
  const index = NAICS_LOCAL.indexOf(result);
  const naics = NAICS[index].naics;
  const accepted = NAICS[index].naics.isAccepted === 'no' ? 'is not accepted' : 'is accepted';
  naicsInput = document.getElementById('naicsInput');
  naicsInput.value = event.target.innerText;
  naicsResults.style.display = 'none';
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function searchprops(lookUp) {
  naicsResults = document.getElementById('naicsResults');
  var results = NAICS_LOCAL.filter(x => x.includes(lookUp));
  const length = results.length > 50 ? 50 : results.length;
  naicsResults.innerHTML = '';
  naicsResults.style.display = 'block';

  for (var i = 0; i < length; i++) {
    naicsResults.innerHTML += `<li>${toTitleCase(results[i])}</li>`;
  }

  if (results.length == 0) {
    naicsResults.innerHTML = `<li class='no-results'>No results</li>`;
  }

  naicsResults.querySelectorAll('li').forEach(item => {
    item.onclick = getNaics;
  });
}

const bindNaicsEvents = () => {
  const naicsInput = document.getElementById('naicsInput');
  const naicsResults = document.getElementById('naicsResults');
  naicsInput.oninput = function () {
     var lookUp = this.value.toLowerCase();

     if(this.value.length > 4) {
       searchprops(lookUp);
     }

    if(lookUp.length == 0) {
      naicsResults.innerHTML = '';
      naicsResults.style.display = 'none';
    }
  };

  naicsInput.onfocus = function() {
    var lookUp = this.value;
    if(lookUp.length > 0) {
      naicsResults.style.display = 'block';
    }
  };

  naicsInput.onblur = function(){
    setTimeout(() => {
      naicsResults.style.display = 'none';
    }, 100);
  };
};

export { bindNaicsEvents };
