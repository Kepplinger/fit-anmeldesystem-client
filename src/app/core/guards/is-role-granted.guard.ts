import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {FitUserRole} from '../model/enums/fit-user-role';
import {AdminAuthorizationService} from '../app-services/admin-authorization.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class IsRoleGrantedGuard implements CanActivate {

  public constructor(private adminAuthenticationService: AdminAuthorizationService,
                     private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let requiredRoles: FitUserRole[] = route.data['roles'] as FitUserRole[];
    let role: FitUserRole = this.adminAuthenticationService.getUserRole();

    console.log(requiredRoles);
    console.log(role);

    if (requiredRoles.some(r => r === role)) {
      return true;
    } else {
      this.router.navigate(['/admin-tool', 'dash']);
      return false;
    }
  }
}
