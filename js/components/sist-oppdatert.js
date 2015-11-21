import component from 'omniscient';
import {DOM} from 'react';
let {p} = DOM;

export default component('SistOppdatert', ({sistOppdatert}) => (
  p({ className: 'time', key: 'time' }, "Sist oppdatert: " + sistOppdatert)
));