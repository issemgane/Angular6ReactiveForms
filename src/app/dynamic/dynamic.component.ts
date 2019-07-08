import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,FormBuilder ,Validators, AbstractControl, FormArray } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  employeeForm : FormGroup;
  types = ['USA', 'Canada', 'Uk'];
  devises = ['EUR', 'ZAR', 'MAD'];
  
  demande = {
    'id':132,
    'fullName':'ISSEMGANE',
    'reponses':''
    };

    formCheck :any  = '' 
    public onFormGroupChangeEvent(_event) {
      this.formCheck = _event;
      console.log('from from child :'  );
      console.log(_event, this.formCheck['controls']);
    }

  constructor(private fb :FormBuilder,private userService:UserService) { }

  ngOnInit() {

   this.employeeForm = this.fb.group({
    skills:this.fb.array([
      this.addSkillFormGroup()
    ])
 });
  }

  addSkillButtonClick(){
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
          //console.log(this.employeeForm.get('skills'));
    }

  addSkillFormGroup() : FormGroup{
    return  this.fb.group({
       type:['',Validators.required],
       skillName:['',Validators.required],
       experienceInYears:['',Validators.required],
       amount:['',Validators.required],
       devise:['',Validators.required]
       
      })
   }

   onSubmit():void{
   // console.log(this.employeeForm.get('skills').value);
    //console.log(JSON.stringify(this.employeeForm.get('skills').value));
     this.demande.reponses=this.employeeForm.get('skills').value;

     console.log('FORM VALUS IS : ');
     console.log(this.employeeForm.value);
    // console.log(this.demande);
    /* this.userService.sendData(this.demande).subscribe((response)=>{
      console.log(response); 
     });*/
    // console.log(JSON.stringify(this.demande));
  }

  removeSkills(skillIndex:number){
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillIndex);
  }

  public setParentControl(formGroup: FormGroup) {
    console.log('data from child is '+formGroup.value);
}
}
