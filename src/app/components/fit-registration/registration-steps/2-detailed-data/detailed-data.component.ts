import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
import { FormHelper } from '../../../../core/app-helper/form-helper';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { DataFile } from '../../../../core/model/data-file';

@Component({
  selector: 'fit-detailed-data',
  templateUrl: './detailed-data.component.html',
  styleUrls: ['./detailed-data.component.scss']
})
export class DetailedDataComponent implements OnInit {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  @ViewChild('establishmentIntCount')
  public establishmentIntCount: ElementRef;

  @ViewChild('establishmentAutCount')
  public establishmentAutCount: ElementRef;

  public branches: Branch[] = [];
  public branchFormArray: FormArray = null;
  public isDrag: boolean = false;
  public logo: DataFile;

  public constructor(private branchDAO: BranchDAO,
                     private accountManagementService: AccountManagementService,
                     private toastr: ToastrService) {
  }

  public async ngOnInit(): Promise<void> {
    this.branchFormArray = <FormArray>this.stepFormGroup.get('desiredBranches');

    this.accountManagementService.bookingFilled.subscribe(
      () => {
        this.branchFormArray = <FormArray>this.stepFormGroup.get('desiredBranches');
      }
    );

    this.branches = await this.branchDAO.fetchBranches();
  }

  public filePicked(file: PickedFile | FilePickerError): void {
    if (file instanceof PickedFile) {
      this.logo = new DataFile(file.name, file.dataURL);
      this.stepFormGroup.value.logo = this.logo;
    } else if (file === FilePickerError.FileTooBig) {
      this.toastr.warning('Das Bild darf nicht größer wie 2MB sein!');
    } else if (file === FilePickerError.InvalidFileType) {
      this.toastr.warning('Die angegeben Datei ist kein Bild!');
    } else if (file === FilePickerError.UndefinedInput) {
      this.toastr.warning('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut!');
    }
  }

  public branchChanged(branch: Branch, event: any): void {
    if (event.target.checked) {
      this.branchFormArray.push(new FormControl(branch));
    } else {
      let index = FormArrayUtils.indexOf(this.branchFormArray, branch);

      if (index !== -1) {
        this.branchFormArray.removeAt(index);
      }
    }
  }

  public isBranchSelected(branch: Branch): boolean {
    return FormArrayUtils.indexOf(this.branchFormArray, branch) !== -1;
  }

  public updateEstablishments(controlName: string, names: string[]): void {
    this.stepFormGroup.setControl(controlName, new FormArray(names.map(n => new FormControl(n))));
    this.verifyAutEstablishmentsCount();
    this.verifyIntEstablishmentsCount();
  }

  public verifyAutEstablishmentsCount(): void {
    let count: number = Math.max(
      this.stepFormGroup.value.establishmentsAut.length,
      this.establishmentAutCount.nativeElement.value
    );

    this.establishmentAutCount.nativeElement.value = count;
    this.stepFormGroup.controls['establishmentsCountAut'].setValue(count);
  }

  public verifyIntEstablishmentsCount(): void {
    let count: number = Math.max(
      this.stepFormGroup.value.establishmentsInt.length,
      this.establishmentIntCount.nativeElement.value
    );

    this.establishmentIntCount.nativeElement.value = count;
    this.stepFormGroup.controls['establishmentsCountInt'].setValue(count);
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isDescriptionTooLong(formName: string): boolean {
    return FormHelper.isDescriptionTooLong(formName, this.stepFormGroup);
  }

  public isInvalid(formName: string): boolean {
    return FormHelper.hasError(formName, this.stepFormGroup) != null &&
      FormHelper.isTouched(formName, this.stepFormGroup);
  }
}
