import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
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
    'phone_number'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Initialize with empty MatTableDataSource
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for MatPaginator
  totalItems = 0; // Total number of items
  pageSizeOptions: number[] = [2, 5, 7]; // Available page size options
  pageSize = 2; // Default page size
  pageIndex = 0; // Current page index
  studentData: any[] = []; // Declare the studentData variable
  searchText: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.authService.studentlist().subscribe(
      (response: any) => {
        console.log(response);
        this.studentData = response.body; // Assign the student data to studentData
        this.totalItems = this.studentData.length; // Set the total number of items
        this.updateDataSource();
      },
      (error: any) => {
        console.log(error.error.details);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Set the paginator for the MatTableDataSource
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDataSource();
  }

  updateDataSource(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.applySearchFilter(this.studentData).slice(startIndex, endIndex); // Update data in the dataSource with search filter applied
  }

  applySearchFilter(data: any[]): any[] {
    if (!this.searchText) {
      return data; // If no search text, return the original data
    }

    const filterValue = this.searchText.toLowerCase().trim(); // Convert search text to lowercase and trim whitespace

    return data.filter(
      (item: any) =>
        item.first_name.toLowerCase().includes(filterValue) ||
        item.last_name.toLowerCase().includes(filterValue) ||
        item.username.toLowerCase().includes(filterValue) ||
        item.gender.toLowerCase().includes(filterValue)
    );
  }
  
  applyFilter(): void {
    this.pageIndex = 0; // Reset page index to 0 when filter is applied
    this.updateDataSource();
  }
}
