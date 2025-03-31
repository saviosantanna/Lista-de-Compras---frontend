import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public validateToken(){
    let path = "auth/validate-token";
    return this.http.post<any>(this.apiUrl+path, localStorage.getItem("token"));
  }
}
