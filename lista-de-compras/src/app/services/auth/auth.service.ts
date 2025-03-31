import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, EnvironmentProviders, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Register } from '../../interfaces/register';

@Injectable({
  providedIn: 'root'

})
export class AuthService {

  // apiUrl: string = "http://localhost:8080/";
  // apiUrl: string = "http://192.168.100.16:8080/";
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  login(user: string, pass: string){
    let path = 'auth/login';
      return this.http.post<any>(this.apiUrl+path, {username:user, password: pass});
  }

  register(register: Register){
    let path = 'auth/register';
      return this.http.post<any>(this.apiUrl+path, register);
  }

  forgotPassword(user: string, email: string){
    if(email == "s@s.com" && user == 'savio'){
      return true;
    } else {
      return false;
    }
  }
}
