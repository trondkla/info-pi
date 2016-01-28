import Immutable from 'immutable';
import ajax from '../ajax';
import moment from 'moment';

var oppdaterAvganger = (rutetider) => {
  ajax("http://tvguidn.com/buss.php")
      .get()
      .then((data) => {
        let json = JSON.parse(data);
        console.log(1, 'Hentet avganger', JSON.parse(data));
        //{error: "Something went wrong"}
        json.name = json.name.split("(")[0].trim();

        rutetider.cursor()
          .set('navn', json.name)
          .set('lat', json.lat)
          .set('lon', json.lon)
          .set('avganger', Immutable.fromJS(json.next))
          .set('sistOppdatert', moment().format());
      }, (data) => {
         console.log("Error ved henting av avganger", JSON.parse(data));
      });
  };

  export default oppdaterAvganger