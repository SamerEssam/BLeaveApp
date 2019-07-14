import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable()
export class UserService {

  constructor(private userHttpClient: HttpClient) { }
  uri = environment.baseUrl

  getUserInfo() {
    return this.userHttpClient.get(this.uri + "api/Account/CurrentUserInfo")
  }


}
