import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectTranslateService } from '../../core/services/project-translate.service';
import { NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, NgClass],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {
  protected readonly _AuthService = inject(AuthService);
  protected readonly _ProjectTranslateService = inject(ProjectTranslateService);
  protected readonly _CartService = inject(CartService);
  protected readonly _ProductService = inject(ProductService);
  ngOnInit(): void {
    this._CartService.getCartItems().subscribe({
      next: (res) => {this._CartService.cartItemsCount.set(res.numOfCartItems)}
    });
  }
  getCurrentLang():string
  {
    return this._ProjectTranslateService.getCurrentLang();
  }
  updateLang(lang:string){
    this._ProjectTranslateService.updateLang(lang)
  }

}
