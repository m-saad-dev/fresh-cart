import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMsgsComponent } from "../../shared/form-error-msgs/form-error-msgs.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormErrorMsgsComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  protected errMsg:string = "";
  protected successMsg:string = "";
  protected resetEmailValue!:string;
  protected isLoading = false;
  protected step:number = 1;
  
  protected verifyEmailForm = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })
  
  protected verifyCodeForm = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  })
  
  protected resetPasswordForm = this._FormBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.minLength(6)]],
  })
  
  sendReset():void
  {
    this.isLoading = true;
    this._AuthService.sendReset(this.verifyEmailForm.value).subscribe({
      next: (res) => {
        this.step = 2;
        this.isLoading = false;
        this.errMsg = "";
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.isLoading = false;
      }
    });
  }
  verifyCode():void
  {
    this.isLoading = true;
    this._AuthService.verifyCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.step = 3;
        this.isLoading = false;
        this.errMsg = "";
        
        this.resetEmailValue = this.verifyEmailForm.controls.email.value || "";
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.isLoading = false;
      }
    });
  }
  setNewPassword():void
  {
    this.isLoading = true;
    this.resetPasswordForm.get('email')?.patchValue(this.resetEmailValue);
    this._AuthService.verifyCode(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        if(isPlatformBrowser(this._PLATFORM_ID)){
          localStorage.setItem('token', res.token);
        }
        setTimeout(()=>{this._Router.navigate(['/home'])}, 2000, ()=>{
          this.successMsg = 'Password reset Successfully';
        });
      },
      error: (err) => {
        this.errMsg = err.error.message;
        this.isLoading = false;
      }
    });
  }
}
