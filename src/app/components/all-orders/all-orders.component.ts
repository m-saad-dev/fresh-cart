import { subscribe } from 'diagnostics_channel';
import { OrderService } from './../../core/services/order.service';
import { Component, inject } from '@angular/core';
import { Order } from '../../core/interfaces/order';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {
  private readonly _OrderService = inject(OrderService);
  public orders:Order[] = [];

  ngOnInit(): void {
    this._OrderService.getUserOrders().subscribe({
      next: (res)=>{
        this.orders = res;
      }
    });
  }

}
