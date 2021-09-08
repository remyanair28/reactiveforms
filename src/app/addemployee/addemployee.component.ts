import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  public employeeForm: any;
  employees: any;
  errorMsg: any;

  constructor(private fb: FormBuilder, private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
     this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit(employeeForm: any){
    console.log(this.employeeForm.value);
    this.empService.postEmployee(this.employeeForm.value).subscribe(
      (data) => {
        this.employees = data; 
        console.log(this.employees);
        this.empService.getEmployees().subscribe(
          (data) => this.employees = data,
          (error) => this.errorMsg = error
        )
      },
      (error) => this.errorMsg = error
    )
    this.router.navigate(['/employeelist']);
    this.employeeForm.reset();
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }


}
