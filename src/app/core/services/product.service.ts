import { HttpClient } from '@angular/common/http';
import { inject, Injectable, WritableSignal, signal, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../interfaces/product';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  public products:WritableSignal<Product[]> = signal([]);

  getAllProducts(): Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/products`);
  }
  
  getProduct(id:string|null): Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/products/${id}`);
  }
  
  updateFav(productId:string):void
  {
    if(isPlatformBrowser(this._PLATFORM_ID) && localStorage.getItem('fav-products')){
      let favs = JSON.parse(localStorage.getItem('fav-products')!);
      let index = favs.indexOf(productId);
      if(index == -1){
        favs.push(productId);
      } else {
        favs.splice(index, 1);
      }
      
      localStorage.setItem('fav-products', JSON.stringify(favs));
    }  else {
      localStorage.setItem('fav-products', JSON.stringify([productId]));
    }
  }
  isFav(productId:string):boolean
  {
    if(isPlatformBrowser(this._PLATFORM_ID) && localStorage.getItem('fav-products')){
      let favs = JSON.parse(localStorage.getItem('fav-products')!);
      return favs.includes(productId);
    } else {
      return false
    }
  }
}
