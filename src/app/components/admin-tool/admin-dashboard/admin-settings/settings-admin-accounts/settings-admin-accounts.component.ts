import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FitUserRole } from '../../../../../core/model/enums/fit-user-role';
import { FitUserDAO } from '../../../../../core/dao/fit-user.dao';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fit-settings-admin-accounts',
  templateUrl: './settings-admin-accounts.component.html',
  styleUrls: ['./settings-admin-accounts.component.scss']
})
export class SettingsAdminAccountsComponent implements OnInit {

  // for template usage
  public FitUserRole = FitUserRole;

  public createAdminFormGroup: FormGroup;
  public unsavedChangesExist: boolean = false;

  public constructor(private fb: FormBuilder,
                     private toastr: ToastrService,
                     private fitUserDAO: FitUserDAO) {
    this.createAdminFormGroup = this.fb.group({
      role: this.fb.control(FitUserRole.FitAdmin),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required])
    });
  }

  public ngOnInit() {
    this.createAdminFormGroup.valueChanges.subscribe(() => {
      this.unsavedChangesExist = true;
    });
  }

  public async createAdmin(): Promise<void> {
    if (this.createAdminFormGroup.valid) {
      await this.fitUserDAO.createAdmin(
        this.createAdminFormGroup.value.email,
        this.createAdminFormGroup.value.password,
        this.createAdminFormGroup.value.role,
      );
      this.unsavedChangesExist = false;
      this.toastr.success('Der Benutzer wurde erfolgreich angelegt.', 'Gespeichert!');
    } else {
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Falsche Eingabe');
    }
  }

  public isCreateButtonEnabled(): boolean {
    return this.createAdminFormGroup.valid && this.unsavedChangesExist;
  }
}
