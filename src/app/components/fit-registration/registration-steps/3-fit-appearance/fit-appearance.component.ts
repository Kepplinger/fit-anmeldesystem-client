import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Resource } from '../../../../core/model/resource';
import { ResourceDAO } from '../../../../core/dao/resource.dao';
import { Representative } from '../../../../core/model/representative';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
import { Branch } from '../../../../core/model/branch';

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

  public constructor(private resourceDAO: ResourceDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.resources = await this.resourceDAO.getResources();
    this.resourceFormArray = <FormArray>this.stepFormGroup.get('resources');
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
  }

  public onRepresentativeAdd(): void {
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
  }

  public addRepresentative(representative: Representative): void {
    let representativeArray: FormArray = <FormArray>this.stepFormGroup.get('representatives');
    this.representatives.push(representative);
    representativeArray.push(new FormControl(representative));
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

}
