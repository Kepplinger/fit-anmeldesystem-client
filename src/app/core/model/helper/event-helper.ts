import { Event } from '../event';
import moment = require('moment');

export class EventHelper {
  public static parseJsonToEvent(eventJson: any): Event {

    if (eventJson != null) {
      let event = new Event();

      event.id = eventJson.id;
      event.areas = eventJson.areas;
      event.timestamp = eventJson.timestamp;
      event.registrationStart = moment(eventJson.registrationStart);
      event.registrationEnd = moment(eventJson.registrationEnd);
      event.eventDate = moment(eventJson.eventDate);
      event.isLocked = eventJson.isLocked;

      return event;
    } else {
      return null;
    }
  }
}
