import component from 'omniscient';
import {DOM} from 'react';
let {h1, i, div} = DOM;

var NesteAvgangTid = component('NesteAvgangTid',
  ({avganger, nesteBussOmSekunder}) => {
    if (nesteBussOmSekunder == -1) {
      return (i({className: 'fa fa-refresh fa-spin'}, ''))
    }

    var minutesLeft = Math.floor(nesteBussOmSekunder / 60);
    if (minutesLeft < 10) minutesLeft = "0" + minutesLeft;
    var secondsLeft = nesteBussOmSekunder % 60;
    if (secondsLeft < 10) secondsLeft = "0" + secondsLeft;
    return (
      h1({ className: 'neste-avgang-tid', key: 'neste-avgang-tid' },
        i({ className: 'fa fa-clock-o'}, ''),
          minutesLeft + ":" + secondsLeft)
    )
  }
);

var NesteAvgangBuss = component('NesteAvgangBuss',
  ({avganger}) => (
      h1({ className: 'neste-avgang-buss', key: 'neste-avgang-buss' },
        i({ className: 'fa fa-bus'}, ''),
          avganger.get(0).get('l'))
    ));

export default component('NesteAvgang',
  ({avganger, nesteBussOmSekunder}) => {
    if (nesteBussOmSekunder == -1) {
      return (i({className: 'fa fa-refresh fa-spin laster'}, ''))
    }
    return (
      div({ className: 'neste-avgang', key: 'neste-avgang' },
        NesteAvgangBuss({avganger}),
        NesteAvgangTid({avganger, nesteBussOmSekunder}))
    )
  }
);