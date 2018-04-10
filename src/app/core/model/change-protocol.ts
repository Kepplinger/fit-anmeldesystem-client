import { Moment } from 'moment';

export class ChangeProtocol {
  public id: number;
  public timestamp: string;

  public companyId: number;
  public tableName: string;
  public columnName: string;
  public creationDate: Moment;
  public oldValue: any;
  public newValue: any;

  public isPending: boolean;
  public isReverted: boolean;
  public isAdminChange: boolean;

  public constructor(companyId?: number,
                     tableName?: string,
                     columnName?: string,
                     creationDate?: Moment,
                     oldValue?: any,
                     newValue?: any,
                     isPending?: boolean,
                     isReverted?: boolean,
                     isAdminChange?: boolean,
                     id?: number) {
    this.id = id;
    this.companyId = companyId;
    this.tableName = tableName;
    this.columnName = columnName;
    this.creationDate = creationDate;
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.isPending = isPending;
    this.isReverted = isReverted;
    this.isAdminChange = isReverted;
  }
}
