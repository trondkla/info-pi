import React from 'react';
import ReactDOM from 'react-dom';
import component from 'omniscient';
import immstruct from 'immstruct';
import Immutable from 'immutable';
import ajax from './ajax';
import moment from 'moment';

import App from './app';
import '../less/index.less';
import 'font-awesome-webpack';

let rutetider = immstruct({"navn":"Asbj. Øverås v.","lat":"10.4245","lon":"63.39527","avganger":[]});
let tidspunkt = immstruct({
  "tid": "",
  "antallSekunderTilForsteBussavgang": -1,
  "antallSekunderTilAndreBussavgang": -1
})
let vaer = immstruct({"sted": "InitRisvollan", "varsel":[]});
let el = document.querySelector('#app');

if (DEBUG) {
  document.body.classList.add("debug");
}

let render = () =>
  ReactDOM.render(
    App({
      avganger: rutetider.cursor('avganger'),
      sistOppdatert: rutetider.cursor('sistOppdatert'),
      tid: tidspunkt.cursor('tid'),
      antallSekunderTilForsteBussavgang: tidspunkt.cursor('antallSekunderTilForsteBussavgang'),
      antallSekunderTilAndreBussavgang: tidspunkt.cursor('antallSekunderTilAndreBussavgang'),
      sted: vaer.cursor('sted')
    }), el);

render();
rutetider.on('swap', render);
tidspunkt.on('swap', render);
vaer.on('swap', render);

var oppdaterVaer = () => {
  ajax("http://filmhylla.com/xml.php?l=http%3A%2F%2Fwww.yr.no%2Fsted%2FNorge%2FS%C3%B8r-Tr%C3%B8ndelag%2FTrondheim%2FRisvollan%2Fvarsel.xml")
  .get()
  .then((data) => {
        let json = JSON.parse(data);
        console.log(1, 'success', JSON.parse(data));

        //json.name = json.name.split("(")[0].trim();

        vaer.cursor()
          .set('sted', json.location.name);
          //.set('varsel', Immutable.fromJS(json.forecast.tabular.next));
      }, (data) => {
         console.log(2, 'error', JSON.parse(data));
      });
};

var oppdaterRutetider = () => {
  ajax("http://tvguidn.com/buss.php")
      .get()
      .then((data) => {
        let json = JSON.parse(data);
        console.log(1, 'success', JSON.parse(data));

        json.name = json.name.split("(")[0].trim();

        rutetider.cursor()
          .set('navn', json.name)
          .set('lat', json.lat)
          .set('lon', json.lon)
          .set('avganger', Immutable.fromJS(json.next))
          .set('sistOppdatert', moment().format());
      }, (data) => {
         console.log(2, 'error', JSON.parse(data));
      });
  };

var antallSekunderTilNesteBussavgangNr = (avgangNr) => {
  var avganger = rutetider.cursor('avganger').deref();

  var tid = moment(avganger.get(avgangNr).get('t'), "DD.MM.YYYY HH:mm");
  var now = moment();

  return tid.diff(now, 'seconds');
}

var oppdaterTidspunkt = () => {
  tidspunkt.cursor()
    .set('tid', moment().format('HH:mm:ss'));

  var avganger = rutetider.cursor('avganger').deref();
  if (avganger.count() > 0) {
    console.log("Oppdaterer tidspunkt");

    var antallSekunderTilForsteBussavgang = antallSekunderTilNesteBussavgangNr(0);

    tidspunkt.cursor()
        .set('antallSekunderTilForsteBussavgang', antallSekunderTilForsteBussavgang);

    if (antallSekunderTilForsteBussavgang < 130) {
      // fjern første avgang, da det er under 2 minutter til.

      rutetider.cursor().set('avganger', avganger.remove(0));
      oppdaterTidspunkt();
      return;
    }
  }

  if (avganger.count() >= 2) {

    var antallSekunderTilAndreBussavgang = antallSekunderTilNesteBussavgangNr(1);

    tidspunkt.cursor()
        .set('antallSekunderTilAndreBussavgang', antallSekunderTilAndreBussavgang);
  }
};

oppdaterVaer();
oppdaterTidspunkt();
oppdaterRutetider();
setInterval(oppdaterTidspunkt, 1000);
setInterval(oppdaterRutetider, 60*1000);
//setInterval(oppdaterVaer, 60*1000);