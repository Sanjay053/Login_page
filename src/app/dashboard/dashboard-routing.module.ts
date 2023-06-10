import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboardcomponent } from './dashboard.component';
import { AuthGuardGuard } from '../authguard/auth-guard.guard';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: '',
    component: Dashboardcomponent,
    canActivate: [AuthGuardGuard] // Add the canActivate guard here
  },
  {
    path: 'student-list',
    component: StudentListComponent
  }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
