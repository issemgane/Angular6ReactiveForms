import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,FormBuilder ,Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidator } from '../shared/custom.validators';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  employeeForm : FormGroup;
  fullNameLength = 0;

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters',
      'maxlength': 'Full Name must be less than 10 characters.',
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be dell.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  constructor(private fb :FormBuilder ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      contactPreference:['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidator.emailDomain('dell.com')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: CustomValidator.matchEmails }),
      phone:[''],
      skills:this.fb.array([
        this.addSkillFormGroup()
      ])
   });

   this.employeeForm.get('contactPreference').valueChanges.subscribe((data:string)=>{
    this.onContactChange(data);
});


   this.employeeForm.valueChanges.subscribe(data=>{
       this.logValidationErrors(this.employeeForm);
   });

   /*this.employeeForm.get('fullName').valueChanges.subscribe(
      (data:string)=>{
        this.fullNameLength = data.length;
        console.log(data);
        }
   );*/

    /*this.employeeForm = new FormGroup({
       fullName:new FormControl(),
       email:new FormControl(),
       skills:new FormGroup({
        skillName:new FormControl(),
        experienceInYears:new FormControl(),
        proficiency:new FormControl()
       })
    });*/
  }

  
  addSkillButtonClick(){
  (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  console.log(this.employeeForm.get('skills'));
  }

  onContactChange(selectedVal:string){

    const phoneControl = this.employeeForm.get('phone');

    if(selectedVal==='phone'){
      phoneControl.setValidators([Validators.required]);
    }else{
      phoneControl.clearValidators();
    }
    //apply changes
    phoneControl.updateValueAndValidity();

  }


  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
          }
        }
      }

    });
  }

  /*logValidationErrors(group:FormGroup = this.employeeForm):void{
    Object.keys(group.controls).forEach((key:string) => {
 
     const abstractControl= group.get(key);
 
     if(abstractControl instanceof FormGroup){
      this.logValidationErrors(abstractControl);
     }else{
       this.formErrors[key]='';
       if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
          const messages =  this.validationMessages[key];
         // console.log(messages);
          for(const errorKey in abstractControl.errors){
            if(errorKey){
              this.formErrors[key]+=messages[errorKey]+' ';
            }
          }

       }
     }
 
    });  
  }*/


  logKeyValuePair(group:FormGroup):void{
   // console.log(Object.keys(group.controls));
   Object.keys(group.controls).forEach((key:string) => {

    const abstractControl= group.get(key);

    if(abstractControl instanceof FormGroup){
     // this.logKeyValuePair(abstractControl);
     abstractControl.disable();
    }else{
      //console.log('Key : '+key+' , Value : '+abstractControl.value);
      //abstractControl.disable();
    }

   });   

  }

   onSubmit():void{
    console.log(this.employeeForm);
  }

addSkillFormGroup() : FormGroup{
 return  this.fb.group({
    skillName:['',Validators.required],
    experienceInYears:['',Validators.required],
    proficiency:['',Validators.required]
   })
}

  onLoadDataClick() :void{
    
    const formArray = new FormArray([
      new FormControl('Jhon',Validators.required),
      new FormGroup({
        country:new FormControl('',Validators.required)
      }),
      new FormArray([])
    ]);

    const formArray1 = this.fb.array([
      new FormControl('Jhon',Validators.required),
      new FormControl('IT',Validators.required),
      new FormControl('Male',Validators.required)
    ]);

    formArray1.push(new FormControl('Mark',Validators.required));


    console.log(formArray1.at(3));

    /*for (const control of formArray.controls) {
     if(control instanceof FormControl){
        console.log('control is FormControl');
     }
     if(control instanceof FormGroup){
      console.log('control is FormGroup');
     }

     if(control instanceof FormArray){
       console.log('control is FormArray');
      }
      
    }*/
   /* this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);*/


    //this.logKeyValuePair(this.employeeForm);
    //this.employeeForm.setValue({
    /*this.employeeForm.patchValue({
      fullName:'Ali ISSEMGANE',
      email:'ali@gmail.com',
      skills:{
        skillName:'JAVA EE',
        experienceInYears:5,
        proficiency:'advanced'
      }

    });*/
  }
 

}

