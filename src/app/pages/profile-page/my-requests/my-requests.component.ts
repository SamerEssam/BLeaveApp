import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests.service';
import { EmpRequestsViewModel } from 'src/app/models/EmpRequestsViewModel';
import { ReqStateEnum } from 'src/app/models/Enums';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    this.getMyRequests();
  }

  myReqList: Array<EmpRequestsViewModel>;

  getMyRequests() {
    // console.log('getRequestsFromService');
    this.requestsService.getUserRequests()
      .subscribe((data: any) => {
        // console.log("Request List ", data);
        this.myReqList = data;
      },
        error => {
          console.log(error);
        });
  }

  // aiKalam() {
  //   let dialogRef = dialog.open(UserProfileComponent, {
  //     height: '400px',
  //     width: '600px',
  //   });
  // }

  removeReq(reqid: number) {
    console.log(reqid);
    return this.requestsService.deleteRequest(reqid).subscribe(
      (data: any) => this.ngOnInit(),
      (error: any) => console.log(error));
  }

  canRemove(reqState: string) {
    if (reqState == ReqStateEnum[202]) {
      return true;
    }
    return false
  }

  color(empRequestsViewModel: EmpRequestsViewModel) {
    if (empRequestsViewModel.reqState == ReqStateEnum[203]) {
      return false;
    }
    if (empRequestsViewModel.reqState == ReqStateEnum[201]) {
      return "green";
    }
    return "red";
  }

  getstyle(empRequestsViewModel: EmpRequestsViewModel) {
    let bckColor = this.color(empRequestsViewModel)
    let styles = {
      'border': '2px solid' + bckColor ? bckColor : "yellow",
      'background-color': bckColor ? bckColor : "yellow",
      'color': bckColor ? "azure" : "black",
      'border-radius': '8px',
    };
    return styles;
  }
}
