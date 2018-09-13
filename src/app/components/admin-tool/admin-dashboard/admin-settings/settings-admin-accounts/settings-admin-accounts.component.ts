import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitUserRole } from '../../../../../core/model/enums/fit-user-role';
import { FitUserDAO } from '../../../../../core/dao/fit-user.dao';
import { ToastrService } from 'ngx-toastr';
import { matchOtherValidator } from '../../../../../core/form-validators/match-other';
import { FormHelper } from '../../../../../core/app-helper/form-helper';
import { BaseFormValidationComponent } from '../../../../../core/base-components/base-form-validation.component';

@Component({
  selector: 'fit-settings-admin-accounts',
  templateUrl: './settings-admin-accounts.component.html',
  styleUrls: ['./settings-admin-accounts.component.scss']
})
export class SettingsAdminAccountsComponent extends BaseFormValidationComponent implements OnInit {

  // for template usage
  public FitUserRole = FitUserRole;

  public formGroup: FormGroup;

  public constructor(private fb: FormBuilder,
                     private toastr: ToastrService,
                     private fitUserDAO: FitUserDAO) {
    super();
    this.formGroup = this.fb.group({
      role: this.fb.control(FitUserRole.FitAdmin),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('', [Validators.required, Validators.minLength(6), matchOtherValidator('password')]),
    });
  }

  public ngOnInit() {
  }

  public async createAdmin(): Promise<void> {
    if (this.formGroup.valid) {
      await this.fitUserDAO.createAdmin(
        this.formGroup.value.email,
        this.formGroup.value.password,
        this.formGroup.value.role
      );
      this.toastr.success('Der Benutzer wurde erfolgreich angelegt.', 'Gespeichert!');
    } else {
      FormHelper.touchAllFormFields(this.formGroup);
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Falsche Eingabe');
    }
  }
}
