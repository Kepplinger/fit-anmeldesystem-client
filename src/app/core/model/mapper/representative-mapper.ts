import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Representative } from '../representative';

export class RepresentativeMapper {

  private static formBuilder: FormBuilder = new FormBuilder();

  public static mapRepresentativeToFormGroup(representative: Representative): FormGroup {
    let formGroup =  RepresentativeMapper.formBuilder.group(representative);

    formGroup.controls['name'].setValidators(Validators.required);
    formGroup.controls['email'].setValidators([Validators.required, Validators.email]);
    formGroup.controls['name'].updateValueAndValidity();
    formGroup.controls['email'].updateValueAndValidity();

    return formGroup;
  }
}
