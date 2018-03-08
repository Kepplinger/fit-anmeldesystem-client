export class ArrayUtils {
  public static deleteElement(array: any[], element: any): any[] {
    return array.splice(array.indexOf(element), 1);
  }

  public static getFirstElement(elements: any[]): any {
    if (elements.length > 0) {
      return elements[0];
    } else {
      return null;
    }
  }

  public static replaceElement(oldElement: any, newElement: any, elements: any[]): void {
    let index = elements.indexOf(oldElement);
    if (index !== -1) {
      elements[index] = newElement;
    }
  }
}
