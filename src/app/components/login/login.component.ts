import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Login } from '../../classes/login';
import { FormGroup, FormControl, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 @Input() loginDetails:Login;
 ress:any;
 userCode:number;
 
 @Input() parentForm:FormGroup;
 @Input() submitted:boolean;
//  @Output()
//  login:EventEmitter<string>=new EventEmitter<string>();
  constructor(private loginService:LoginService,
              private formBuilder: FormBuilder
             ) { }


  ngOnInit() {
    if(!this.parentForm)
      this.parentForm = this.formBuilder.group({});
      
    this.parentForm.addControl('userNameLogin', new FormControl('', [Validators.required, Validators.email]));
    this.parentForm.addControl('passwordLogin', new FormControl('', [Validators.required, Validators.minLength(6)]));

  }
  
  ngOnDestroy(){
    this.parentForm.removeControl("userNameLogin");
    this.parentForm.removeControl("passwordLogin");
  }

  get f() { return this.parentForm.controls; } 
  
 
}
