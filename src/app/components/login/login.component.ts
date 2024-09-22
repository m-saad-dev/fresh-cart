import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMsgsComponent } from '../../shared/form-error-msgs/form-error-msgs.component';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormErrorMsgsComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading:boolean = false;
  errMsg:string = "";
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  loginForm:FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });

  submit()
  {
    if(this.loginForm.valid){
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (successRes)=>{
          this.isLoading = false;
          localStorage.setItem('token', successRes.token);
          this._AuthService.setUserData();
          this._Router.navigate(['/home']);
        },
        error: (errRes)=>{
          this.errMsg = errRes.error.message;
          this.isLoading = false;
        }
      })
    }
  }

}
