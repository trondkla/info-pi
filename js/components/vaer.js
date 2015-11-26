import immstruct from 'immstruct';
import component from 'omniscient';
import {DOM} from 'react';
let {section, i, span} = DOM;

var finnIkon = (varsel) => {
	let symbol = varsel.get('symbol');
	let periode = varsel.get('periode'); // {0: kl. 0-6, 1: kl. 6-12, 2: kl. 12-18, 3: kl. 18-24)

	// https://erikflowers.github.io/weather-icons/
	switch(symbol) {
		case "1": // sol klart
			return 'wi-day-sunny';
		case "2": // lettskyet
			return 'wi-day-sunny-overcast';
		case "3": // overskyet
			return 'wi-day-cloudy';
		case "4": // skyet
			return 'wi-cloudy';
		case "40": // lette regnbyger
			return 'wi-day-showers';
		case "5": // regnbyger
			return 'wi-day-rain-mix';
		case "41": // kraftige regnbyger
			return 'wi-day-rain';
		case "24": // lette regnbyer og torden
			return 'wi-day-storm-showers';
		case "6": // regnbyger og torden
			return 'wi-day-storm-showers';
		case "25": // kraftige regnbyer og torden
			return 'wi-day-thunderstorm';
		case "42": // lette sluddbyger
			return 'wi-day-sleet';
		case "7": // sluddbyger
			return 'wi-day-sleet';
		case "43": // kraftig sluddbyger
			return 'wi-day-rain-mix';
		case "26": // lette sluddbyger og torden
			return 'wi-day-sleet-storm';
		case "20": // sluddbyger og torden
			return 'wi-day-sleet-storm';
		case "27": // kraftige sluddbyger og torden
			return 'wi-day-sleet-storm';
		case "44": // lette snøbyger
			return 'wi-day-snow';
		case "8": // snøbyger
			return 'wi-day-snow';
		case "45": // kraftige snøbyger
			return 'wi-day-snow';
		case "28": // lette snøbyger og torden
			return 'wi-day-snow-thunderstorm';
		case "21": // snøbyger og torden
			return 'wi-day-snow-thunderstorm';
		case "29": // kraftige snøbyger og torden
			return 'wi-day-snow-thunderstorm';
		case "46": // lett regn
			return 'wi-day-sprinkle';
		case "9": // regn
			return 'wi-day-showers';
		case "10": // kraftig regn
			return 'wi-day-showers';
		case "30": // lett regn og torden
			return 'wi-day-storm-showers';
		case "22": // regn og torden
			return 'wi-day-storm-showers';
		case "11": // kraftig regn og torden
			return 'wi-day-thunderstorm';
		case "47": // lett sludd
			return 'wi-day-sleet';
		case "12": // sludd
			return 'wi-day-sleet';
		case "48": // kraftig sludd
			return 'wi-day-rain-mix';
		case "31": // lett sludd og torden
			return 'wi-day-sleet-storm';
		case "23": // sludd og torden
			return 'wi-day-sleet-storm';
		case "32": // kraftig sludd og torden
			return 'wi-day-sleet-storm';
		case "49": // lett snø
			return 'wi-day-snow';
		case "13": // snø
			return 'wi-day-snow';
		case "50": // krftig snø
			return 'wi-day-snow';
		case "33": // lett snø og torden
			return 'wi-day-snow-thunderstorm';
		case "14": // snø og torden
			return 'wi-day-snow-thunderstorm';
		case "34": // kraftig snø og torden
			return 'wi-day-snow-thunderstorm';
		case "15": // Tåke
			return 'wi-day-fog';
	}
	return 'wi-thermometer';
}


// The forceUpdateOn mixin will forceUpdate the component every time the clock reference changes.
export default component('Vaer', ({vaer}) => {
	let varsel = vaer.get('varsel');
  	return (section({className: 'weather'},
  			i({className: 'symbol wi ' + finnIkon(varsel)}),
  			span({className: 'name wi'}, varsel.get('symbolName'), ' '),
  			//span({className: 'name wi'}, varsel.get('nedborsmengde')),
	  		span({className: 'temperatur wi'}, varsel.get('temperatur'), i({className: 'wi wi-celsius'}))
  	))
});