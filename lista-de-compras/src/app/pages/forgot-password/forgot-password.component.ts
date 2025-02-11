import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonComponent,
    InputTextComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  formForgot!: FormGroup;
  constructor(
    private router: Router,
    private auth: AuthService,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) {
    this.formForgot = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      user: new FormControl('', [Validators.required]),
    });
  }

  isValid: boolean = true;
  userIsValid: boolean = true;
  emailIsValid: boolean = true;
  wrong: boolean = false;

  register() {
    this.router.navigate(['register']);
  }

  submit() {
    // this.isValid = this.formForgot.valid;
    this.formForgot.controls["email"].valid ? this.emailIsValid = true : this.emailIsValid = false;
    this.formForgot.controls["user"].valid ? this.userIsValid = true : this.userIsValid = false;
    if (this.emailIsValid && this.userIsValid) {
      let Overlay = this.spinner.getSpinnerOverlayRef();
      //requisição endpoint forgot
      let auth = this.auth.forgotPassword(
        this.formForgot.controls['user'].value,
        this.formForgot.controls['email'].value
      );

      setTimeout(() => {
        if (auth) {
          console.log('Enviar email.');
          this.toast.success("E-mail enviado para " + this.formForgot.controls['email'].value)
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1000);
        } else {
          console.log('Email não encontrado.');
          this.wrong = true;
        }
        Overlay.dispose();
      }, 1500);
    }
  }
}
