import component from 'omniscient';

import {DOM} from 'react';
let {section} = DOM;

import Klokke from './components/klokke';
import NesteAvgang from './components/neste-avgang';
import AlleAvganger from './components/alle-avganger';
import SistOppdatert from './components/sist-oppdatert';
import Vaer from './components/vaer';
import Kalender from './components/kalender';

export default component('App', ({avganger, sistOppdatert, tid, antallSekunderTilForsteBussavgang, antallSekunderTilAndreBussavgang, vaer, kalender}) => 
  section({className: 'app'}, 
    Klokke({tid: tid.deref()}),
    Vaer({vaer: vaer.deref()}),
    NesteAvgang({cssClassNames: "avgang-forste", avganger: avganger.deref(), antallSekunderTilBussavgang: antallSekunderTilForsteBussavgang.deref()}),
    NesteAvgang({cssClassNames: "avgang-andre", avganger: avganger.deref(), antallSekunderTilBussavgang: antallSekunderTilAndreBussavgang.deref()}),
    Kalender({kalender: kalender.deref()})
    //SistOppdatert({sistOppdatert: sistOppdatert.deref()}),
    //AlleAvganger({avganger: avganger.deref()})
  ));