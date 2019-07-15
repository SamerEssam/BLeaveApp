import { Component, OnInit, Inject } from '@angular/core';
import { RequestViewModel } from 'src/app/models/RequestViewModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LTypeEnum } from 'src/app/models/Enums';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { timeout } from 'q';

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


  createFormGroup() {
    this.newReqForm = this.formBuilder.group({
      from: new FormControl("", { validators: Validators.required, updateOn: 'blur' }),
      to: new FormControl("", { validators: Validators.required }),
      selectedLType: new FormControl("", { validators: Validators.required })
    })
  }

  onSubmitClick() {
    let req = this.newReqForm.value;
    if (req.selectedLType != null && req.from != null && req.to != null) {
      console.log("date :" + Date() + "; and req.from:" + req.from);
      if (req.selectedLType != LTypeEnum.Sick && new Date(req.from.date).getDate() < new Date().getDate()) {
        return alert("Are you submitting a sick leave request \n Starting date is earlier than today")
      }
      if (req.from > req.to)
        return alert("Starting date can't be earlier than end date");


      this.dialogRef.close(req);
    }
  }

}