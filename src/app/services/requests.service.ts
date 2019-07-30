import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestViewModel } from '../models/RequestViewModel';
import { environment } from 'src/environments/environment'
import { EmpRequestsViewModel } from '../models/EmpRequestsViewModel';
import { MgrEmpRequestsViewModel } from '../models/MgrEmpRequestsViewModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class RequestsService {

  constructor(private requestServie: HttpClient) { }

  uri = environment.baseUrl + "api/Requests/";

  empRequestlist: BehaviorSubject<EmpRequestsViewModel[]> = new BehaviorSubject<EmpRequestsViewModel[]>(null);
  // mgrRequestlist: BehaviorSubject<MgrEmpRequestsViewModel[]>;

  get empReqlstValue() {
    return this.empRequestlist.value
  }

  getUserRequests() {
    return this.requestServie.get<EmpRequestsViewModel[]>(this.uri + "UserRequests")
      .pipe(tap((data) => {
        if (this.empRequestlist.value != data || this.empRequestlist.value == null) {
          this.empRequestlist.next(data);
        }
      }));
  }


  getMgrRequests() {
    return this.requestServie.get<MgrEmpRequestsViewModel[]>(this.uri + "MgrRequests");
  }

  acceptRequest(id: number) {
    const body = new URLSearchParams();
    return this.requestServie.get(this.uri + "acceptRequest/ " + id);
  }

  rejectRequest(id: number) {
    return this.requestServie.get(this.uri + "rejectRequest/" + id);
  }

  postRequest(req: RequestViewModel) {
    return this.requestServie.post(this.uri, req);
  }

  deleteRequest(id: number) {
    // console.log(this.uri + "deleteRequest/" + id)
    return this.requestServie.get(this.uri + "deleteRequest/" + id);
  }

  editRequest(id: number, req: RequestViewModel) {
    // console.log(this.uri + "deleteRequest/" + id)
    return this.requestServie.post(this.uri + "alterRequest/" + id, req);
  }

}
