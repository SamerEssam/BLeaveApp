import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import {environment} from 'src/environments/environment'
import { UserBalanceViewModel } from '../models/UserBalanceViewModel';


@Injectable()
export class BalancesService {

  constructor(private balanceHttpClient: HttpClient) { }

  uri = environment.baseUrl;


  userBalances() {
    return this.balanceHttpClient.get<UserBalanceViewModel[]>(this.uri + "api/Balances/UserBalances")
  }
}
