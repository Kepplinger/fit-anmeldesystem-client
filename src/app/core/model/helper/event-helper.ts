import { Event } from '../event';
import * as moment from 'moment';

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

  public static parseJsonToEventList(eventJson: any[]): Event[] {

    if (eventJson != null) {
      let events: Event[] = [];

      eventJson.forEach(
        (data: any) => {
          events.push(EventHelper.parseJsonToEvent(data));
        }
      );

      return events;
    } else {
      return null;
    }
  }
}
