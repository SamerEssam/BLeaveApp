import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment as prodEnviroment } from 'src/environments/environment.prod';

@Injectable()
export class BalancesService {

  constructor(private balanceHttpClient: HttpClient) { }

  uri = prodEnviroment.baseUrl;


  userBalances() {
    return this.balanceHttpClient.get(this.uri + "api/Balances/UserBalances")
  }
}
