import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthorizationService} from '../app-services/user-authorization.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  public constructor(private userAuthorizationService: UserAuthorizationService,
                     private router: Router) {
  }

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userAuthorizationService.isUserAuthenticated()) {
      this.router.navigate(['/admin-tool', 'login']);
      return false;
    }
    return true;
  }
}
