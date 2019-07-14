import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { ListEmployeeComponent } from './list-employee.component';
import { CreateEmployeeComponent } from './create-employee.component';



export const appRoutes : Routes = [
  {
     path: 'employees', children:[
      { path: '', component: ListEmployeeComponent},
      { path: 'create', component: CreateEmployeeComponent },
      { path: 'edit/:id', component: CreateEmployeeComponent }
  ]  
},

 ];
 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
