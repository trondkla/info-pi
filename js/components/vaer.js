import immstruct from 'immstruct';
import component from 'omniscient';
import {DOM} from 'react';
let {section, i, span} = DOM;

var finnIkon = (varsel) => {
	let symbol = varsel.get('symbol');
	let periode = varsel.get('periode'); // {0: kl. 0-6, 1: kl. 6-12, 2: kl. 12-18, 3: kl. 18-24)

	// https://erikflowers.github.io/weather-icons/
	switch(symbol) {
		case 1: // sol klart
			return 'wi-day-sunny';
		case 2: // lettskyet
			return 'wi-day-sunny-overcast';
		case 3: // overskyet
			return 'wi-day-cloudy';
		case 4: // skyet
			return 'wi-cloudy';
		case 40: // lette regnbyger
			return 'wi-day-showers';
		case 5: // regnbyger
			return 'wi-day-rain-mix';
		case 41: // kraftige regnbyger
			return 'wi-day-rain';
		//case : // 
		//	return '';
	}
	return 'wi-day-sunny';
}


// The forceUpdateOn mixin will forceUpdate the component every time the clock reference changes.
export default component('Vaer', ({vaer}) => {
	let varsel = vaer.get('varsel');
  	return (section({className: 'weather'},
  			i({className: 'symbol wi ' + finnIkon(varsel)}),
	  		span({className: 'temperatur wi'}, varsel.get('temperatur'), i({className: 'wi wi-celsius'}))
  	))
});