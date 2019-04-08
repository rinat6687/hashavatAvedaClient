import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Users } from '../../classes/users';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../../node_modules/@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() newUser: Users;
  class: string;
  aaa: boolean;
  @Input() passwordToChaeck: string;
  @ViewChild('myForm') formValues;

  // registerForm: FormGroup;
  @Input() showTitel: boolean = true;
  @Input() parentForm: FormGroup ;
   /*this.formControlGroup =*/ 
  @Input() submitted: boolean;
  // formControlGroup: FormGroup;
  @Output()
  sendP: EventEmitter<any> = new EventEmitter();

  // {123,true,"gggg","fff","345","ggg","hhh",55,"hhhh","5667","666",true};
  constructor(private userService: UserService,
    private active: ActivatedRoute,
    private formBuilder: FormBuilder) {
     
    this.aaa = this.active.snapshot.params["aaa"]
    if (this.aaa) {
      //בלי אבא
      let userCode=localStorage.getItem("userCode");
      var u= +userCode;
      this.userService.getUserForShowDetails(u).subscribe(x => {
      this.newUser = <Users>x;
      });
     
     
    }
    //let a= this.active.snapshot.params["aaa"];
    // this.newUser={isCompany:true,tel2:"kjkhjk",tel1:"565",city:"3565",fName:"222",lName:"56",house:1,street:"545",friend:true,userKod:123456,id:"45",mail:"545"};
  }

  saveUser() {

    // if (this.passwordToChaeck != this.newUser.password) {
    //      alert("אימות סיסמא שגוי")
    //      return;
    //      }
    // else {
         localStorage.setItem("user", this.newUser.firstName);
         localStorage.setItem("mail", this.newUser.mail);
         localStorage.setItem("pass", this.newUser.password);

      this.userService.updateUser(this.newUser).subscribe(res => { console.log(res) })
  // }
}
  clear() {
    // this.parentForm.controls.files=null;
    this.formValues.resetForm();
  }

  ngOnInit() {
    // if (!this.aaa) {
      if(!this.parentForm)
          this.parentForm = this.formBuilder.group({});

      this.parentForm.addControl('firstName', new FormControl('', Validators.required));
      this.parentForm.addControl('lastName', new FormControl('', Validators.required));
      this.parentForm.addControl('city', new FormControl('', Validators.required));
      this.parentForm.addControl('tel1', new FormControl(['', Validators.required]));
        //  , Validators.pattern("^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$")       
      // this.parentForm.addControl('checkbox2', new FormControl('', Validators.required));
      this.parentForm.addControl('tel2', new FormControl('', ));
      this.parentForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
      this.parentForm.addControl('password', new FormControl(['', Validators.required, Validators.minLength(6)]));
      this.parentForm.addControl('password2', new FormControl('', Validators.required));



    //this.userService.sendEmail("a","b","c").subscribe(res=>{console.log(res);});
    //this.newUser=new Users(); 
  }

  ngOnDestroy() {
    if (!this.aaa) {
    this.parentForm.removeControl("firstName");
    this.parentForm.removeControl("lastName");
    this.parentForm.removeControl("city");
    this.parentForm.removeControl("tel1");
    this.parentForm.removeControl("tel2");
    this.parentForm.removeControl("email");
    this.parentForm.removeControl("password");
    this.parentForm.removeControl("password2");
    // this.parentForm.removeControl("checkbox2");

    }
  }
  sendPassword(event) {
    this.sendP.emit({ value: event.target.value });

  }
  get f() { return this.parentForm.controls; }

  

}
