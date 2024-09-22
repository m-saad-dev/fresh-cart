import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Brand } from '../interfaces/brand';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BransService {

  private readonly _HttpClient = inject(HttpClient);
  public brands:WritableSignal<Brand[]> = signal([]);
  search(searchTerm:string){
    this._HttpClient.get(`${environment.base_url}/brands/64089fe824b25627a25315d1`).subscribe({
      next: (res) => {console.log(res)}
    });
    return this.brands().filter((item)=> {
        return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      });
  }
  getBrands(): Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/brands`);
  }

  getBrand(id:string): Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/brands/${id}`);
  }

}
