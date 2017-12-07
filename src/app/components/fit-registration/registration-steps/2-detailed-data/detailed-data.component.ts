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
    // this.fitFormGroup.setControl('desiredBranches', new FormArray(this.branches.map(b => new FormControl(b))));
  }

  public updateEstablishments(controlName: string, names: string[]): void {
    let establishments = new FormArray(names.map(n => new FormControl(n)));
    this.fitFormGroup.setControl(controlName, establishments);
  }

}
