import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToasterService = inject(ToastrService);
  return next(req).pipe(catchError((res) => {
    _ToasterService.error(res.error.message);
    return throwError(()=> res.error.message);
  }));
};
