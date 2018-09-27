import { ApplicationStateService } from '../app-services/application-state.service';
import { UserAuthorizationService } from '../app-services/user-authorization.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FitApplication } from '../model/enums/fit-application';

@Injectable()
export class UserAuthenticationInterceptor implements HttpInterceptor {

  public constructor(private applicationStateService: ApplicationStateService,
                     private userAuthorizationService: UserAuthorizationService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userAuthorizationService.isUserAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userAuthorizationService.getEncodedToken()}`
        }
      });
    }

    return next.handle(request);
  }
}
