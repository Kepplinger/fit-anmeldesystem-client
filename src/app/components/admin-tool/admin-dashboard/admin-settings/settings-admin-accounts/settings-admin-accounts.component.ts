import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitUserRole } from '../../../../../core/model/enums/fit-user-role';
import { FitUserDAO } from '../../../../../core/dao/fit-user.dao';
import { ToastrService } from 'ngx-toastr';
import { matchOtherValidator } from '../../../../../core/form-validators/match-other';
import { FormHelper } from '../../../../../core/app-helper/form-helper';
import { BaseFormValidationComponent } from '../../../../../core/base-components/base-form-validation.component';
import { FitUser } from '../../../../../core/model/fit-user';
import { HttpErrorResponse } from '@angular/common/http';
import { ArrayUtils } from '../../../../../core/utils/array-utils';

@Component({
  selector: 'fit-settings-admin-accounts',
  templateUrl: './settings-admin-accounts.component.html',
  styleUrls: ['./settings-admin-accounts.component.scss']
})
export class SettingsAdminAccountsComponent extends BaseFormValidationComponent implements OnInit {

  // for template usage
  public FitUserRole = FitUserRole;

  public formGroup: FormGroup;
  public fitUsers: FitUser[] = [];

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

  public async ngOnInit(): Promise<void> {
    this.fitUsers = await this.fitUserDAO.fetchAllUsers();
  }

  public async createAdmin(): Promise<void> {
    if (this.formGroup.valid) {
      let result = await this.fitUserDAO.createAdmin(
        this.formGroup.value.email,
        this.formGroup.value.password,
        this.formGroup.value.role
      );

      if (!(result instanceof HttpErrorResponse)) {
        this.toastr.success('Der Benutzer wurde erfolgreich angelegt.', 'Gespeichert!');
        this.fitUsers.push(result);
        this.emptyForm();
      }
    } else {
      FormHelper.touchAllFormFields(this.formGroup);
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Falsche Eingabe');
    }
  }

  public async deleteUser(fitUser: FitUser): Promise<void> {
    await this.fitUserDAO.deleteUser(fitUser);
    ArrayUtils.deleteElement(this.fitUsers, fitUser);
    this.toastr.success('Der Benutzer wurde erfolgreich gelöscht.', 'Benutzer gelöscht');
  }

  private emptyForm(): void {
    this.formGroup.patchValue({
      role: FitUserRole.FitAdmin,
      email: '',
      password: '',
      confirmPassword: ''
    });

    this.formGroup.markAsUntouched();
  }
}
