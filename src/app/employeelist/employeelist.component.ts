import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  employees: any;
  errorMsg: any;
  
  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(
      (data) => this.employees = data,
      (error) => this.errorMsg = error
    )
  }

  selectemployee(employee: any){
    console.log(employee)
    this.router.navigate(['/employeelist/', employee._id]);
  }

  editEmployee(employee: any){
    this.router.navigate(['/editemployee', employee._id]);
  }

  deleteEmployee(employee: any){
    this.empService.deleteEmployee(employee._id).subscribe(() => {
      this.empService.getEmployees().subscribe(
        (data) => this.employees = data,
        (error) => this.errorMsg = error
      )
    })
  }

}
