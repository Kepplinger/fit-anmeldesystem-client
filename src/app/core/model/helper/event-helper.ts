import { Event } from '../event';
import * as moment from 'moment';
import { Area } from '../area';

export class EventHelper {
  public static clone(event: Event): Event {
    if (event != null) {
      let newEvent: Event = new Event();

      newEvent.id = event.id;
      newEvent.areas = event.areas;
      newEvent.timestamp = event.timestamp;
      newEvent.registrationStart = moment(event.registrationStart);
      newEvent.registrationEnd = moment(event.registrationEnd);
      newEvent.eventDate = moment(event.eventDate);
      newEvent.isLocked = event.isLocked;
      newEvent.isCurrent = event.isCurrent;

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
