import component from 'omniscient';

import {DOM} from 'react';
let {section} = DOM;

import Klokke from './components/klokke';
import NesteAvgang from './components/neste-avgang';
import AlleAvganger from './components/alle-avganger';
import SistOppdatert from './components/sist-oppdatert';


export default component('App', ({avganger, sistOppdatert, tid, nesteBussOmSekunder}) => 
  section({className: 'app'}, 
    Klokke({tid: tid.deref()}),
    NesteAvgang({avganger: avganger.deref(), nesteBussOmSekunder: nesteBussOmSekunder.deref()}),
    //SistOppdatert({sistOppdatert: sistOppdatert.deref()}),
    //AlleAvganger({avganger: avganger.deref()})
  ));