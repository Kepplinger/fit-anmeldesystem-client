import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { FitUserRole } from '../model/enums/fit-user-role';
import { UserAuthorizationService } from '../app-services/user-authorization.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class IsRoleGrantedGuard implements CanActivate {

  public constructor(private adminAuthenticationService: UserAuthorizationService,
                     private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let requiredRoles: FitUserRole[] = route.data['roles'] as FitUserRole[];
    let role: FitUserRole = this.adminAuthenticationService.getUserRole();

    if (requiredRoles.some(r => r === role)) {
      return true;
    } else {
      if (requiredRoles.find(r => r === FitUserRole.Member)) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/admin-tool', 'dash']);
      }
      return false;
    }
  }
}
