import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { DataFile } from '../../../../core/model/data-file';
import { BaseFormValidationComponent } from '../../../../core/base-components/base-form-validation.component';

@Component({
  selector: 'fit-detailed-data',
  templateUrl: './detailed-data.component.html',
  styleUrls: ['./detailed-data.component.scss']
})
export class DetailedDataComponent extends BaseFormValidationComponent implements OnInit {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public formGroup: FormGroup;

  @Output()
  public onInput: EventEmitter<void> = new EventEmitter<void>();

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
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.branchFormArray = <FormArray>this.formGroup.get('desiredBranches');
    this.logo = this.formGroup.value.logo;

    if (this.logo == null || this.logo.name == null || this.logo.name === '') {
      this.logo = new DataFile('Bild auswählen ...', null);
    }

    this.addSub(this.accountManagementService.bookingFilled.subscribe(
      () => {
        this.branchFormArray = <FormArray>this.formGroup.get('desiredBranches');

        if (this.formGroup.value.logo != null) {
          this.logo = this.formGroup.value.logo;
        }
      }
    ));

    this.branches = await this.branchDAO.fetchBranches();
  }

  public filePicked(file: PickedFile | FilePickerError): void {
    if (file instanceof PickedFile) {
      this.logo.name = file.name;
      this.logo.dataUrl = file.dataURL;
      this.formGroup.value.logo = this.logo;
    } else if (file === FilePickerError.FileTooBig) {
      this.toastr.warning('Das Bild darf nicht größer wie 2MB sein!');
    } else if (file === FilePickerError.InvalidFileType) {
      this.toastr.warning('Die angegeben Datei ist kein Bild!');
    } else if (file === FilePickerError.UndefinedInput) {
      this.toastr.warning('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut!');
    }
  }

  public updateEstablishments(controlName: string, names: string[]): void {
    this.formGroup.setControl(controlName, new FormArray(names.map(n => new FormControl(n))));
    this.verifyAutEstablishmentsCount();
    this.verifyIntEstablishmentsCount();
  }

  public verifyAutEstablishmentsCount(): void {
    let count: number = Math.max(
      this.formGroup.value.establishmentsAut.length,
      this.establishmentAutCount.nativeElement.value
    );

    this.establishmentAutCount.nativeElement.value = count;
    this.formGroup.controls['establishmentsCountAut'].setValue(count);
  }

  public verifyIntEstablishmentsCount(): void {
    let count: number = Math.max(
      this.formGroup.value.establishmentsInt.length,
      this.establishmentIntCount.nativeElement.value
    );

    this.establishmentIntCount.nativeElement.value = count;
    this.formGroup.controls['establishmentsCountInt'].setValue(count);
  }


  public branchChanged(branch: Branch, event: any): void {
    FormArrayUtils.elementChanged(branch, this.branchFormArray, event);
    this.onInputChanged();
  }

  public isBranchSelected(branch: Branch): boolean {
    return FormArrayUtils.indexOfWithId(this.branchFormArray, branch) !== -1;
  }
}
