
import { 
  HttpInterceptorFn, 
  HttpRequest, 
  HttpHandlerFn, 
  HttpEvent 
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  // Clone request with credentials
  const authReq = req.clone({
    withCredentials: true // This sends cookies automatically
  });
  
  return next(authReq);
};