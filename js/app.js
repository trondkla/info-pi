import component from 'omniscient';
import {DOM} from 'react';
import _ from 'lodash';
import moment from 'moment';
let {section, h1, p, ul, li, text, i, div} = DOM;

var fjernIkkeTall = function(streng) {
  return streng.replace(/\D/g,'');
}

var avgangKey = function(avgang) {
  var key = avgang.d + "_" + avgang.l + "_" + fjernIkkeTall(avgang.t);
  console.log(key, avgang);
  return key; //
}

var AlleAvganger = component('Avganger', ({avganger}) => (
  ul({className:'avganger'}, avganger.map((a) => li({className: 'avgang', key: avgangKey(a)}, a.t)))
));

var NesteAvgang = component('NesteAvgang', ({avgang}) => (
  console.log("Avgang: ", avgang),
  div({className:'neste-avgang'}, avgang.get('t'))
));

export default component('App', ({avganger, sistOppdatert}) =>
  section({className: 'app'}, 
    h1({ className: 'navn', key: 'navn' }, 
      i({ className: 'fa fa-bus'}, '')),

    NesteAvgang({avgang: avganger.deref().get(0)}),
    //AlleAvganger({avganger: avganger.deref()}),

    p({ className: 'time', key: 'time' }, 
      "Sist oppdatert: " + sistOppdatert.deref())
  ));