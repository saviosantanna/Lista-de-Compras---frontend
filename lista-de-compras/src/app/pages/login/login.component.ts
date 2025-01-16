import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private spinner: SpinnerService
  ) {
    this.formLogin = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  @Input() isValid: boolean = true;

  register() {
    this.router.navigate(['register']);
  }

  submit() {
    console.log(this.formLogin.value);
    this.formLogin.valid ? this.isValid = true : this.isValid = false;
    let Overlay = this.spinner.getSpinnerOverlayRef();
    if(this.isValid){

    }

    setTimeout(()=>{Overlay.dispose()}, 1500);

  }
}
