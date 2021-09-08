import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addemployee', component: AddemployeeComponent },
  { path: 'employeelist', component: EmployeelistComponent },
  { path: 'employeelist/:id', component: EmployeedetailsComponent },
  { path: 'editemployee/:id', component: EditemployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,
                                  AddemployeeComponent,
                                  EmployeelistComponent,
                                  EmployeedetailsComponent,
                                  EditemployeeComponent
]
