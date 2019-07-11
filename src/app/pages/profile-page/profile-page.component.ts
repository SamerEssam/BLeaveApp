import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    // this.getMyRequestsFromService();
  }

  // private reqList = null;

  // getMyRequestsFromService() {
  //   console.log('getRequestsFromService');
  //   this.requestsService.getUserRequests()
  //     .subscribe((data: any) => {
  //       console.log("Request List ", data);
  //       this.reqList = data;
  //     },
  //       error => {
  //         console.log(error);
  //       });
  // }
}
