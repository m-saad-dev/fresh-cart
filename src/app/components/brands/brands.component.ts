import { Component, inject, WritableSignal, signal, Signal, computed } from '@angular/core';
import { BransService } from '../../core/services/brans.service';
import { Brand } from '../../core/interfaces/brand';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  protected readonly _BransService = inject(BransService);
  protected readonly _ProductService = inject(ProductService);
  searchTerm:WritableSignal<string> = signal("");
  private brandsSubscription!:Subscription;
  protected brands:Signal<Brand[]> = computed(() => {
    return this._BransService.search(this.searchTerm());
  });
  ngOnInit(): void {
    this.brandsSubscription = this._BransService.getBrands().subscribe({
      next: (res) => {
        this._BransService.brands.set(res.data)
      }
    });
  }
  ngOnDestroy(): void {
    this.brandsSubscription.unsubscribe();
  }
  getBrands():void
  {
    this._BransService.getBrands().subscribe({
      next: (res) => {
        this._BransService.brands.set(res.data)
      }
    });
  }

}
