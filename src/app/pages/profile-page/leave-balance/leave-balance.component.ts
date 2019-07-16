import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { BalancesService } from '../../../services/balances.service';
import { UserBalanceViewModel } from 'src/app/models/UserBalanceViewModel';
import { ReqformDialogComponent } from 'src/app/components/reqform-dialog/reqform-dialog.component';
import { MatDialog, MatDialogConfig, MatDatepickerInput } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';
import { RequestViewModel } from 'src/app/models/RequestViewModel';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent implements OnInit {

  constructor(private balancesService: BalancesService, private dialog: MatDialog, private requestService: RequestsService) { }

  ngOnInit() {
    this.getUserBalaces();
  }

  userBalances: Array<UserBalanceViewModel>;


  openDialog() {
    let config = new MatDialogConfig();
    config.width = '500px';
    let dialogRef = this.dialog.open(ReqformDialogComponent, config);
    dialogRef.disableClose = true;

    dialogRef.backdropClick().subscribe(_ => {
      // Close the dialog
      dialogRef.close("");
    })

    dialogRef.afterClosed().subscribe((req: RequestViewModel) => {
      // alert(JSON.stringify(request));

      if (req != null && req.selectedLType != null && req.from != null && req.to != null) {
        return this.requestService.postRequest(req)
          .subscribe(
            (data: any) => {
              console.log("Success post request");
            },
            (error: any) => alert("Your request faced a problem: \n" + JSON.stringify(error.error.message))
          )
      }

    }, (error: any) => console.error("Posting error ==>" + error));
  }

  // openDialog() {
  //   let config = new MatDialogConfig();
  //   config.width = '500px';
  //   let dialogRef = this.dialog.open(ReqformDialogComponent, config);
  //   dialogRef.disableClose = true;

  //   dialogRef.backdropClick().subscribe(_ => {
  //     // Close the dialog
  //     dialogRef.close("");
  //   })

  //   dialogRef.afterClosed().subscribe((req: RequestViewModel) => {
  //     // alert(JSON.stringify(request));

  //     if (req != null && req.selectedLType != null && req.from != null && req.to != null) {
  //       return this.requestService.postRequest(req)
  //         .subscribe(
  //           (data: any) => {
  //             console.log("Success post reques" + req.to);
  //           },
  //           (error: any) => alert("error after" + JSON.stringify(error.error.message))
  //         )
  //     }

  //   }, (error: any) => console.error(error));
  // }

  getUserBalaces() {
    this.balancesService.userBalances().subscribe((data: Array<UserBalanceViewModel>) => {
      this.userBalances = data;
    },
      error => {
        console.log("Lave balance component Error ====>" + error);
      });
  }






}





