import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,FormBuilder ,Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidator } from '../shared/custom.validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  employeeForm : FormGroup;
  fullNameLength = 0;

  userFile :any = File;
  constructor(private fb :FormBuilder,private userService:UserService) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      lastName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
   });
  }

  saveForm(submitedForm:FormGroup){
    if(submitedForm.valid){
      const user = submitedForm.value;
      const formData = new FormData();
      formData.append('user',JSON.stringify(user));
      formData.append('file', this.userFile);

    this.userService.saveUserProfile(formData).subscribe((response)=>{
     // console.log(JSON.stringify(response));
    });

      //console.log(user);
      console.log(formData);
      //console.log(JSON.stringify(formData.get('user')));

    }

  }
  onSelectFile(event){
    const file = event.target.files[0];
    this.userFile = file;
    //console.log(file);
 }

}
