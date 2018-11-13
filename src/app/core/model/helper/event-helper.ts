import { Event } from '../event';
import * as moment from 'moment';
import { Area } from '../area';
import { AreaHelper } from './area-helper';

export class EventHelper {

  public static clone(event: Event): Event {
    if (event != null) {
      let clone: Event = new Event();

      clone.id = event.id;
      clone.presentationsLocked = event.presentationsLocked;
      clone.registrationStart = moment(event.registrationStart);
      clone.registrationEnd = moment(event.registrationEnd);
      clone.eventDate = moment(event.eventDate);
      clone.registrationState = event.registrationState;
      clone.isExpiredLockMode = event.isExpiredLockMode;

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

      if (clonedEvent.registrationState != null) {
        delete clonedEvent.registrationState.id;
      }

      if (clonedEvent.areas != null) {
        clonedEvent.areas.forEach(
          (area: Area) => {
            delete area.id;
            delete area.timestamp;
            if (area.graphic != null) {
              delete area.graphic.id;
            }

            if (area.locations != null) {
              area.locations.forEach(l => {
                delete l.id;
                delete l.timestamp;
                l.isOccupied = false;
              });
            }
          });
      }
    }

    return clonedEvent;
  }

  public static compare(first: Event, second: Event): boolean {
    return first.id === second.id &&
      first.presentationsLocked === second.presentationsLocked &&
      first.registrationState === second.registrationState &&
      first.registrationEnd.isSame(second.registrationEnd) &&
      first.registrationStart.isSame(second.registrationStart) &&
      first.isExpiredLockMode === second.isExpiredLockMode &&
      first.eventDate.isSame(second.eventDate);
  }
}
