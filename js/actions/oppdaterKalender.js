import passord from './kalenderPassord.pid';
import Immutable from 'immutable';
import moment from 'moment';
/*import gapi from 'gapi';

gapi.server.setApiKey(passord.apiKey);
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

//check authorization
function sjekkClient(){
	gapi.auth.authorize({
		'client_id' : passord.clientID,
		'scope': SCOPES.join(' '),
        'immediate': true
	}, lastKalenderApi);
}

function lastKalenderApi(authResult){
	var authorizeDiv = document.getElementById('authorize-div');
	if(authResult && !authResult.error){
		return true;
	}
	return false;
}

function hentEvent(kalender){

	//maxResults bestemmer hvor mange events som skal hentes
	var eventRequest = gapi.client.calendar.events.list({
          'calendarId': passord.calendarId,
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 1,
          'orderBy': 'startTime'
    });

	eventRequest.execute((events) =>{
		kalender.nesteDato = events.items[0].start.date;
		kalender.hendelse = events.items[0].summary;
	});
}
*/
var antallDagerTil = (dato) => {
	return moment(dato, "YYYY-MM-DD").locale('nb').fromNow();
}
//dato er på format 
var forkortDato = (dato) => {
	return moment(dato, "YYYYMMDD").locale('nb').format("DD MMM");
}
var oppdaterKalender = (kalender) => {
	/*if(sjekkClient(kalender)){
		authorizeDiv.style.display = 'none';//holder aut UI skjult

		gapi.client.load('calendar', 'v3', hentEvent(kalender));
	}
	*/
// tidspunkt.cursor()
//        .set('antallSekunderTilAndreBussavgang', antallSekunderTilAndreBussavgang);
	//kalender.cursor().set('nesteDato', events.items[0].start.date);
	//kalender.cursor().set('hendelse', events.items[0].summary);
	var kalenderObject = {
 		"kind": "calendar#events",
 		"summary": "Speil datoer",
 		"description": "",
 		"timeZone": "Europe/Oslo",
 		"items": [
 		{
 			"summary": "Julaften",
  	 		"start": {"date": "2015-12-24"},
   	 		"end": {"date": "2015-12-25"},
  		}]
	};
	
	kalender.cursor().set('startDato', '(' + forkortDato(kalenderObject.items[0].start.date) +')');
	kalender.cursor().set('lengdeTil', antallDagerTil(kalenderObject.items[0].start.date));
	kalender.cursor().set('hendelse', kalenderObject.items[0].summary);
};

export default oppdaterKalender

