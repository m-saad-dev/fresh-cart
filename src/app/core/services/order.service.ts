import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _AuthService = inject(AuthService);
  private headers:any = {token: localStorage.getItem('token')}
  
  checkout(cartId:string, data:object): Observable<any>
  {
    return this._HttpClient.post(
      `${environment.base_url}/orders/checkout-session/${cartId}?url=${environment.domain_url}`,
      {shippingAddress: data},
      { headers: this.headers }
    )
  }
  getUserOrders(): Observable<any>
  {
    this._AuthService.setUserData();
    return this._HttpClient.get(
      `${environment.base_url}/orders/user/${this._AuthService.userData.id}`,
      { headers: this.headers }
    )
  }
}
