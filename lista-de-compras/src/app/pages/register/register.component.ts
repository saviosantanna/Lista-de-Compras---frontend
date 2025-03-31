import { Component, OnInit } from '@angular/core';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { Register } from '../../interfaces/register';

type statusTypes = 'success' | 'error';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private auth: AuthService
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
  passwordIsEquals: boolean = true;
  passwordIsValid: boolean = true;
  formIsValid: boolean = false;
  limpa: boolean = false;
  registerUser!: Register;

  ngOnInit(){
    if(localStorage.getItem("token")){
      this.router.navigate(["home"]);
    }
  }

  clearForm(){
    this.formRegister.reset();
    console.log("Form has been reseted.")
  }

  register(){
    // console.log("Form is valid? " + this.formRegister.valid)
    this.formRegister.controls["user"].valid ? this.userIsValid = true :this.userIsValid =  false;
    this.formRegister.controls["name"].valid ? this.nameIsValid = true : this.nameIsValid = false;
    this.formRegister.controls["email"].valid ? this.emailIsValid = true : this.emailIsValid = false;
    this.formRegister.controls["password"].value === this.formRegister.controls["passwordConfirm"].value ? this.passwordIsEquals = true : this.passwordIsEquals = false;
    this.formRegister.controls["password"].valid && this.formRegister.controls["passwordConfirm"].valid ? this.passwordIsValid = true : this.passwordIsValid = false;


    // let OverlayRef = this.spinner.getSpinnerOverlayRef();

    if (this.userIsValid && this.nameIsValid && this.emailIsValid && this.passwordIsValid && this.passwordIsEquals){
      let OverlayRef = this.spinner.getSpinnerOverlayRef();
      this.registerUser = {
        username: this.formRegister.controls["user"].value,
        name: this.formRegister.controls["name"].value,
        email: this.formRegister.controls["email"].value,
        password: this.formRegister.controls["password"].value
      }
      this.auth.register(this.registerUser).subscribe(
        {
        next: res => {
          // console.log(res);
          this.toast[res.status as statusTypes](res.response);
          // this.toast.success();
        OverlayRef.dispose();
        this.voltar();
        },
        error: err => {
          console.error(err);
          OverlayRef.dispose();
        }
      });



      // this.toast.success("Cadastro realizado com sucesso!", '',{timeOut: 2000, progressAnimation: 'decreasing'})

    //   setTimeout(() => {
    //   OverlayRef.dispose();
    //   this.formIsValid = true;
    //   this.clearForm();
    // }, 2000,
    // this.toast.success("Cadastro realizado com sucesso!", '',{timeOut: 2000, progressBar: true , progressAnimation: "decreasing"}))
    }
  }

  voltar(){
    this.router.navigate(["login"]);
  }
}
