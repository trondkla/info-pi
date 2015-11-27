import passord from './kalenderPassord.pid';
import Immutable from 'immutable';
import moment from 'moment';
//import gapi from 'gapi';

var gapi = require('gapi');
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
		kalender.nesteDato = events.items.start.date;
		kalender.hendelse = events.items[0];
	});
}

var oppdaterKalender = (kalender) => {
	if(sjekkClient(kalender)){
		authorizeDiv.style.display = 'none';//holder aut UI skjult

		gapi.client.load('calendar', 'v3', hentEvent(kalender));
	}
	
	

};

export default oppdaterKalender

