import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLoginViewModel } from '../../../models/UserLoginViewModel';
import { AuthService } from 'src/app/services/auth-services/auth.service';

import { MatSpinner } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.createFormGroup();
  }

  ngOnInit() {
  }

  loginForm: FormGroup;
  showSpinner: boolean= false;
  createFormGroup() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSumbit(user: UserLoginViewModel) {
    this.showSpinner = true;
    // return this.authService.login(this.loginForm.value).subscribe((response: any) => {
    return this.authService.login(user).subscribe((response: any) => {
      // console.log(response)
      const data = response;
      // console.log(data)
      window.localStorage.setItem('user', JSON.stringify(data));

      this.showSpinner = false;
      // console.log(JSON.stringify(data))
      this.router.navigate(['/profile']);
    }, (error: any) => console.log(error))
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
