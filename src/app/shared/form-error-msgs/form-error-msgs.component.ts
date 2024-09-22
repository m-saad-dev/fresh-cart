import { Component, Input } from '@angular/core';
import { Error } from '../../core/interfaces/inputs-errors-msgs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error-msgs',
  standalone: true,
  imports: [],
  templateUrl: './form-error-msgs.component.html',
  styleUrl: './form-error-msgs.component.scss'
})
export class FormErrorMsgsComponent {
  inputsErrorsMsgs:Error[]= [
    {
      errorName: "required",
      inputNames: ["email", "name", "phone", "password", "rePassword", "newPassword", "resetCode"],
      msg: "is required",
      minlength:null,
      maxlength:null
    },
    {
      errorName: "email",
      inputNames: ["email"],
      msg: "must be a valid email",
      minlength:null,
      maxlength:null
    },
    {
      errorName: "maxlength",
      inputNames: ["nam"],
      msg: "max-length is",
      minlength:15,
      maxlength:null
    },
    {
      errorName: "minlength",
      inputNames: ["password", "rePassword", "newPassword"],
      msg: "min-length is",
      minlength:6,
      maxlength:null
    },
    {
      errorName: "maxlength",
      inputNames: ["resetCode"],
      msg: "Length must be ",
      minlength:6,
      maxlength:null
    },
    {
      errorName: "minlength",
      inputNames: ["resetCode"],
      msg: "Length must be ",
      minlength:6,
      maxlength:null
    },
    {
      errorName: "pattern",
      inputNames: ["phone"],
      msg: "must be like this 20 1x XxX xXxX ",
      minlength:null,
      maxlength:null
    },
    {
      errorName: "mismatch",
      inputNames: ["rePassword"],
      msg: "rePassword and password must be the same",
      minlength:null,
      maxlength:null
    }
  ]
  
  @Input() form!:FormGroup;
  @Input() controlName!:string;
}
