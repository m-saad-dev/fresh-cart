import { HttpClient } from '@angular/common/http';
import { inject, Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly _HttpClient = inject(HttpClient);
  public categories:WritableSignal<Category[]> = signal([]);
  search(searchTerm:string){
    return this.categories().filter((item)=> {
        return item.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      });
  }
  getCategories(): Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/categories`);
  }

  getCategory(id:string): Observable<any>
  {
    return this._HttpClient.get(`${environment.base_url}/categories/${id}`);
  }

}
