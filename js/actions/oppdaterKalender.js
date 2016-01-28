import passord from './passord.pid';
import Immutable from 'immutable';
import moment from 'moment';
import Ical from 'ical.js';
import ajax from '../ajax';

var antallDagerTil = (dato) => {
	if(moment().isSame(dato, 'day') )
		return 'i dag';
	return moment(dato, "YYYY-MM-DD").locale('nb').fromNow();
}

//dato er på format 
var forkortDato = (dato) => {
	return moment(dato, "YYYYMMDD").locale('nb').format("DD MMM");
}

var oppdaterKalender = (kalender) => {
	ajax(passord.link)
  		.get()
  		.then((data) => {
        let parsed = Ical.parse(data);
        console.log('Hentet kalender', parsed);
        //
        let comp = new Ical.Component(parsed);
		let vevents = comp.getAllSubcomponents("vevent");
		for (var vevent of vevents) {
			var event = new Ical.Event(vevent);
			console.log(event);
		}
        var vevent = comp.getFirstSubcomponent("vevent");

        kalender.cursor()
          .set('startDato', '(' + forkortDato(vevent.getFirstPropertyValue("dtstart")) +')')
          .set('lengdeTil', antallDagerTil(vevent.getFirstPropertyValue("dtstart")))
          .set('hendelse', vevent.getFirstPropertyValue("summary"));
      }, (data) => {
         console.log("Feil ved henting av kalender", Ical.parse(data));
      });

};

export default oppdaterKalender;
