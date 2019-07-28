import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { BalancesService } from '../../../services/balances.service';
import { UserBalanceViewModel } from 'src/app/models/UserBalanceViewModel';
import { ReqformDialogComponent } from 'src/app/components/reqform-dialog/reqform-dialog.component';
import { MatDialog, MatDialogConfig, MatDatepickerInput } from '@angular/material';
import { RequestsService } from 'src/app/services/requests.service';
import { RequestViewModel } from 'src/app/models/RequestViewModel';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.css']
})
export class LeaveBalanceComponent implements OnInit {

  constructor(private balancesService: BalancesService,
    private dialog: MatDialog, private requestService: RequestsService) { }

  ngOnInit() {
    this.getUserBalaces();
  }

  userBalances: Array<UserBalanceViewModel>;
  @Output() addReq = new EventEmitter()

  openDialog() {
    let config = new MatDialogConfig();
    config.width = '500px';
    config.disableClose = true;

    let dialogRef = this.dialog.open(ReqformDialogComponent, config);

    dialogRef.backdropClick().subscribe(_ => {
      // Close the dialog
      dialogRef.close("");
    })

    dialogRef.afterClosed().subscribe((req: RequestViewModel) => {
      // alert(JSON.stringify(request));

      if (req != null && req.selectedLType != null && req.from != null && req.to != null) {
        console.log(req)
        console.log("********************************************************")
        return this.requestService.postRequest(req)
          .subscribe(
            (data: any) => {
              this.addReq.emit("");
              console.log("Success post request");
            },
            (error: any) => alert("Your request faced a problem: \n" + JSON.stringify(error.error.message))
          )
      }

    }, (error: any) => console.error("Posting error ==>" + error));
  }

  getUserBalaces() {
    this.balancesService.userBalances().subscribe((data: Array<UserBalanceViewModel>) => {
      this.userBalances = data;
    },
      error => {
        console.log("Lave balance component Error ====>" + error);
      });
  }

}





