import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitUserRole } from '../../../../../core/model/enums/fit-user-role';
import { FitUserDAO } from '../../../../../core/dao/fit-user.dao';
import { ToastrService } from 'ngx-toastr';
import { matchOtherValidator } from '../../../../../core/form-validators/match-other';
import { FormHelper } from '../../../../../core/app-helper/form-helper';
import { BaseFormValidationComponent } from '../../../../../core/base-components/base-form-validation.component';
import { FitUser } from '../../../../../core/model/fit-user';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { UserAuthorizationService } from '../../../../../core/app-services/user-authorization.service';
import { FitHttpError } from '../../../../../core/app-helper/helper-model/fit-http-error';

@Component({
  selector: 'fit-settings-admin-accounts',
  templateUrl: './settings-admin-accounts.component.html',
  styleUrls: ['./settings-admin-accounts.component.scss']
})
export class SettingsAdminAccountsComponent extends BaseFormValidationComponent implements OnInit {

  // for template usage
  public FitUserRole = FitUserRole;

  public userRoles: FitUserRole[] = [
    FitUserRole.FitAdmin,
    FitUserRole.FitReadOnly,
    FitUserRole.MemberAdmin,
    FitUserRole.MemberReadOnly,
  ];

  public formGroup: FormGroup;
  public fitUsers: FitUser[] = [];

  public isLoading: boolean = false;
  public inputsDisabled: boolean = false;

  public constructor(private fb: FormBuilder,
                     private toastr: ToastrService,
                     private userAuthorizationService: UserAuthorizationService,
                     private fitUserDAO: FitUserDAO) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.formGroup = this.fb.group({
      role: this.fb.control(FitUserRole.FitAdmin),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('', [Validators.required, Validators.minLength(6), matchOtherValidator('password')]),
    });

    this.isLoading = true;
    this.fitUsers = await this.fitUserDAO.fetchAllUsers();
    this.isLoading = false;
  }

  public async createAdmin(): Promise<void> {
    if (this.formGroup.valid) {
      this.inputsDisabled = true;
      let result = await this.fitUserDAO.createAdmin(
        this.formGroup.value.email,
        this.formGroup.value.password,
        this.formGroup.value.role
      );
      this.inputsDisabled = false;

      if (!(result instanceof FitHttpError)) {
        this.toastr.success('Der Benutzer wurde erfolgreich angelegt.', 'Gespeichert!');
        this.fitUsers = result;
        this.emptyForm();
      }
    } else {
      FormHelper.touchAllFormFields(this.formGroup);
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Falsche Eingabe');
    }
  }

  public async deleteUser(fitUser: FitUser): Promise<void> {

    if (!this.userAuthorizationService.isUserLoggedIn(fitUser.email)) {
      this.fitUsers = await this.fitUserDAO.deleteUser(fitUser);
      this.toastr.success('Der Benutzer wurde erfolgreich gelöscht.', 'Benutzer gelöscht');
    } else {
      this.toastr.warning(
        'Der derzeitig angemeldetet Benutzer kann nicht gelöscht werden!',
        'Löschen nicht möglich!'
      );
    }
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
