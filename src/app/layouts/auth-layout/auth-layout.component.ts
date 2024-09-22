import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavComponent } from "../../components/auth-nav/auth-nav.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, AuthNavComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
