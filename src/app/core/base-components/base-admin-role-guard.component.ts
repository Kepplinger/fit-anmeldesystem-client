import { UserAuthorizationService } from '../app-services/user-authorization.service';
import { FitUserRole } from '../model/enums/fit-user-role';
import { BaseSubscriptionComponent } from './base-subscription.component';

export abstract class BaseAdminRoleGuardComponent extends  BaseSubscriptionComponent {

  protected constructor(protected userAuthorizationService: UserAuthorizationService) {
    super();
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
