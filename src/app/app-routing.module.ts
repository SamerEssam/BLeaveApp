import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/landing/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RequestsPageComponent } from './pages/requests-page/requests.component';



// import { PostReqComponent } from './components/post-req/post-req.component';
import { MyRequestsComponent } from './pages/profile-page/my-requests/my-requests.component';
import { AuthGuard } from './services/auth-services/auth.guard';

const routes: Routes =
  [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
      path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
        {
          path: 'profile', component: ProfilePageComponent, children: [
            { path: '', component: MyRequestsComponent },
            // { path: 'newrequest', component: PostReqComponent }
          ]
        },
        { path: 'requests', component: RequestsPageComponent }
      ]
    },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
