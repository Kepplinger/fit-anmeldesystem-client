import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Email } from '../../../core/model/email';
import { EmailDAO } from '../../../core/dao/email.dao';

@Injectable()
export class EmailsService {

  public emails: BehaviorSubject<Email[]> = new BehaviorSubject([]);
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public constructor(private emailDAO: EmailDAO) {
    this.reloadEmails();
  }

  public async reloadEmails(): Promise<void> {
    if (this.emails.getValue().length === 0) {
      this.isLoading.next(true);
    }
    this.emails.next(await this.emailDAO.fetchEmails());
    this.isLoading.next(false);
  }

  public updateEmail(email: Email): void {
    let emails: Email[] = this.emails.getValue();
    emails[emails.findIndex(e => e.id === email.id)] = email;
    this.emails.next(emails);
  }
}
