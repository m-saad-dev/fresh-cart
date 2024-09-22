import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient)
  private readonly _Router = inject(Router);
  public userData:any = null;
  setRegisterForm(data:object):Observable<any>
  {
    return this._httpClient.post(`${environment.base_url}/auth/signup`, data);
  }

  setLoginForm(data:object):Observable<any>
  {
    return this._httpClient.post(`${environment.base_url}/auth/signin`, data);
  }

  setUserData(): void
  {
    let token = localStorage.getItem('token')??"";
    this.userData = jwtDecode(token)
  }

  signOut():void
  {
    localStorage.removeItem('token');
    this.userData = null;
    this._Router.navigate(['/login']);
  }
  sendReset(data:object):Observable<any>
  {
    return this._httpClient.post(`${environment.base_url}/auth/forgotPasswords`, data)
  }
  verifyCode(data:object):Observable<any>
  {
    return this._httpClient.post(`${environment.base_url}/auth/verifyResetCode`, data)
  }
  setNewPassword(data:object):Observable<any>
  {
    return this._httpClient.put(`${environment.base_url}/auth/verifyRessetCode`, data)
  }

}
