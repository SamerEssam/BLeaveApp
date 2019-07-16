import { Component, OnInit, Inject } from '@angular/core';
import { RequestViewModel } from 'src/app/models/RequestViewModel';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { LTypeEnum } from 'src/app/models/Enums';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-reqform-dialog',
  templateUrl: './reqform-dialog.component.html',
  styleUrls: ['./reqform-dialog.component.css']
})
export class ReqformDialogComponent implements OnInit {

  ngOnInit() {
    this.keys = Object.keys(this.LTypes).filter(Number);
    this.createFormGroup();
  }

  constructor
    (public dialogRef: MatDialogRef<ReqformDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: RequestViewModel,
      private formBuilder: FormBuilder) { }

  newReqForm: FormGroup;
  keys: any;
  private LTypes = LTypeEnum;

  maxDate = this.calcMaxDate();



  calcMaxDate() {
    if (new Date().getMonth() <= 7)
      return new Date(new Date().getFullYear() + 1, 6);
    return new Date(new Date().getFullYear(), 6);
  };


  createFormGroup() {
    this.newReqForm = this.formBuilder.group({
      from: new FormControl("", { validators: Validators.required }),
      to: new FormControl("", { validators: Validators.required }),
      selectedLType: new FormControl("", { validators: Validators.required })

    })
  };

  get from() { return this.newReqForm.get('from'); };
  get to() { return this.newReqForm.get('to'); };
  get selectedLType() { return this.newReqForm.get('selectedLType'); };

  // startdatechk() {
  //   let start = this.newReqForm.get('from');
  //   if (start.value != LTypeEnum.Sick && new Date(start.value).getDate() < new Date().getDate()) {
  //     return false
  //   }
  //   return true
  // }

  onSubmitClick() {
    let req = this.newReqForm.value;
    if (req.selectedLType != null && req.from != null && req.to != null) {

      alert("date :" + Date() + "; \n and req.from:" + req.from);
      if (req.from > req.to) {
        alert("Starting date can't be earlier than end date");
        return;
      } else if (req.selectedLType != LTypeEnum.Sick && new Date(req.from).getDay < new Date().getDay) {
        alert("Are you submitting a sick leave request \n Starting date is earlier than today")
        return;
      } else {
        // req.from.setMinutes((req.from.getMinutes() - req.from.getTimezoneOffset()));
        // req.to.setMinutes((req.to.getMinutes() - req.to.getTimezoneOffset()));
        alert(req.from);
        this.dialogRef.close(req);
      }

    }
  }


}