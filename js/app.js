import component from 'omniscient';
import {DOM} from 'react';
let {section, h1, p, ul, li} = DOM;

let Avgang = component('Avgang', ({avgang}) => {
    li({className: 'avgang', key: avgang.t}, avgang.t)
});

let Avganger = component('Avganger', ({avganger}) => {
  ul({className: 'avganger', key: 'avganger'}, [avganger.map((avgang) => Avgang(avgang))])
});

export default component('App', ({navn, sistOppdatert, avganger}) =>
  section({className: 'app'}, [
    h1({ className: 'navn', key: 'navn' }, navn.deref()),
    Avganger({avganger: avganger.deref()}),
    p({ className: 'time', key: 'time' }, "Sist oppdatert: " + sistOppdatert.deref())
  ]));