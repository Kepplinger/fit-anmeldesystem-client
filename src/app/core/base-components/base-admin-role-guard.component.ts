import { UserAuthorizationService } from '../app-services/user-authorization.service';
import { FitUserRole } from '../model/enums/fit-user-role';

export abstract class BaseAdminRoleGuardComponent {

  protected constructor(protected userAuthorizationService: UserAuthorizationService) {
  }

  public isWritableFitAdmin(): boolean {
    let role: FitUserRole = this.userAuthorizationService.getUserRole();
    return role === FitUserRole.FitAdmin;
  }

  public isFitAdmin(): boolean {
    let role: FitUserRole = this.userAuthorizationService.getUserRole();
    return role === FitUserRole.FitAdmin || role === FitUserRole.FitReadOnly;
  }

  public isWritableAdmin(): boolean {
    let role: FitUserRole = this.userAuthorizationService.getUserRole();
    return role === FitUserRole.FitAdmin || role === FitUserRole.MemberAdmin;
  }
}
