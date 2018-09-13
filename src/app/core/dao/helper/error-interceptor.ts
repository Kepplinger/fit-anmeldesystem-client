import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorInterceptor {
  public static toastr: ToastrService = null;

  public static catchErrorMessage(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error.status === 500) {
      ErrorInterceptor.toastr.error(ErrorInterceptor.getErrorMessage(error));
      return Observable.create(error);
    } else if (error.status === 400) {
      ErrorInterceptor.toastr.error(ErrorInterceptor.getErrorMessage(error));
      return Observable.create(error);
    } else if (error.status === 404) {
      ErrorInterceptor.toastr.error('Der Vorgang konnte nicht durchgeführt werden. Fehlercode: 404');
      return Observable.create(null);
    } else {
      return Observable.create(null);
    }
  }

  private static getErrorMessage(error: HttpErrorResponse): string {
    if (error.error.errorMessage != null) {
      return error.error.errorMessage;
    } else if (error.error.errors != null && error.error.errors.length !== 0) {
      let errorMessage: string = '';

      for (let errorItem of error.error.errors) {
        errorMessage += errorItem.description + '\n';
      }

      return errorMessage;
    }
  }
}
