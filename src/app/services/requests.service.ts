import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestViewModel } from '../models/RequestViewModel';
import { environment } from 'src/environments/environment'

@Injectable()
export class RequestsService {

  constructor(private requestServie: HttpClient) { }

  uri = environment.baseUrl + "api/Requests/";


  getUserRequests() {
    return this.requestServie.get(this.uri + "UserRequests");
  }

  getMgrRequests() {
    return this.requestServie.get(this.uri + "MgrRequests");
  }

  acceptRequest(id: number) {
    const body = new URLSearchParams();
    return this.requestServie.get(this.uri + "acceptRequest/ " + id);
  }

  rejectRequest(id: number) {
    return this.requestServie.get(this.uri + "rejectRequest/" + id);
  }

  postRequest(Req: RequestViewModel) {
    return this.requestServie.post(this.uri, Req);
  }

  deleteRequest(id: number) {
    // console.log(this.uri + "deleteRequest/" + id)
    return this.requestServie.get(this.uri + "deleteRequest/" + id);
  }
}
