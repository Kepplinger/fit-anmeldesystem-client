import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorInterceptor {
  public static toastr: ToastrService = null;

  public static catchErrorMessage(error: HttpErrorResponse): Observable<any> {
    if (error.status === 400) {
      ErrorInterceptor.toastr.error(error.error.errorMessage);
      return Observable.of(error);
    } else {
      return Observable.of(null);
    }
  }

}
