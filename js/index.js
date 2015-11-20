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

let el = document.querySelector('#app');

let render = () =>
  ReactDOM.render(
    App({ avganger: rutetider.cursor('avganger'), sistOppdatert: rutetider.cursor('sistOppdatert') }),
    el);

render();
rutetider.on('swap', render);


var callback = {
  success : (data) => {
    let json = JSON.parse(data);
    console.log(1, 'success', JSON.parse(data));

    json.name = json.name.split("(")[0].trim();

    rutetider.cursor('navn').update(_ => json.name);
    rutetider.cursor('lat').update(_ => json.lat);
    rutetider.cursor('lon').update(_ => json.lon);
    rutetider.cursor('avganger').update(_ => Immutable.fromJS(json.next));
    rutetider.cursor('sistOppdatert').update(_ => moment().format());

    console.log("Rutetider: ", rutetider.cursor('avganger').deref());
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
setInterval(oppdaterRutetider, 3*1000);
