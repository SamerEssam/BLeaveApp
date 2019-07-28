import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/Globals'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    // this.userService.currentInfo().subscribe(info => this.userName = info.name);
    // console.log("****")
    // console.log(this.userName)
    // this.imagePath = this.userService.userInfo.imagePath;
  }

  imagePath: string;
  userName: string = "";


}
