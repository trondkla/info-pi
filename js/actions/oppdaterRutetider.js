import moment from 'moment';

var antallSekunderTilNesteBussavgangNr = (avgangNr, avganger) => {
  var tid = moment(avganger.get(avgangNr).get('t'), "DD.MM.YYYY HH:mm");
  var now = moment();

  return tid.diff(now, 'seconds');
}

var oppdaterRutetider= ({rutetider, tidspunkt}) => {

  var avganger = rutetider.cursor('avganger').deref();
  if (avganger.count() > 0) {
    console.log("Oppdaterer tidspunkt");

    var antallSekunderTilForsteBussavgang = antallSekunderTilNesteBussavgangNr(0, avganger);

    tidspunkt.cursor()
        .set('antallSekunderTilForsteBussavgang', antallSekunderTilForsteBussavgang);

    if (antallSekunderTilForsteBussavgang < 130) {
      // fjern første avgang, da det er under 2 minutter til.

      rutetider.cursor().set('avganger', avganger.remove(0));
      oppdaterRutetider({rutetider: rutetider, tidspunkt: tidspunkt});
      return;
    }
  }

  if (avganger.count() >= 2) {

    var antallSekunderTilAndreBussavgang = antallSekunderTilNesteBussavgangNr(1, avganger);

    tidspunkt.cursor()
        .set('antallSekunderTilAndreBussavgang', antallSekunderTilAndreBussavgang);
  }
};

export default oppdaterRutetider