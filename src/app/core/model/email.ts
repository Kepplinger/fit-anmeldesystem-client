export class Email {
  public id: number;
  public timestamp: string;

  public name: string;
  public description: string;
  public template: string;
  public subject: string;

  public constructor(name?: string,
                     description?: string,
                     template?: string,
                     subject?: string,
                     id?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.template = template;
    this.subject = subject;
  }
}
