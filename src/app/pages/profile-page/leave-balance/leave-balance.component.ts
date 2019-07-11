import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BalancesService } from '../../../services/balances.service';
import { UserBalanceViewModel } from 'src/app/models/UserBalanceViewModel';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent implements OnInit {

  constructor(private balancesService: BalancesService) { }

  ngOnInit() {
    this.getUserBalaces();
  }

  userBalances: Array<UserBalanceViewModel>;


  getUserBalaces() {
    this.balancesService.userBalances().subscribe((data: Array<UserBalanceViewModel>) => {
      this.userBalances = data;
    },
      error => {
        console.log("Lave balance component Error ====>" + error);
      });
  }
}





