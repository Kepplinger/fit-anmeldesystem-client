import { ApplicationStateService } from '../app-services/application-state.service';
import { AdminAuthorizationService } from '../app-services/admin-authorization.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FitApplication } from '../model/enums/fit-application';

@Injectable()
export class AdminAuthenticationInterceptor implements HttpInterceptor {

  public constructor(private applicationStateService: ApplicationStateService,
                     private adminAuthorizationService: AdminAuthorizationService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.applicationStateService.activatedApplication === FitApplication.AdminTool
      && this.adminAuthorizationService.token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.adminAuthorizationService.token}`
        }
      });
    }

    return next.handle(request);
  }
}
