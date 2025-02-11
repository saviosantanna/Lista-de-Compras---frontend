import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

type statusTypes = 'success' | 'error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private auth: AuthService,
    private toast: ToastrService
  ) {
    this.formLogin = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  @Input() isValid: boolean = true;
  @Input() userIsValid: boolean = true;
  @Input() passIsValid: boolean = true;
  wrongPass = false;

  configToast: Object = {
    timeOut: 2000,
    progressBar: true,
    progressAnimation: 'decreasing',
  };

  register() {
    this.router.navigate(['register']);
  }

  submit() {
    // console.log(this.formLogin.value);
    this.formLogin.controls['user'].valid
      ? (this.userIsValid = true)
      : (this.userIsValid = false);
    this.formLogin.controls['password'].valid
      ? (this.passIsValid = true)
      : (this.passIsValid = false);
    // this.formLogin.valid ? (this.isValid = true) : (this.isValid = false);

    if (this.userIsValid && this.passIsValid) {
      let Overlay = this.spinner.getSpinnerOverlayRef();

      //requisição endpoint login
      this.auth
        .login(
          this.formLogin.controls['user'].value,
          this.formLogin.controls['password'].value
        )
        .subscribe((res) => {
          this.toast[res.status as statusTypes](res.response, '', {
            timeOut: 2000,
            onActivateTick: false,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
          Overlay.dispose();
          res.status == 'success' ? this.router.navigate(['home']) : false;
        });
    }
  }

  forgot() {
    this.router.navigate(['forgot-password']);
  }
}
