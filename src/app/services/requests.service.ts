import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestViewModel } from '../models/RequestViewModel';
import { environment as prodEnviroment } from 'src/environments/environment.prod';

@Injectable()
export class RequestsService {

  constructor(private requestServie: HttpClient) { }

  uri = prodEnviroment.baseUrl;


  getUserRequests() {
    return this.requestServie.get(this.uri + "api/Requests/UserRequests")
  }

  getMgrRequests() {
    return this.requestServie.get(this.uri + "api/Requests/MgrRequests")
  }

  acceptRequest(id: number) {

    const body = new URLSearchParams();
    return this.requestServie.post(this.uri + "api/Requests/acceptRequest/ " + id, body.toString())
  }

  rejectRequest(id: number) {
    return this.requestServie.post(this.uri + "api/Requests/rejectRequest" + id, {})
  }

  postRequest(Req: RequestViewModel) {
    return this.requestServie.post(this.uri + "api/Requests", Req)
  }

}
