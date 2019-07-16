import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenInterceptor } from './services/auth-services/token.interceptor';
import { AuthService } from './services/auth-services/auth.service';
import { UserService } from './services/user.service';
import { RequestsService } from './services/requests.service';
import { BalancesService } from './services/balances.service';

import { LayoutComponent } from './pages/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginComponent } from './pages/landing/login/login.component';
import { LeaveBalanceComponent } from './pages/profile-page/leave-balance/leave-balance.component';
import { MyRequestsComponent } from './pages/profile-page/my-requests/my-requests.component';
import { RequestsPageComponent } from './pages/requests-page/requests.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { LeftnavComponent } from './pages/layout/leftnav/leftnav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostReqComponent } from './components/post-req/post-req.component';
import { AuthGuard } from './services/auth-services/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Globals } from './Globals';
import { ReqformDialogComponent } from './components/reqform-dialog/reqform-dialog.component';

import { MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, } from '@angular/material'
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LeftnavComponent,
    ProfilePageComponent,
    LeaveBalanceComponent,
    MyRequestsComponent,
    RequestsPageComponent,
    PostReqComponent,
    ReqformDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatDialogModule, MatInputModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatMomentDateModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    UserService,
    RequestsService,
    BalancesService,
    AuthService,
    AuthGuard,
    Globals,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ReqformDialogComponent]
})
export class AppModule { }
