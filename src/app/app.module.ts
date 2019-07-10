import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EmployeeService } from './employee/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { UploadFileComponent } from './upload-file/upload-file.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { GenericQuestionComponent } from './generic-question/generic-question.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeModule } from './employee/employee-feature.module';


@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    DynamicComponent,
    GenericQuestionComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
