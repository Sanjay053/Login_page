import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'reg_no',
    'age',
    'dob',
    'gender',
    'username',
    'email',
    'phonenumber'
  ];
  dataSource: any[] = [];

  constructor(private authService: AuthService) { }

  data(): void {
    this.authService.studentlist().subscribe(
      (response: any) => {
        console.log(response);
        this.dataSource = response.body; // Update this to assign the student data to dataSource
      },
      (error: any) => {
        console.log(error.error.details);
      }
    );
  }
}
