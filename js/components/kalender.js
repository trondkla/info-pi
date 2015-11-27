import immstruct from 'immstruct';
import component from 'omniscient';
import {DOM} from 'react';
let {section} = DOM;

export default component('Kalender', ({kalender}) =>
  section({className: 'kalender'}, kalender.get('nesteHendelse'))
);