import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Resource } from '../../../../core/model/resource';
import { ResourceDAO } from '../../../../core/dao/resource.dao';
import { Representative } from '../../../../core/model/representative';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { DataFile } from '../../../../core/model/data-file';
import { BaseFormValidationComponent } from '../base-form-validation.component';
import { RepresentativeMapper } from '../../../../core/model/mapper/representative-mapper';

@Component({
  selector: 'fit-fit-appearance',
  templateUrl: './fit-appearance.component.html',
  styleUrls: ['./fit-appearance.component.scss']
})
export class FitAppearanceComponent extends BaseFormValidationComponent implements OnInit {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  @Output()
  public onInput: EventEmitter<void> = new EventEmitter<void>();

  public resources: Resource[] = [];
  public resourceFormArray: FormArray = null;

  public constructor(private resourceDAO: ResourceDAO,
                     private formBuilder: FormBuilder,
                     private accountManagementService: AccountManagementService,
                     private toastr: ToastrService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.resourceFormArray = <FormArray>this.stepFormGroup.get('resources');

    if (this.getRepresentativeFormArray().length === 0) {
      this.addNewRepresentative();
    }

    this.accountManagementService.bookingFilled.subscribe(
      () => {
        this.resourceFormArray = <FormArray>this.stepFormGroup.get('resources');
      });

    this.resources = await this.resourceDAO.fetchResources();
  }

  public onRepresentativeAdd(): void {
    this.addNewRepresentative();
  }

  public deleteRepresentative(index: number): void {
    (<FormArray>this.stepFormGroup.get('representatives')).removeAt(index);
  }

  public resourceChanged(resource: Resource, event: any): void {
    if (event.target.checked) {
      this.resourceFormArray.push(new FormControl(resource));
    } else {
      for (let i = 0; i < this.resourceFormArray.length; i++) {
        if (this.resourceFormArray.value[i] === resource) {
          this.resourceFormArray.removeAt(i);
        }
      }
    }
  }

  public isResourceSelected(resource: Resource): boolean {
    return FormArrayUtils.indexOfWithId(this.resourceFormArray, resource) !== -1;
  }

  public getRepresentativeFormArray(): AbstractControl[] {
    return (this.stepFormGroup.get('representatives') as FormArray).controls;
  }

  public getRepresentativeImage(index: number): DataFile {
    let image = this.getRepresentativeFormArray()[index].value.image as DataFile;

    if (image != null) {
      return image;
    } else {
      return this.getNewPlaceholderImage();
    }
  }

  public onImagePick(file: PickedFile | FilePickerError, index: number): void {
    if (file instanceof PickedFile) {

      let image = this.getRepresentativeImage(index);
      image.name = file.name;
      image.dataUrl = file.dataURL;

      this.getRepresentativeFormArray()[index].patchValue({
        image: image
      });
    } else if (file === FilePickerError.FileTooBig) {
      this.toastr.warning('Das Bild darf nicht größer wie 2MB sein!');
    } else if (file === FilePickerError.InvalidFileType) {
      this.toastr.warning('Die angegeben Datei ist kein Bild!');
    } else if (file === FilePickerError.UndefinedInput) {
      this.toastr.warning('Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut!');
    }
  }

  private addNewRepresentative(): void {
    let representativeArray: FormArray = <FormArray>this.stepFormGroup.get('representatives');
    representativeArray.push(RepresentativeMapper.mapRepresentativeToFormGroup(
      new Representative('', '', this.getNewPlaceholderImage())
    ));
  }

  private getNewPlaceholderImage(): DataFile {
    return new DataFile('Bild auswählen ...', '../../../../../assets/contact.png');
  }
}
