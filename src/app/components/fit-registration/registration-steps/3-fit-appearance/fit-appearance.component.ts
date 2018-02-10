import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Resource } from '../../../../core/model/resource';
import { ResourceDAO } from '../../../../core/dao/resource.dao';
import { Representative } from '../../../../core/model/representative';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
import { PickedFile } from '../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../libs/file-picker/file-picker-error';
import { ArrayUtils } from '../../../../core/utils/array-utils';

@Component({
  selector: 'fit-fit-appearance',
  templateUrl: './fit-appearance.component.html',
  styleUrls: ['./fit-appearance.component.scss']
})
export class FitAppearanceComponent implements OnInit {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  public representatives: Representative[] = [];
  public resources: Resource[] = [];
  public resourceFormArray: FormArray = null;
  public touchedRepresentatives: any[] = [];

  public constructor(private resourceDAO: ResourceDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.resourceFormArray = <FormArray>this.stepFormGroup.get('resources');
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
    this.resources = await this.resourceDAO.fetchResources();
  }

  public onRepresentativeAdd(): void {
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
  }

  public addRepresentative(representative: Representative): void {
    let representativeArray: FormArray = <FormArray>this.stepFormGroup.get('representatives');
    this.representatives.push(representative);

    this.touchedRepresentatives.push({
      representative: representative,
      name: false,
      email: false
    });

    representativeArray.push(new FormControl(representative));
  }

  public deleteRepresentative(representative: Representative): void {
    let representativeArray: FormArray = <FormArray>this.stepFormGroup.get('representatives');
    ArrayUtils.deleteElement(this.representatives, representative);
    ArrayUtils.deleteElement(
      this.touchedRepresentatives,
      this.touchedRepresentatives.find(r => r.representative === representative)
    );
    representativeArray.removeAt(FormArrayUtils.indexOf(representativeArray, representative));
  }

  // TODO possible outsource (because of code duplication)
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
    return FormArrayUtils.indexOf(this.resourceFormArray, resource) !== -1;
  }

  public onImagePick(file: PickedFile | FilePickerError, representative: Representative): void {
    if (file instanceof PickedFile) {
      representative.image = file.dataURL;
    } else if (file === FilePickerError.FileTooBig) {
      console.log('too big');
    } else if (file === FilePickerError.InvalidFileType) {
      console.log('invalid file type');
    } else if (file === FilePickerError.UndefinedInput) {
      console.log('undefined input');
    }
  }

  public onRepresentativeTouch(representative: Representative, attribute: string): void {
    let foundRepresentative = this.touchedRepresentatives.find(r => r.representative === representative);

    if (attribute === 'name') {
      foundRepresentative.name = true;
    } else if (attribute === 'email') {
      foundRepresentative.email = true;
    }
  }

  public isRequired(representative: Representative, attribute: string): boolean {

    let input = '';

    if (attribute === 'name') {
      input = representative.name;
    } else if (attribute === 'email') {
      input = representative.email;
    }

    return (input == null || input === '') && this.isTouched(representative, attribute);
  }

  public isTouched(representative: Representative, attribute: string): boolean {
    if (attribute === 'name') {
      return this.touchedRepresentatives.find(r => r.representative === representative).name;
    } else if (attribute === 'email') {
      return this.touchedRepresentatives.find(r => r.representative === representative).email;
    } else {
      return false;
    }
  }
}
