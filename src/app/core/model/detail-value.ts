export class DetailValue {
  public id: number;
  public detailId: number;
  public value: string;

  public constructor(detailId?: number,
                     value?: string,
                     id?: number) {
    this.id = id;
    this.detailId = detailId;
    this.value = value;
  }
}
