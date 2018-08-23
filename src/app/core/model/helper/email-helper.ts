import { Email } from '../email';

export class EmailHelper {
  public static clone(email: Email): Email{
    if (email != null) {
      let newEmail: Email = new Email();

      newEmail.id = email.id;
      newEmail.timestamp = email.timestamp;
      newEmail.identifier = email.identifier;
      newEmail.name = email.name;
      newEmail.description = email.description;
      newEmail.subject = email.subject;
      newEmail.template = email.template;
      newEmail.availableVariables = email.availableVariables;

      return newEmail;
    } else {
      return null;
    }
  }
}
