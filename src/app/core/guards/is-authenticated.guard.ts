import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthorizationService } from '../app-services/user-authorization.service';
import { ReauthService } from '../../components/admin-tool/services/reauth.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  public constructor(private userAuthorizationService: UserAuthorizationService,
                     private reauthService: ReauthService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userAuthorizationService.isUserAuthenticated()) {
      this.reauthService.redirectAccordingly(state.url);
      return false;
    } else {
      return true;
    }
  }
}
