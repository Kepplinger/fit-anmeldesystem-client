import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../../core/utils/form-array-utils';
declare let $;
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

  public constructor(private branchDAO: BranchDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.branches = await this.branchDAO.fetchBranches();
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

  public storeFroala():void{
    var html =   $('#editor').froalaEditor('html.get');
    //console.log(html.toString());
    this.stepFormGroup.controls['description'].setValue(html.toString());
  }



  public options: Object = {
    charCounterCount: true,
    charCounterMax: 1000,
    quickInsert:false,
    heightMin: 250,
    heightMax: 490,
    enter: $.FroalaEditor.ENTER_BR,
    tooltips:true,
    fontSize:'30',
    placeholderText: 'Bitte Firmenbeschreibung eingeben.......',
    quickInsertTags:'',
    inlineMode:true,
    toolbarButtons: ['undo', 'redo' , '|', 'bold', 'italic', 'underline' , '|', 'formatUL', 'formatOL','clearFormatting',  '|','superscript', 'outdent', 'indent']
    //toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    //toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    //toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
}
