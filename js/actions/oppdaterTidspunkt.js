import moment from 'moment';

var oppdaterTidspunkt = (tidspunkt) => {
  tidspunkt.cursor()
    .set('tid', moment().format('HH:mm:ss'));
};

export default oppdaterTidspunkt