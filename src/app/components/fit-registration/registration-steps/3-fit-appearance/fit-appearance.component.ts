import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Resource } from '../../../../core/model/resource';
import { ResourceDAO } from '../../../../core/dao/resource.dao';
import { Representative } from '../../../../core/model/representative';

@Component({
  selector: 'fit-fit-appearance',
  templateUrl: './fit-appearance.component.html',
  styleUrls: ['./fit-appearance.component.scss']
})
export class FitAppearanceComponent implements OnInit {

  @Input()
  public fitFormGroup: FormGroup;

  public resources: Resource[] = [];
  public representatives: Representative[] = [];

  public constructor(private resourceDAO: ResourceDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.resources = await this.resourceDAO.getResources();
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
  }

  public onRepresentativeAdd(): void {
    this.addRepresentative(new Representative('', '', '../../../../../assets/contact.png'));
  }

  public addRepresentative(representative: Representative): void {
    let representativeArray: FormArray = <FormArray>this.fitFormGroup.get('representatives');
    this.representatives.push(representative);
    representativeArray.push(new FormControl(representative));
  }

  // TODO possible outsource (because of code duplication)
  public resourceChanged(resource: Resource, event: any): void {

    let resourceArray: FormArray = <FormArray>this.fitFormGroup.get('resources');

    if (event.target.checked) {
      resourceArray.push(new FormControl(resource));
    } else {
      for (let i = 0; i < resourceArray.length; i++) {
        if (resourceArray.value[i] === resource) {
          resourceArray.removeAt(i);
        }
      }
    }

  }

}
