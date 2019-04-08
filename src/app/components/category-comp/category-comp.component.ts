import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Categories } from '../../classes/categories';
import { FormControl ,Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AppComponent } from '../../app.component';
import { DataService } from '../../services/data.service';
import { Advertisement } from '../../classes/advertisement';


@Component({
  selector: 'app-category-comp',
  templateUrl: './category-comp.component.html',
  styleUrls: ['./category-comp.component.css']
})
export class CategoryCompComponent implements OnInit {
  

categoryList:Categories[];
category:Categories[];
subCategoryList:Categories[];
@Input() newAd:Advertisement;
allCategory:Categories[];
fatherCode:number;
childCode:number;
h=[];
sub:boolean;
b:FormControl;
@Input() parentForm:FormGroup;
// @Input() catParentForm:FormGroup;
@Input() submitted:boolean;

// @Input() registerForm: FormGroup;
 selectedCategory:Categories=new Categories();
// requiredFormControl = new FormControl('', [
// Validators.required]);//just required
// registerForm3:FormGroup;

  constructor(private loginService: LoginService ,
              private data: DataService,
              private formBuilder: FormBuilder) {}
  ngOnInit() {
    
//     this.registerForm3 = this.formBuilder.group({
     
   
// });
     this.getCategories();
    //this.loginService.getCategories(0);
    //this.data.currentdata.subscribe(id => this.childCode = id)
  }

  //  get f() { if(!this.newAd)  return this.parentForm.controls; }  
   get f() { return this.parentForm.controls; }  


  sendChildCode() {
    //console.log(this.selectedCategory.categoryKod);
   //console.log(this.selectedCategory.categoryName);
   this.data.getCategory(this.selectedCategory)
   console.log();
  }

  getAllCategory(){
    this.loginService.getAllCategories();
  }

  getCategories() :void{
   this.loginService.getCategories(0).subscribe(categories=>
    {this.categoryList=categories;
    this.loginService.categoriesList=categories;
    })
   }

  getSubCategoryList(fatherCode:number):void{
    // document.getElementById("sub").
   this.loginService.getCategories(fatherCode).subscribe(subcategories=>{
     this.subCategoryList=subcategories;
     this.loginService.subCategoryList=subcategories;
  
  });
  }
  }
  
  
  
  