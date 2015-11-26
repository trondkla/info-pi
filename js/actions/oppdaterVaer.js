import Immutable from 'immutable';
import ajax from '../ajax';
import moment from 'moment';

var ekstrakterInteressantData = function(varsel) {
	return {
		symbol: varsel.symbol['@attributes'].number,
		symbolName: varsel.symbol['@attributes'].name,
		periode: varsel['@attributes'].period,
		temperatur: varsel.temperature['@attributes'].value,
		nedborsmengde: varsel.precipitation['@attributes'],
		vindHastighet: varsel.windSpeed['@attributes']
	};
}

var hentAktivVaerdata = function(listeMedVarsel) {

	for(let varsel of listeMedVarsel) {
		let from = moment(varsel['@attributes'].from, moment.ISO_8601);
		let to = moment(varsel['@attributes'].to, moment.ISO_8601);

		if (moment() < to) {
			// Fant nåværende varsel
			return ekstrakterInteressantData(varsel);
		}		
	}
	return false;
}

var oppdaterVaer = (vaer) => {
  ajax("http://filmhylla.com/xml.php?l=http%3A%2F%2Fwww.yr.no%2Fsted%2FNorge%2FS%C3%B8r-Tr%C3%B8ndelag%2FTrondheim%2FRisvollan%2Fvarsel.xml")
  .get()
  .then((data) => {
        let json = JSON.parse(data);
        console.log('Hentet vær', JSON.parse(data));

        vaer.cursor()
          .set('sted', json.location.name)
          .set('varsel', Immutable.fromJS(hentAktivVaerdata(json.forecast.tabular.time)));
      }, (data) => {
         console.log("Error ved henting av vær", JSON.parse(data));
      });
};

export default oppdaterVaer