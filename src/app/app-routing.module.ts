import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { GenericQuestionComponent } from './generic-question/generic-question.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';


export const appRoutes : Routes = [
  { path: 'home', component: HomeComponent },
   { path: 'file', component: UploadFileComponent},
   { path: 'table', component: DynamicComponent},
   { path: 'generic', component: GenericQuestionComponent},
   { path: '', redirectTo: '/home',pathMatch: 'full'},
   { path: 'employees', loadChildren: './employee/employee-feature.module#EmployeeModule'},
   { path: '**', component: PageNotFoundComponent }
 ];
 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
