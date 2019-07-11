import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests.service';
import { EmpRequestsViewModel } from 'src/app/models/EmpRequestsViewModel';


@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    this.getMyRequestsFromService();
  }


  myReqList : Array<EmpRequestsViewModel>;


  getMyRequestsFromService() {
    // console.log('getRequestsFromService');
    this.requestsService.getUserRequests()
      .subscribe((data: any) => {
        console.log("Request List ", data);
        this.myReqList = data;
      },
        error => {
          console.log(error);
        });
  }
}
