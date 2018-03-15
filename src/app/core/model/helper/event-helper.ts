import { Event } from '../event';
import * as moment from 'moment';

export class EventHelper {
  public static clone(event: Event): Event {
    if (event != null) {
      let newEvent: Event = event;

      event.id = newEvent.id;
      event.areas = newEvent.areas;
      event.timestamp = newEvent.timestamp;
      event.registrationStart = moment(newEvent.registrationStart);
      event.registrationEnd = moment(newEvent.registrationEnd);
      event.eventDate = moment(newEvent.eventDate);
      event.isLocked = newEvent.isLocked;

      return newEvent;
    } else {
      return null;
    }
  }
}
