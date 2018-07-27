import { DataFile } from '../data-file';

export class DataFileHelper {
  public static compare(first: DataFile, second: DataFile): boolean {

    if (first == null && second == null) {
      return true;
    }

    if (first == null || second == null) {
      return false;
    }

    return first.id === second.id &&
      first.dataUrl === second.dataUrl &&
      first.name === second.name;
  }
}
