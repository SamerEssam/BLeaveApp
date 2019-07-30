import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserMainInfoViewModel } from '../models/UserMainInfoViewModel';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

  uri = environment.baseUrl
  userInfo = new BehaviorSubject<UserMainInfoViewModel>(null);

  constructor(private userHttpClient: HttpClient) {

  }

  get userInfoValue() {
    return this.userInfo.value
  }

  getUserInfo() {
    return this.userHttpClient.get<UserMainInfoViewModel>(this.uri + "api/Account/CurrentUserInfo")
    .pipe(tap(data=>this.userInfo.next(data)));
      // .subscribe((data: UserMainInfoViewModel) => {
      //   console.log("data");
      //   console.log(data);
      //   this.userInfo.next(data);
      //   console.log(this.userInfo);
      // }, (error: any) => console.error(error));
  }

  // currentInfo() {
  //   return this.userInfo.asObservable();
  // }

}
