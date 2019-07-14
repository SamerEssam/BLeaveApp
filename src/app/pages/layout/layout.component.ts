import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserMainInfoViewModel } from 'src/app/models/UserMainInfoViewModel';
import { Globals } from 'src/app/Globals';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private userService: UserService, private globals: Globals) { }

  ngOnInit() {
    this.getCurrentUser();
    this.changedGlobalUser();
  }

  private userInfoModel: UserMainInfoViewModel;


  getCurrentUser() {
    return this.userService.getUserInfo().subscribe(
      (data: UserMainInfoViewModel) => {
        this.userInfoModel = data;
        // console.log(this.userInfoModel);
      }, (error: any) => console.log(error))
  }

  private changedGlobalUser() {
    this.globals.userInfo = this.userInfoModel;
  }


}
