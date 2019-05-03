import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReauthService } from '../../components/admin-tool/services/reauth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  public constructor(private reauthService: ReauthService,
                     private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => {
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.reauthService.redirectAccordingly(this.router.url);
          }
        }
      )
    );
  }
}
