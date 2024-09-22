import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {
        path:'',
        component: AuthLayoutComponent, 
        canActivate: [authenticatedGuard],
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'forgot-password', component: ForgotpasswordComponent}
        ]
    },
    {
        path:'',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children:[
            {path: 'home', loadComponent: () => import('./components/home/home.component').then((component)=> component.HomeComponent)},
            {path: 'products', loadComponent: () => import('./components/products/products.component').then((component)=> component.ProductsComponent)},
            {path: 'brands', loadComponent: () => import('./components/brands/brands.component').then((component)=> component.BrandsComponent)},
            {path: 'categories', loadComponent: () => import('./components/categories/categories.component').then((component)=> component.CategoriesComponent)},
            {path: 'fav-products', loadComponent: () => import('./components/fav-products/fav-products.component').then((component)=> component.FavProductsComponent)},
            {path: 'product-details/:id', loadComponent: () => import('./components/product-details/product-details.component').then((component)=> component.ProductDetailsComponent)},
            {path: 'cart', loadComponent: () => import('./components/cart/cart.component').then((component)=> component.CartComponent)},
            {path: 'place-order', loadComponent: () => import('./components/place-order/place-order.component').then((component)=> component.PlaceOrderComponent)},
            {path: 'all-orders', loadComponent: () => import('./components/all-orders/all-orders.component').then((component)=> component.AllOrdersComponent)},
        ]
    },
    {path: '**', loadComponent: () => import('./components/not-found/not-found.component').then((component)=> component.NotFoundComponent)},
];
