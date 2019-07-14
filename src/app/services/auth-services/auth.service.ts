import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginViewModel } from 'src/app/models/UserLoginViewModel';

@Injectable()
export class AuthService {

  constructor(private UserHttp: HttpClient) { }
  uri = environment.baseUrl;

  isLogged() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.access_token : '';
    if (user && token) {
      return true;
    }
    return false;
  }

  login(user: UserLoginViewModel) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('No-Auth', 'True');

    const body = new URLSearchParams();
    body.set('username', user.email);
    body.set('password', user.password);
    body.set('grant_type', 'password');

    return this.UserHttp.post(this.uri + 'token', body.toString(), { headers: headers })
  }

  // register(user: UserLoginViewModel) {
  //   let body = {
  //     email: user.email,
  //     password: user.password,
  //     confirmPassword: user.confirmPassword
  //   };
  //   console.log(body);
  //   let headers = new HttpHeaders({ "Content-Type": "application/json" })
  //   return this.UserHttp.post(this.uri + "api/Account/Register", body, { headers: headers })
  // }


}
