import { CategoryService } from './../../core/services/category.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/interfaces/product';
import { NgStyle } from '@angular/common';
import { Subscription } from 'rxjs';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgSpinnerService = inject(NgxSpinnerService);
  searchTerm:string = "";
  protected succMsg:string = "";
  protected products:Product[] = [];
  protected categories:Category[] = [];
  public productsSubscription !:Subscription;
  public categoriesSubscription !:Subscription;

  mainSliderOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    rtl:true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    rtl:true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: false
  }

  ngOnInit(): void 
  {
    this.productsSubscription = this._ProductService.getAllProducts().subscribe({
      next: (res)=>{
        this.products = res.data;
      },
      error: (err)=>{
        console.log(err);
        
      }
    }); 

    this.productsSubscription = this._CategoryService.getCategories().subscribe({
      next: (res)=>{
        this.categories = res.data;
      },
      error: (err)=>{
        console.log(err);
      }
    }); 
  }
  
  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }

  addToCart(id:string):void {
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
