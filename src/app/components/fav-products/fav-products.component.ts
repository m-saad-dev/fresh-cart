import { FormsModule } from '@angular/forms';
import { Product } from '../../core/interfaces/product';
import { ProductSearchPipe } from '../../core/pipes/product-search.pipe';
import { ProductService } from './../../core/services/product.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-fav-products',
  standalone: true,
  imports: [ProductSearchPipe, FormsModule, RouterLink, NgClass],
  templateUrl: './fav-products.component.html',
  styleUrl: './fav-products.component.scss'
})
export class FavProductsComponent {
  protected favProducts:Product[] = [] ;
  protected readonly _ProductService = inject(ProductService);
  protected readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  protected productsSubscription!:Subscription;
  protected addToCartSubscription!:Subscription;


  protected searchTerm:string = "";
  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID) && localStorage.getItem('fav-products'))
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.favProducts = res.data.filter((product:Product) => JSON.parse(localStorage.getItem('fav-products')!).includes(product.id))
        
      }
    });
  }
  remove(productId:string)
  {
    this.favProducts = this.favProducts.filter((product) => product.id != productId);
    this._ProductService.updateFav(productId)
  }
  addToCart(id:string):void
  {
    this.addToCartSubscription = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {

      }
    });
    setTimeout(()=>{
      this.addToCartSubscription.unsubscribe();
    }, 1000);
  }
}
