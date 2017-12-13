import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validator } from '@angular/forms';
import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';

@Component({
  selector: 'fit-detailed-data',
  templateUrl: './detailed-data.component.html',
  styleUrls: ['./detailed-data.component.scss']
})
export class DetailedDataComponent implements OnInit {


  @Input()
  public fitFormGroup: FormGroup;

  public branches: Branch[] = [];

  public constructor(private branchDAO: BranchDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.branches = await this.branchDAO.getBranches();
  }

  public branchChanged(branch: Branch, event: any): void {

    let branchArray: FormArray = <FormArray>this.fitFormGroup.get('desiredBranches');

    if (event.target.checked) {
      branchArray.push(new FormControl(branch));
    } else {
      for (let i = 0; i < branchArray.length; i++) {
        if (branchArray.value[i] === branch) {
          branchArray.removeAt(i);
        }
      }
    }
  }

  public updateEstablishments(controlName: string, names: string[]): void {
    this.fitFormGroup.setControl(controlName, new FormArray(names.map(n => new FormControl(n))));
  }

}
