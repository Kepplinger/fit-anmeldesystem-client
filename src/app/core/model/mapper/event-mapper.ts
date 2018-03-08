import { Event } from '../event';
import * as moment from 'moment';

export class EventMapper {
  public static mapJsonToEvent(eventJson: any): Event {

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

  public static mapJsonToEventList(eventJson: any[]): Event[] {

    if (eventJson != null) {
      let events: Event[] = [];

      eventJson.forEach(
        (data: any) => {
          events.push(EventMapper.mapJsonToEvent(data));
        }
      );

      return events;
    } else {
      return null;
    }
  }
}
