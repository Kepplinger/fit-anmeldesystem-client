import { Event } from '../event';
import * as moment from 'moment';
import { Area } from '../area';

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
      event.isCurrent = newEvent.isCurrent;

      return newEvent;
    } else {
      return null;
    }
  }

  public static cloneWithoutIds(event: Event): Event {
    let clonedEvent: Event = EventHelper.clone(event);

    if (clonedEvent != null) {
      clonedEvent.id = null;

      if (clonedEvent.areas != null) {
        clonedEvent.areas.forEach(
          (area: Area) => {
            area.id = null;

            if (area.locations != null) {
              area.locations.forEach(l => l.id = null);
            }
          })
      }
    }

    return clonedEvent;
  }
}
