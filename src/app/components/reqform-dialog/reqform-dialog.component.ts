import { Component, OnInit, Inject } from '@angular/core';
import { RequestViewModel } from 'src/app/models/RequestViewModel';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { LTypeEnum } from 'src/app/models/Enums';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as _moment from 'moment';

const moment = _moment;
@Component({
  selector: 'app-reqform-dialog',
  templateUrl: './reqform-dialog.component.html',
  styleUrls: ['./reqform-dialog.component.css']
})
export class ReqformDialogComponent implements OnInit {

  ReqForm: FormGroup;
  requestViewModal: RequestViewModel;

  keys: any;
  private LTypes = LTypeEnum;
  maxDate = this.calcMaxDate();
  minDate = this.calcMinDate();

  ngOnInit() {
    this.keys = Object.keys(this.LTypes).filter(Number);
    this.createFormGroup();
  }

  constructor
    (public dialogRef: MatDialogRef<ReqformDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: RequestViewModel, private formBuilder: FormBuilder) {

    this.requestViewModal = data ? data : new RequestViewModel();
  }

  calcMinDate() {
    return new Date(new Date().getFullYear(), 1);
  }
  calcMaxDate() {
    if (new Date().getMonth() <= 7)
      return new Date(new Date().getFullYear() + 1, 6);
    return new Date(new Date().getFullYear(), 6);
  };

  createFormGroup() {
    this.ReqForm = this.formBuilder.group({
      from: new FormControl(moment(this.requestViewModal.from), { validators: Validators.required }),
      to: new FormControl(moment(this.requestViewModal.to), { validators: Validators.required }),
      selectedLType: new FormControl(this.requestViewModal.selectedLType, { validators: Validators.required })

    })
  };

  get from() { return this.ReqForm.get('from'); };
  get to() { return this.ReqForm.get('to'); };
  get selectedLType() { return this.ReqForm.get('selectedLType'); };

  OnFromSelect(value) {
    if (this.ReqForm.get('to').untouched)
      this.ReqForm.get('to').setValue(value.value._d);
  }

  // startdatechk() {
  //   let start = this.newReqForm.get('from');
  //   if (start.value != LTypeEnum.Sick && new Date(start.value).getDate() < new Date().getDate()) {
  //     return false
  //   }
  //   return true
  // }

  onSubmitClick() {
    let req = this.ReqForm.value;

    if (req.selectedLType != null && req.from != null && req.to != null) {

      // alert("date :" + Date() + "; \n and req.from:" + req.from);
      if (req.from > req.to) {
        alert("Starting date can't be earlier than end date");
        return;
      } else if (req.selectedLType != LTypeEnum.Sick && new Date(req.from) < new Date()) {

        alert("Are you submitting a sick leave request \n Starting date is earlier than today")
        return;
      } else {
        this.dialogRef.close(req);
      }

    }
  }


}