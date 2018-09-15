import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminAuthorizationService} from '../app-services/admin-authorization.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  public constructor(private adminAuthorizationService: AdminAuthorizationService,
                     private router: Router) {
  }

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.adminAuthorizationService.isUserAuthenticated()) {
      this.router.navigate(['/admin-tool', 'login']);
      return false;
    }
    return true;
  }
}
