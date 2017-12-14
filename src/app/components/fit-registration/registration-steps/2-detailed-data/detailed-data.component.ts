import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';

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

  public branches: Branch[] = [];
  public branchFormArray: FormArray = null;

  public constructor(private branchDAO: BranchDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.branches = await this.branchDAO.getBranches();
    this.branchFormArray = <FormArray>this.stepFormGroup.get('desiredBranches');
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

  // TODO do bist grod
  public isBranchSelected(branch: Branch): boolean {
    return FormArrayUtils.indexOf(this.branchFormArray, branch) !== -1;
  }

  public updateEstablishments(controlName: string, names: string[]): void {
    this.stepFormGroup.setControl(controlName, new FormArray(names.map(n => new FormControl(n))));
  }

}
