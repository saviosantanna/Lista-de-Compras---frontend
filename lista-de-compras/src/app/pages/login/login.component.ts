import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InputTextComponent } from "../../components/input-text/input-text.component";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(){}

  @Input() texto: string = environment.name;
}
