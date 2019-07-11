import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as prodEnviroment } from 'src/environments/environment.prod';

@Injectable()
export class UserService {

  constructor(private userHttpClient: HttpClient) { }
  uri = prodEnviroment.baseUrl


}
