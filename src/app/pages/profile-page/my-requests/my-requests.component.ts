import { Component, OnInit, Output } from '@angular/core';
import { RequestsService } from '../../../services/requests.service';
import { EmpRequestsViewModel } from 'src/app/models/EmpRequestsViewModel';
import { ReqStateEnum, LTypeEnum } from 'src/app/models/Enums';
import { ReqformDialogComponent } from 'src/app/components/reqform-dialog/reqform-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestViewModel } from 'src/app/models/RequestViewModel';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  myReqList: Array<EmpRequestsViewModel>;
  dataSource: MatTableDataSource<EmpRequestsViewModel>;

  @Output() deleteApproved = new EventEmitter();

  constructor(
    private requestsService: RequestsService,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getMyRequests();
  }

  displayedColumns: string[] = ['leaveType', 'from', 'to', 'reqState', 'action'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMyRequests() {
    this.requestsService.getUserRequests()
      .subscribe((data: any) => {
        // this.myReqList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(data)
      },
        error => {
          console.error(error);
        });
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

    dialogRef.afterClosed().subscribe((req: RequestViewModel) => {
      if (req != null && req.selectedLType != null && req.from != null && req.to != null) {
        return this.requestsService.editRequest(editableRVM.reqId, req)
          .subscribe(
            (data: any) => {
              console.log("Success edit request");
              this.ngOnInit();
            },
            (error: any) => {
              alert("Your request edditing faced a problem: \n" + JSON.stringify(error.error.message))
            })

      }
    }, (error: any) => console.error("Editting error ==>" + error));
  }

  canEdit(canEditRVM: EmpRequestsViewModel) {
    if (canEditRVM.reqState == ReqStateEnum[201])
      return false
    return true
  }

  removeReq(reqid: number) {
    return this.requestsService.deleteRequest(reqid).subscribe(
      (data: any) => {
        this.deleteApproved.emit("");
        this.ngOnInit();
      },
      (error: any) => console.log(error));
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
      'display': 'block',
      'width': '75%',
      'transform': 'translate(0, 50%) '
    };
    return styles;
  }
}
