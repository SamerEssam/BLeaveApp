import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout(){
    alert("Thanks");
   return localStorage.removeItem("user");
    // return this.router.navigate(["/login"])
  }
}
