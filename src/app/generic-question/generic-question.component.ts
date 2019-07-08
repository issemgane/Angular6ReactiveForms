import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { FormGroup , FormControl ,FormBuilder ,Validators, AbstractControl, FormArray } from '@angular/forms';
import { GenericQuestionService } from '../generic-question.service';

@Component({
  selector: 'app-generic-question',
  templateUrl: './generic-question.component.html',
  styleUrls: ['./generic-question.component.css']
})
export class GenericQuestionComponent implements OnInit {

  constructor(private genericQuestionService:GenericQuestionService,private fb :FormBuilder) { }
  genericQuestionsForm : FormGroup;
  dataQuestions:any;
  activeQuestions:any;
  @Input() questionsId: any[];
  fields = [];
  questionFields = [];

 //@Output() private onFormGroupChange = new EventEmitter<any>();
  @Input() formParent;

 //form:any;

 formErrors = {

};

// This object contains all the validation messages for this form
validationMessages = {
  'response_1': {
    'required': 'Full Name is required.',
    'minlength': 'Full Name must be greater than 2 characters',
    'maxlength': 'Full Name must be less than 10 characters.',
  },
  'response_2': {
    'required': 'Email is required.',
    'emailDomain': 'Email domian should be dell.com'
  },
  'response_3': {
    'required': 'Confirm Email is required.'
  },
  'response_4': {
    'emailMismatch': 'Email and Confirm Email do not match.'
  }
};


  ngOnInit() {
   
   this.questionsId.forEach(element=>{
    this.fields.push("response_"+element);
  });


  this.loadQuestionConfig();

  this.genericQuestionsForm = this.createForm(this.fields);
  this.formParent.addControl('genericQuestions', this.genericQuestionsForm);
 
  //this.onFormGroupChange.emit(this.genericQuestionsForm);

  }

  createForm(fields: string[]) {
    let group: any = {};
    fields.forEach(x => {
      group[x] = new FormControl();
    })
    return new FormGroup(group);
  }

  createFormObj(fields: any[]) {
    let group: any = {};
    fields.forEach(x => {
      group[x.field] = new FormControl(x.value,x.validators?x.validators:[]);
    })
    return new FormGroup(group);
  }

  loadQuestionConfig(){

    this.genericQuestionService.getGenericQuestions().subscribe(response=>{

       this.dataQuestions=response;
       this.activeQuestions = this.dataQuestions.filter(x => this.questionsId.includes(x.id));

       /*console.log('this.questionFields : ' +this.questionFields);
       console.log(this.activeQuestions);*/
    });

  }

  showForm(){
    console.log(this.genericQuestionsForm.value);
    //console.log('my Form is : '+this.genericQuestionsForm.get('response_1').value);
    //console.log('my Form is : '+this.genericQuestionsForm.get('response_2').value);
    //console.log('my Form is : '+this.genericQuestionsForm.get('response_3').value);
  }

  logValidationErrors(group: FormGroup = this.genericQuestionsForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }

      }

    });
  }


}
