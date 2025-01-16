import { Component } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formRegister!: FormGroup;

  constructor(
    private router: Router,
    private spinner: SpinnerService
  ) {
    this.formRegister = new FormGroup ({
      user: new FormControl ('', [Validators.minLength(4), Validators.required]),
      name: new FormControl ('', [Validators.minLength(4), Validators.required,]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.minLength(6), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)]),
      passwordConfirm: new FormControl ('', [Validators.minLength(6), Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)]),
    });
  }

  userIsValid: boolean = true;
  nameIsValid: boolean = true;
  emailIsValid: boolean = true;
  passwordIsDifferent: boolean = true;
  passwordIsValid: boolean = true;
  formIsValid: boolean = false;



  register(){
    // console.log("Form is valid? " + this.formRegister.valid)
    this.formRegister.controls["user"].valid ? this.userIsValid = true :this.userIsValid =  false;
    this.formRegister.controls["name"].valid ? this.nameIsValid = true : this.nameIsValid = false;
    this.formRegister.controls["email"].valid ? this.emailIsValid = true : this.emailIsValid = false;
    this.formRegister.controls["password"].value === this.formRegister.controls["passwordConfirm"].value ? this.passwordIsDifferent = true : this.passwordIsDifferent = false;
    this.formRegister.controls["password"].valid && this.formRegister.controls["passwordConfirm"].valid ? this.passwordIsValid = true : this.passwordIsValid = false;


    let OverlayRef = this.spinner.getSpinnerOverlayRef();

    if (this.userIsValid && this.nameIsValid && this.emailIsValid && this.passwordIsValid && this.passwordIsDifferent){
      console.log(this.formRegister.valid)
      console.log("Form antes:")
      console.log(this.formRegister.value);
      this.formRegister.reset()
      console.log("Form depois");
      console.log(this.formRegister.value);
      this.formIsValid = true;





    }

    setTimeout(() => {OverlayRef.dispose()}, 1000)



  }

  voltar(){
    this.router.navigate(["login"]);
  }
}
