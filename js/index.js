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
  "nesteBussOmSekunder": -1
})

let el = document.querySelector('#app');

let render = () =>
  ReactDOM.render(
    App({
      avganger: rutetider.cursor('avganger'),
      sistOppdatert: rutetider.cursor('sistOppdatert'),
      tid: tidspunkt.cursor('tid'),
      nesteBussOmSekunder: tidspunkt.cursor('nesteBussOmSekunder')
    }), el);

render();
rutetider.on('swap', render);
tidspunkt.on('swap', render);


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

var oppdaterTidspunkt = () => {
  var avganger = rutetider.cursor('avganger').deref();
  if (avganger.count() > 0) {
    console.log("Oppdaterer tidspunkt");
    var tid = moment(avganger.get(0).get('t'), "DD.MM.YYYY HH:mm");
    var now = moment();
    tidspunkt.cursor()
        .set('nesteBussOmSekunder', tid.diff(now, 'seconds'));
  }

  tidspunkt.cursor()
    .set('tid', moment().format('HH:mm:ss'));
};

oppdaterTidspunkt();
oppdaterRutetider();
setInterval(oppdaterTidspunkt, 1000);
setInterval(oppdaterRutetider, 10*1000);
