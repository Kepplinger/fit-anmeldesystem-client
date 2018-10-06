export class MemberStatus {
  public id: number;
  public timestamp: string;

  public name: string;
  public defaultPrice: number;

  public isArchive: boolean;

  public constructor(name?: string,
                     defaultPrice?: number,
                     isArchive?: boolean,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.defaultPrice = defaultPrice;
    this.isArchive = isArchive;
  }
}
