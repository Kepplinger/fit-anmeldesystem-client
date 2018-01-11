import { el } from '@angular/platform-browser/testing/src/browser_util';

export class ArrayUtils {
  public static deleteElement(array: any[], element: any): any[] {
    console.log(array.indexOf(element));
    return array.splice(array.indexOf(element), 1);
  }
}
