import { FormArray } from '@angular/forms';

export class FormArrayUtils {
  public static indexOf(array: FormArray, element: any): number {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i;
      }
    }
    return -1;
  }
}
