import { Component } from '@angular/core';
import { RegistrationDao } from '../../../core/dao/registration.dao';

@Component({
  selector: 'fit-code-lost',
  templateUrl: './code-lost.component.html',
  styleUrls: ['./code-lost.component.scss']
})
export class CodeLostComponent {

  public companyMail: string = '';

  public constructor(private registrationDAO: RegistrationDao) {
  }
}
