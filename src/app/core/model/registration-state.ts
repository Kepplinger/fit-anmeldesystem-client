export class RegistrationState {
  public id: number;

  public isLocked: boolean;
  public isCurrent: boolean;

  public constructor(id?: number,
                     isLocked?: boolean,
                     isCurrent?: boolean) {
    this.id = id;
    this.isLocked = isLocked;
    this.isCurrent = isCurrent;
  }
}
