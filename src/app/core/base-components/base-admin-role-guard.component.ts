import { AdminAuthorizationService } from '../app-services/admin-authorization.service';
import { FitUserRole } from '../model/enums/fit-user-role';

export abstract class BaseAdminRoleGuardComponent {

  protected constructor(protected adminAuthorizationService: AdminAuthorizationService) {
  }

  protected isWritableFitAdmin(): boolean {
    let role: FitUserRole = this.adminAuthorizationService.getUserRole();
    return role === FitUserRole.FitAdmin;
  }

  protected isFitAdmin(): boolean {
    let role: FitUserRole = this.adminAuthorizationService.getUserRole();
    return role === FitUserRole.FitAdmin || role === FitUserRole.FitReadOnly;
  }

  protected isWritableAdmin(): boolean {
    let role: FitUserRole = this.adminAuthorizationService.getUserRole();
    return role === FitUserRole.FitAdmin || role === FitUserRole.MemberAdmin;
  }
}
