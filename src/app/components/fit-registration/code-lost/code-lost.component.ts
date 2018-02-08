import { Component } from '@angular/core';
import { RegistrationDao } from '../../../core/dao/registration.dao';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'fit-code-lost',
  templateUrl: './code-lost.component.html',
  styleUrls: ['./code-lost.component.scss']
})
export class CodeLostComponent {

  public companyMail: string = '';
  public isExisting: boolean = false;
  public isLoading: boolean = false;

  private emailChanged: Subject<string> = new Subject<string>();

  public constructor(private registrationDAO: RegistrationDao) {
    this.emailChanged.debounceTime(1000).subscribe(
      async () => {
        this.isLoading = true;
        this.isExisting = await this.registrationDAO.verifyCompanyMail(this.companyMail);
        this.isLoading = false;
      })
  }

  public onEmailChange(): void {
    this.emailChanged.next(this.companyMail);
  }

  public sendMail(): void {
    this.registrationDAO.sendMail(this.companyMail);
  }
}
