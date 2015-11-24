import immstruct from 'immstruct';
import component from 'omniscient';
import {DOM} from 'react';
let {section} = DOM;

//import {forceUpdateOn} from 'omniscient-mixins';


// The forceUpdateOn mixin will forceUpdate the component every time the clock reference changes.
export default component('Vaer', ({sted}) =>
  section({className: 'klokke'}, sted)
);