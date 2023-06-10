import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { Dashboardcomponent } from './dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    NavbarComponent,
    Dashboardcomponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule
  ]
})
export class DashboardModule { }
