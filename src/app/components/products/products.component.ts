import { Component, inject, OnInit, PLATFORM_ID, WritableSignal, signal } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductSearchPipe } from '../../core/pipes/product-search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule, ProductSearchPipe, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  protected readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  protected productsSubscription!:Subscription;
  protected addToCartSubscription!:Subscription;
  protected products:Product[] = [];
  searchTerm:string = "";
  protected succMsg:string = "";
  
  addToCart(id:string):void
  {
    this.addToCartSubscription = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {

      }
    })
    setTimeout(()=>{
      this.addToCartSubscription.unsubscribe();
    }, 1000);
  }
  updateFav(productId:string)
  {
    this._ProductService.updateFav(productId);
  }
  isFavProduct(productId:string): boolean
  {
    return this._ProductService.isFav(productId);
  }
  ngOnInit(): void {
    this.productsSubscription = this._ProductService.getAllProducts().subscribe({
      next: (succRes) => {
        this.products = succRes.data;
      }
    });
  }
  
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
