import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMsgsComponent } from '../../shared/form-error-msgs/form-error-msgs.component';
import { ActivatedRoute } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { OrderService } from '../../core/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormErrorMsgsComponent],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrderService);
  protected checkoutSubscription!:Subscription;
  protected isLoading:boolean = false;
  protected errMsg:string = "";
  protected cartId:string = "";

  protected placeOrderForm:FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^201[0125][0-9]{8}$/)]],
    city: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('cartId') || "";
      }
    })
  }

  checkout(){
    this.checkoutSubscription = this._OrderService.checkout(this.cartId, this.placeOrderForm.value).subscribe({
      next: (res) => {
        open(res.session.url, '_self')
      }
    });
  }
}
