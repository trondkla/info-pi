import immstruct from 'immstruct';
import component from 'omniscient';
import {DOM} from 'react';
let {section, p} = DOM;



export default component('Kalender',({kalender}) =>
  section({className: 'kalender'}, 
  	p({}, kalender.get('hendelse'),
  		' ',
  		kalender.get('lengdeTil'),
  		' ',
  		kalender.get('startDato')
  	)
  )
)