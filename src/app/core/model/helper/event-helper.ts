import { Event } from '../event';
import * as moment from 'moment';
import { Area } from '../area';
import { LocationHelper } from './location-helper';
import { AreaHelper } from './area-helper';

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

  public static compare(first: Event, second: Event): boolean {
    return first.id === second.id &&
      first.registrationState === second.registrationState &&
      first.registrationEnd.isSame(second.registrationEnd, 'day') &&
      first.registrationStart.isSame(second.registrationStart, 'day') &&
      first.eventDate.isSame(second.eventDate, 'day') &&
      first.areas.every(a1 => second.areas.some(a2 => AreaHelper.compare(a1, a2))) &&
      second.areas.every(a1 => second.areas.some(a2 => AreaHelper.compare(a1, a2)));
  }
}
