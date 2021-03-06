import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  employeeId : any;
  employee: any;
  employees: any
  errorMsg: any;
  //editemployeeForm;

  constructor(private actRoute: ActivatedRoute, private empService: EmployeeService, private fb: FormBuilder, private router: Router) { }

  public editemployeeForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    salary: [0, [Validators.required, Validators.pattern('^[0-9]+$')]]
  });

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.employeeId = id;
      console.log(this.employeeId);
      this.employee = this.empService.getEmployeesById(this.employeeId).subscribe(
        (data) => {this.employee = data; console.log(data);
          this.editemployeeForm = this.fb.group({
            firstName: [this.employee.firstName, [Validators.required, Validators.minLength(3)]],
            lastName: [this.employee.lastName, [Validators.required, Validators.minLength(3)]],
            salary: [this.employee.salary, [Validators.required, Validators.pattern('^[0-9]+$')]]
          });
        },
        (error) => {this.errorMsg = error; console.log(error); }
      );
    });
  }

  
  get firstName(){
    return this.editemployeeForm.get('firstName');
  }

  get lastName(){
    return this.editemployeeForm.get('lastName');
  }

  get salary(){
    return this.editemployeeForm.get('salary');
  }
  update(employeeId: any, editemployeeForm: any){
    console.log(this.employeeId);
    console.log(this.editemployeeForm);
    this.empService.updateEmployee(this.employeeId, this.editemployeeForm.value).subscribe(
      (data) => {this.employee = data; console.log(data);
        this.empService.getEmployees().subscribe(
          (data) => this.employees = data,
          (error) => this.errorMsg = error
        )
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/employeelist']);
  }

}
