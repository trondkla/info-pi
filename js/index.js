import React from 'react';
import component from 'omniscient';
import immstruct from 'immstruct';
import ajax from './ajax';
import moment from 'moment';

import App from './app';
import '../less/index.less';

let rutetider = immstruct({"navn":"Asbj. Øverås v.","lat":"10.4245","lon":"63.39527","avganger":[]});

let el = document.querySelector('#app');

let render = () =>
  React.render(
    App({ navn: rutetider.cursor('navn'), sistOppdatert: rutetider.cursor('sistOppdatert'), avganger: rutetider.cursor('avganger') }),
    el);

render();
rutetider.on('swap', render);




var callback = {
  success : (data) => {
    let json = JSON.parse(data);
    console.log(1, 'success', JSON.parse(data));

    json.name = json.name.split("(")[0].trim();

    rutetider.cursor().set('navn', json.name);
    rutetider.cursor().set('lat', json.name);
    rutetider.cursor().set('long', json.name);
    rutetider.cursor().set('avganger', json.next);
    rutetider.cursor().set('sistOppdatert', moment().format());

  },
  error : (data) => {
     console.log(2, 'error', JSON.parse(data));
  }
};

var oppdaterRutetider = () => {
  ajax("http://tvguidn.com/buss.php")
      .get()
      .then(callback.success, callback.error);
  };

oppdaterRutetider();

setInterval(
  () => {
    oppdaterRutetider()
  },
  3*1000);