import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

import { RequestsService } from 'src/app/services/requests.service';
import { EmpRequestsViewModel } from 'src/app/models/EmpRequestsViewModel';
import { ReqStateEnum, LTypeEnum } from 'src/app/models/Enums';
import { RequestViewModel } from 'src/app/models/RequestViewModel';
import { ReqformDialogComponent } from 'src/app/components/reqform-dialog/reqform-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  empRequests: any;
  interval: any;
  // myReqList: Array<EmpRequestsViewModel>;
  // dataSource: MatTableDataSource<Observable<EmpRequestsViewModel[]>>;
  public dataSource: MatTableDataSource<EmpRequestsViewModel>;
  displayedColumns: string[] = ['leaveType', 'from', 'to', 'reqState', 'action'];

  @Output() deleteApproved = new EventEmitter();
  empRequests$: Observable<EmpRequestsViewModel[]>;

  constructor(
    private requestsService: RequestsService,
    private dialog: MatDialog) {
    this.empRequests$ = this.requestsService.getUserRequests();
  }

  ngOnInit() {

    this.interval = setInterval(() => {
      // this.requestsService.getUserRequests().subscribe();
      this.getMyRequests();
      // this.getMyRequests()
    }, 700);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMyRequests() {
    this.empRequests$.subscribe(
      (data: EmpRequestsViewModel[]) => {
        //ToDo
        // if (this.empRequests != data) {
        //   this.empRequests = data;
        //   console.log(this.empRequests == data)
        //   console.log("empRequests")
        //   console.log(this.empRequests)
        //   console.log("data")
        //   console.log(data)
        // }

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // rename the event...
        this.deleteApproved.emit("");
        // this.ngOnInit();
        console.log("data change refresh")
      }, error => console.error(error)
    );
  }

  editRequest(editableRVM: EmpRequestsViewModel) {
    let config = new MatDialogConfig();
    config.width = '500px';
    config.disableClose = true;

    const rVM = new RequestViewModel();
    rVM.from = editableRVM.from;
    rVM.to = editableRVM.to;
    rVM.selectedLType = LTypeEnum[editableRVM.leaveType];
    config.data = rVM;

    let dialogRef = this.dialog.open(ReqformDialogComponent, config);

    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close("");
    })

    dialogRef.afterClosed().subscribe(
      (req: RequestViewModel) => {
        if (req != null && req.selectedLType != null && req.from != null && req.to != null) {
          return this.requestsService.editRequest(editableRVM.reqId, req).subscribe(
            (data: any) => {
              console.log("Success edit request");
              // rename the event...
              this.deleteApproved.emit("");
              this.ngOnInit();
            },
            (error: any) => {
              alert("Your request edditing faced a problem: \n" + JSON.stringify(error.error.message))
            })
        }
      }, (error: any) => console.error("Editting error ==>" + error));
  }

  canEdit(canEditRVM: EmpRequestsViewModel) {
    if (canEditRVM.reqState == ReqStateEnum[203])
      return true
    return false
  }

  removeReq(reqid: number) {

    const config = new MatDialogConfig();
    config.width = '350px';
    config.data = "Do you confirm the deletion of this request?";

    const confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, config);

    confirmDialogRef.backdropClick().subscribe(_ => {
      confirmDialogRef.close("");
    })

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        return this.requestsService.deleteRequest(reqid).subscribe(
          (data: any) => {
            this.deleteApproved.emit("");
            this.ngOnInit();
          },
          (error: any) => console.log(error));
      }
    })
  }

  canRemove(canRemoveRVM: EmpRequestsViewModel) {
    if (canRemoveRVM.reqState == ReqStateEnum[202] || (canRemoveRVM.reqState == ReqStateEnum[201] && canRemoveRVM.from <= new Date())) {
      return false;
    }
    return true
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
      'width': '75%',
      'margin': 'auto'
    };
    return styles;
  }
}
