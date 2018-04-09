import { FormArray } from '@angular/forms';

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
}
