import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { RequestViewModel } from 'src/app/models/RequestViewModel';
import { LTypeEnum } from 'src/app/models/Enums';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-req',
  templateUrl: './post-req.component.html',
  styleUrls: ['./post-req.component.css']
})
export class PostReqComponent implements OnInit {

  constructor(private requestService: RequestsService, private router: Router, private formBuilder: FormBuilder) {
    this.keys = Object.keys(this.LTypes).filter(Number);
    this.createFormGroup();
  }

  ngOnInit() {
  }

  newReqForm: FormGroup;
  keys: any;
  private LTypes = LTypeEnum;

  createFormGroup() {
    this.newReqForm = this.formBuilder.group({
      from: ["", Validators.required],
      to: ["", Validators.required],
      selectedLType: ["", Validators.required]
    })
  }

  postRequest(req: RequestViewModel) {
    if (req.selectedLType && req.from && req.to) {
      return this.requestService.postRequest(req)
        .subscribe(
          (data: any) => {
            console.log("Success post request " + data);
            this.router.navigate(['/profile']);
          },
          (error: any) => alert(JSON.stringify(error.error.message))
        )
    } else { alert("Kindly fill all fields") }
  }


  // get selectedLType() { return this.newReqForm.get('selectedLType'); }
}



