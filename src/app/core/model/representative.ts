export class Representative {
  public id: number;
  public timestamp: string;

  public name: string;
  public email: string;
  public imageUrl: string;

  public constructor(name?: string,
                     email?: string,
                     imageUrl?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
  }
}
