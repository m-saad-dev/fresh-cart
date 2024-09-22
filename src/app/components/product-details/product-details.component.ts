import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private productSubscription!:Subscription
  protected product:Product|null = null;

  imagesOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId = params.get('id');
        this.productSubscription = this._ProductService.getProduct(productId).subscribe({
          next: (succRes) => {
            this.product = succRes.data;
          },
          error: (err)=>{
            
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  addToCart(id:string):void
  {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {

      }
    })
  }
}
