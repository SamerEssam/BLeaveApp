import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { MgrEmpRequestsViewModel } from 'src/app/models/MgrEmpRequestsViewModel';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsPageComponent implements OnInit {

  constructor(private requestService: RequestsService) { }

  ngOnInit() {
    this.retriveRequests();
  }

  reqList: Array<MgrEmpRequestsViewModel>;

  retriveRequests() {
    this.requestService.getMgrRequests()
      .subscribe((data: any) => {
        console.log(data)
        console.log("Mgr ReqList" + JSON.stringify(data));
        this.reqList = data;
      },
        (error: any) => console.log(error))
  }

  acceptRequest(id: number) {
    this.requestService.acceptRequest(id).subscribe(
      (data: any) => { console.log(data); this.ngOnInit(); },
      (error: any) => { console.log("accept request error" + error) }
    )
  }

  rejectRequest(id: number) {
    return this.requestService.rejectRequest(id).subscribe(
      (data: any) => { console.log(data); this.ngOnInit(); },
      (error: any) => { console.log("reject request error" + error) }
    )
  }
}
