import { FormArray, FormControl } from '@angular/forms';
import { Branch } from '../model/branch';

export class FormArrayUtils {
  public static indexOf(array: FormArray, element: any): number {
    if (array != null) {
      for (let i = 0; i < array.length; i++) {
        if (array.value[i] === element) {
          return i;
        }
      }
    }
    return -1;
  }

  public static indexOfWithId(array: FormArray, element: any): number {
    if (array != null) {
      for (let i = 0; i < array.length; i++) {
        if (array.value[i].id === element.id) {
          return i;
        }
      }
    }
    return -1;
  }


  public static elementChanged(element: any, formArray: FormArray, event: any): void {
    if (event.target.checked) {
      formArray.push(new FormControl(element));
    } else {
      let index = FormArrayUtils.indexOfWithId(formArray, element);

      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }
}
