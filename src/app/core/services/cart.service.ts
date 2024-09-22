import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  private headers:any = {token: localStorage.getItem('token')}
  public cartItemsCount:WritableSignal<number> = signal(0);

  getCartItems():Observable<any>
  {
    return this._HttpClient.get(
      `${environment.base_url}/cart`,
       {headers: this.headers }
      )
  }
  addToCart(id:string):Observable<any>
  {
    return this._HttpClient.post(
      `${environment.base_url}/cart`,
       {'productId': id},
       {headers: this.headers }
      )
  }
  updateItem(id:string, quantity:number):Observable<any>
  {
    return this._HttpClient.put(
      `${environment.base_url}/cart/${id}`,
       {count: quantity },
       {headers: this.headers }
      )
  }
  removeItem(id:string):Observable<any>
  {
    return this._HttpClient.delete(
      `${environment.base_url}/cart/${id}`,
       {headers: this.headers }
      )
  }
  clearCartItems():Observable<any>
  {
    return this._HttpClient.delete(
      `${environment.base_url}/cart/`,
       {headers: this.headers }
      )
  }
}
