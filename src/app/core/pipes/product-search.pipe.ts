import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'ProductSearch',
  standalone: true
})
export class ProductSearchPipe implements PipeTransform {

  transform(products:any[], search:string): any[] {
    return products.filter((item)=> item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
