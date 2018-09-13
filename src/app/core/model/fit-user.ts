import { FitUserRole } from './enums/fit-user-role';

export class FitUser {
  public email: string;
  public role: FitUserRole;

  public constructor(email: string, role: FitUserRole) {
    this.email = email;
    this.role = role;
  }
}
