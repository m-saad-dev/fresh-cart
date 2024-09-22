import { Pipe, PipeTransform, WritableSignal } from '@angular/core';
import { Category } from '../interfaces/category';

@Pipe({
  name: 'categoriesSearch',
  standalone: true
})
export class CategoriesSearchPipe implements PipeTransform {

  transform(categories:WritableSignal<Category[]>, search:string) {
    categories.update(
      (currCattegories:Category[]) => 
        currCattegories.filter((item)=> {item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())})
      
    )
    return categories();
  }

}
