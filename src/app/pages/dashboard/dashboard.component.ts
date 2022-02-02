import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo:any = localStorage.getItem('user');

  constructor() { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(this.userInfo);
  }

}
