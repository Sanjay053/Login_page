import { DashboardModule } from './dashboard.module';
import { Component, OnInit } from '@angular/core';
import { AuthService }from '../service/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class Dashboardcomponent implements OnInit {
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
  }
}
