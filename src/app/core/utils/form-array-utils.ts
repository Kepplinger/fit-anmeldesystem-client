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

}
