export class EmailVariable {
  public id: number;
  public timestamp: string;

  public name: string;
  public value: string;
  public entity: string;

  public constructor(name?: string,
                     value?: string,
                     entity?: string) {
    this.name = name;
    this.value = value;
    this.entity = entity;
  }
}
