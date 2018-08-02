import { Event } from '../event';
import * as moment from 'moment';
import { Area } from '../area';
import { LocationHelper } from './location-helper';
import { AreaHelper } from './area-helper';

export class EventHelper {

  public static clone(event: Event): Event {
    if (event != null) {
      let clone: Event = new Event();

      clone.id = event.id;
      clone.registrationStart = moment(event.registrationStart);
      clone.registrationEnd = moment(event.registrationEnd);
      clone.eventDate = moment(event.eventDate);
      clone.registrationState = event.registrationState;

      clone.areas = [];
      event.areas.forEach(a => clone.areas.push(AreaHelper.clone(a)));

      return clone;
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
            if (area.graphic != null) {
              delete area.graphic.id;
            }

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
