import * as moment from 'moment';
import { ChangeProtocol } from '../change-protocol';

export class ChangeProtocolMapper {
  public static mapJsonToChangeProtocol(changeJSON: any): ChangeProtocol {

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
      change.isReverted = changeJSON.isReverted;
      change.isAdminChange = changeJSON.isAdminChange;

      return change;
    } else {
      return null;
    }
  }

  public static mapJsonToChangeList(changeJSON: any[]): ChangeProtocol[] {

    if (changeJSON != null) {
      let changes: ChangeProtocol[] = [];

      changeJSON.forEach(
        (data: any) => {
          changes.push(ChangeProtocolMapper.mapJsonToChangeProtocol(data));
        }
      );

      return changes;
    } else {
      return [];
    }
  }

}
