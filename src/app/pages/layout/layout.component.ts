import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserMainInfoViewModel } from 'src/app/models/UserMainInfoViewModel';
import { Globals } from 'src/app/Globals';
import { MatSpinner } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private userService: UserService, private globals: Globals) {
    this.userService.getUserInfo().subscribe()
   }

  ngOnInit() {
  }

}
