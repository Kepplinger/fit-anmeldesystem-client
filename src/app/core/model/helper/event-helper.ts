import { Event } from '../event';
import * as moment from 'moment';
import { Area } from '../area';

export class EventHelper {

  public static clone(event: Event): Event {
    if (event != null) {
      let newEvent: Event = new Event();

      newEvent.id = event.id;
      newEvent.areas = event.areas;
      newEvent.registrationStart = moment(event.registrationStart);
      newEvent.registrationEnd = moment(event.registrationEnd);
      newEvent.eventDate = moment(event.eventDate);
      newEvent.registrationState = event.registrationState;

      return newEvent;
    } else {
      return null;
    }
  }

  public static cloneWithoutIds(event: Event): Event {
    let clonedEvent: Event = EventHelper.clone(event);

    if (clonedEvent != null) {
      delete clonedEvent.id;

      if (clonedEvent.areas != null) {
        clonedEvent.areas.forEach(
          (area: Area) => {
            delete area.id;
            delete area.graphic.id;

            if (area.locations != null) {
              area.locations.forEach(l => delete l.id);
            }
          });
      }
    }

    return clonedEvent;
  }
}
