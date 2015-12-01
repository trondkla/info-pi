import component from 'omniscient';
import {DOM} from 'react';
let {h1, i, div} = DOM;

var NesteAvgangTid = component('NesteAvgangTid',
  ({avganger, antallSekunderTilBussavgang}) => {
    if (antallSekunderTilBussavgang == -1) {
      return (i({className: 'fa fa-refresh fa-spin'}, ''))
    }

    var minutesLeft = Math.floor(antallSekunderTilBussavgang / 60);
    if (minutesLeft < 10) minutesLeft = "0" + minutesLeft;
    return (
      h1({ className: 'neste-avgang-tid', key: 'neste-avgang-tid' },
        i({ className: 'fa fa-clock-o'}, ''),
          minutesLeft + " min")
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
  ({avganger, antallSekunderTilBussavgang, cssClassNames}) => {
    if (antallSekunderTilBussavgang == -1) {
      return (i({className: 'fa fa-refresh fa-spin laster'}, ''))
    }
    return (
      div({ className: 'neste-avgang ' + cssClassNames, key: 'neste-avgang' },
        NesteAvgangBuss({avganger}),
        NesteAvgangTid({avganger, antallSekunderTilBussavgang}))
    )
  }
);