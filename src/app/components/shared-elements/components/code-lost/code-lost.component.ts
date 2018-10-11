import { Component, Input } from '@angular/core';
import { AuthenticationDAO } from '../../../../core/dao/authentication.dao';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-code-lost',
  templateUrl: './code-lost.component.html',
  styleUrls: ['./code-lost.component.scss']
})
export class CodeLostComponent extends BaseSubscriptionComponent {

  @Input()
  public fitOnlyMode: boolean = true;

  public companyMail: string = '';

  public isChecked: boolean = false;
  public isExisting: boolean = false;
  public isLoading: boolean = false;

  private emailChanged: Subject<string> = new Subject<string>();

  public constructor(private registrationDAO: AuthenticationDAO,
                     private toastr: ToastrService,
                     private router: Router) {
    super();
    this.addSub(this.emailChanged.pipe(debounceTime(1000)).subscribe(
      async () => {
        this.isLoading = true;
        this.isExisting = await this.registrationDAO.verifyCompanyMail(this.companyMail, !this.fitOnlyMode);
        this.isLoading = false;
        this.isChecked = true;
      }));
  }

  public onEmailChange(): void {
    this.isChecked = false;
    this.emailChanged.next(this.companyMail);
  }

  public async sendMail(): Promise<void> {
    await this.registrationDAO.sendMail(this.companyMail, !this.fitOnlyMode);
    this.toastr.success('Ihr Code wurde versendet an: ' + this.companyMail, 'Mail erfolgreich versandt!');

    if (this.fitOnlyMode) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/konto', 'login']);
    }
  }

  public isValid(): boolean {
    return !this.isLoading && this.isExisting && this.isChecked;
  }

  public isInvalid(): boolean {
    return !this.isLoading && !this.isExisting && this.isChecked;
  }
}
