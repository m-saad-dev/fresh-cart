import { Subscription } from 'rxjs';
import { CartService } from './../../core/services/cart.service';
import { Component, inject } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { CartItem } from '../../core/interfaces/cart-item';
import { CartDetails } from '../../core/interfaces/cart-details';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly _CartService = inject(CartService);
  private getItemsSubscription!:Subscription;
  protected succMsg:string = "";
  protected cart:CartDetails = {} as CartDetails;

  ngOnInit(): void {
    this.getItms()
  }
  ngOnDestroy(): void {
    this.getItemsSubscription.unsubscribe();
  }
  getItms():void
  {
    this.getItemsSubscription = this._CartService.getCartItems().subscribe({
      next: (res) => {
        console.log(res.data);
        
        this.cart = res.data
      },
      error: (err) => {

      }
    })
  }
  addToCart(id:string):void
  {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this.succMsg = res.message
      },
      error: (err) => {
        
      }
    })
  }
  updateItem(id:string, quantity:number):void
  {
    this._CartService.updateItem(id, quantity).subscribe({
      next: (res) => {
        this.cart = res.data
        this._CartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {

      }
    })
  }
  removeItem(id:string):void
  {
    this._CartService.removeItem(id).subscribe({
      next: (res) => {
        this.cart = res.data
        this._CartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {

      }
    })
  }
  clearCartItems():void
  {
    this._CartService.clearCartItems().subscribe({
      next: (res) => {
        this.cart = {} as CartDetails;
        this._CartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {

      }
    })
  }
}
