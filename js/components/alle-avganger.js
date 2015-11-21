import component from 'omniscient';
import {DOM} from 'react';
let {ul, li} = DOM;

var avgangKey = function(avgang) {
  return avgang.get('d') + "_" + avgang.get('l') + "_" + avgang.get('t');
}

export default component('AlleAvganger', ({avganger}) => (
  ul({className:'avganger'}, avganger.map((a) => li({className: 'avgang', key: avgangKey(a)}, a.get('t'))))
));
