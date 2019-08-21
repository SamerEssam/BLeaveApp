import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import {LeaveBalanceComponent  } from './leave-balance/leave-balance.component';
import { BalancesService } from 'src/app/services/balances.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private requestsService: RequestsService,private balancesService: BalancesService) { }

  ngOnInit() {
    // this.requestsService.getUserRequests().subscribe();
    // this.balancesService.userBalances().subscribe();
  }

  @ViewChild(MyRequestsComponent, { static: false }) myRequestComponent: MyRequestsComponent;
  @ViewChild(LeaveBalanceComponent, { static: false }) leaveBalanceComponent: LeaveBalanceComponent;

  refreshList() {
    this.myRequestComponent.ngOnInit();
  }

  refreshBalance(){
    this.leaveBalanceComponent.ngOnInit();
  }


}
