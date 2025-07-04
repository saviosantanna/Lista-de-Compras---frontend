import { Router } from '@angular/router';
import { TokenService } from './../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private TokenService: TokenService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Iniciou a homepage.');
    if (!localStorage.getItem('token')) {
      console.log('Token não encontrado. Redirecionando para o login.');
      this.router.navigate(['login']);
    } else {
      this.TokenService.validateToken().subscribe((res) => {
        if (!res) {
          localStorage.clear();
          console.log(
            'Sessão de usuário expiradar. Fazer fazer login novamente.'
          );
          this.toast.info('Sua sessão expirou');
          this.router.navigate(['login']);
        } else {
          console.log('Token está válido.');
        }
      });
    }
  }

  sair(){
    localStorage.clear();
    this.router.navigate(['login']);
    this.toast.info('Você saiu do sistema.');
  }
}
