import * as moment from 'moment';
import { ChangeProtocol } from '../change-protocol';

export class ChangeProtocolHelper {
  public static parseJsonToChangeProtocol(changeJSON: any): ChangeProtocol {

    if (changeJSON != null) {
      let change = new ChangeProtocol();

      change.id = changeJSON.id;
      change.timestamp = changeJSON.timestamp;
      change.creationDate = moment(changeJSON.creationDate);
      change.newValue = changeJSON.newValue;
      change.oldValue = changeJSON.oldValue;
      change.columnName = changeJSON.columnName;
      change.tableName = changeJSON.tableName;
      change.companyId = changeJSON.companyId;
      change.isPending = changeJSON.isPending;

      return change;
    } else {
      return null;
    }
  }

  public static parseJsonToChangeList(changeJSON: any[]): ChangeProtocol[] {

    if (changeJSON != null) {
      let changes: ChangeProtocol[] = [];

      changeJSON.forEach(
        (data: any) => {
          changes.push(ChangeProtocolHelper.parseJsonToChangeProtocol(data));
        }
      );

      return changes;
    } else {
      return null;
    }
  }

}
