import React from 'react';
import ReactDOM from 'react-dom';
import component from 'omniscient';
import immstruct from 'immstruct';

import App from './app';
import '../less/index.less';
import 'font-awesome-webpack';

import oppdaterTidspunkt from './actions/oppdaterTidspunkt';
import oppdaterRutetider from './actions/oppdaterRutetider';
import oppdaterAvganger from './actions/oppdaterAvganger';
import oppdaterVaer from './actions/oppdaterVaer';

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
      vaer: vaer.cursor()
    }), el);

render();
rutetider.on('swap', render);
tidspunkt.on('swap', render);
vaer.on('swap', render);

var hvertSekund = 1000;
var hvertMinutt = 60000;
var hvertKvarter = 15*hvertMinutt;

oppdaterVaer(vaer);
oppdaterTidspunkt(tidspunkt);
oppdaterRutetider({rutetider: rutetider, tidspunkt: tidspunkt});
oppdaterAvganger(rutetider);

setInterval(oppdaterTidspunkt, hvertSekund, tidspunkt);
setInterval(oppdaterRutetider, hvertSekund, {rutetider: rutetider, tidspunkt: tidspunkt});
setInterval(oppdaterAvganger, hvertMinutt, rutetider);
setInterval(oppdaterVaer, hvertKvarter, vaer);

