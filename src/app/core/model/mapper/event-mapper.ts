import { Event } from '../event';
import * as moment from 'moment';

export class EventMapper {
  public static mapJsonToEvent(eventJson: any): Event {

    if (eventJson != null) {
      let event = new Event();

      event.id = eventJson.id;
      event.areas = eventJson.areas;
      event.presentationsLocked = eventJson.presentationsLocked;
      event.registrationStart = moment.utc(eventJson.registrationStart).startOf('day');
      event.registrationEnd = moment.utc(eventJson.registrationEnd).startOf('day');
      event.eventDate = moment.utc(eventJson.eventDate).startOf('day');
      event.registrationState = eventJson.registrationState;
      event.isExpiredLockMode = eventJson.isExpiredLockMode;

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

  public static mapEventToJson(event: Event): any {
    let eventJson: any = event;

    for (let area of eventJson.areas) {
      if (area.graphic != null && area.graphic.dataUrl == null) {
        area.graphic = null;
      }
    }

    return eventJson;
  }
}
