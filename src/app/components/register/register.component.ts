import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMsgsComponent } from "../../shared/form-error-msgs/form-error-msgs.component";
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorMsgsComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  protected errMsg:string = "";
  protected successMsg:string = "";
  protected isLoading = false;

  registerForm:FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^201[0125][0-9]{8}$/)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    rePassword: [null]
  }, {validators: [this.confirmPassword]})
  
  confirmPassword(form:AbstractControl)
  {
    
    if(form.get('rePassword')?.value === form.get('password')?.value){
      return null;
    } else {
      form.get('rePassword')?.setErrors( {'mismatch': true});
      return {}
    }
  }
  submit():void
  {
    
    if(this.registerForm.valid){
      this.isLoading = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (successRes) => {
          this.isLoading = false;
          this.successMsg = 'Registered Successfully';
          setTimeout(()=>{this._Router.navigate(['/login'])}, 2000, ()=>{
            this.successMsg = "";
          });
        },
        error: (errRes:HttpErrorResponse) => {
          this.errMsg = errRes.error.message;
          this.isLoading = false;
        }
      })
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.get('rePassword')?.setErrors( {'mismatch': true});
    }
    
  }
}
