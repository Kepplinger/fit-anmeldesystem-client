import { EmailVariable } from './email-variable';

export class Email {
  public id: number;
  public timestamp: string;

  public identifier: string;
  public name: string;
  public description: string;
  public template: string;
  public subject: string;
  public availableVariables: EmailVariable[];

  public constructor(identifier?: string,
                     name?: string,
                     description?: string,
                     template?: string,
                     subject?: string,
                     id?: number) {
    this.id = id;
    this.identifier = identifier;
    this.name = name;
    this.description = description;
    this.template = template;
    this.subject = subject;
    this.availableVariables = [];
  }
}
