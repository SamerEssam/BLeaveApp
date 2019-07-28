import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable, Subject } from 'rxjs';
import { UserMainInfoViewModel } from '../models/UserMainInfoViewModel';

@Injectable({ providedIn: 'root' })
export class UserService {

  uri = environment.baseUrl

  constructor(private userHttpClient: HttpClient) {

  }

  userInfo: Subject<UserMainInfoViewModel> = new Subject<UserMainInfoViewModel>();

  // setData(val: UserMainInfoViewModel) {
  //   this.userInfo.next(val);
  // }
  getUserInfo() {
    this.userHttpClient.get(this.uri + "api/Account/CurrentUserInfo")
      .subscribe((data: UserMainInfoViewModel) => {
        console.log("data");
        console.log(data);
        this.userInfo.next(data);
        console.log(this.userInfo);
      }, (error: any) => console.error(error));
  }

  currentInfo() {
    return this.userInfo.asObservable();
  }

}
