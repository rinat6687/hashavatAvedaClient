import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Http, Response } from '@angular/http';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { access } from 'fs';
import { promise } from 'protractor';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { Categories } from '../../classes/categories';
import { AdvertisementService } from '../../services/advertisement.service';
import { Advertisement } from '../../classes/advertisement';
import { areAllEquivalent } from '../../../../node_modules/@angular/compiler/src/output/output_ast';
import { ShowItemsComponent } from '../show-items/show-items.component';
import { DataService } from '../../services/data.service';
import { MatDatepicker } from '../../../../node_modules/@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
import { SignsComponent } from '../signs/signs.component';

//import { AlertPromise } from '../../../../node_modules/@types/selenium-webdriver';
//import { HttpClient } from '../../../../node_modules/@types/selenium-webdriver/http';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})

export class BasicComponent implements OnInit{
 

  public resList: Promise<{}>;
  newAd:Advertisement;
  lstPromise: Promise<string[]>;
  area:string[]=["הגולן","צפת והסביבה","טבריה והסביבה","הגליל המערבי","עפולה והסביבה","חיפה והסביבה","זכרון יעקב חדרה","נתניה והסביבה","פתח תקווה הרצליה","תל אביב יפו","בני ברק והסביבה","ירושלים בית שמש","יהודה ושומרון","חולון בת ים","רחובות והסביבה","לוד מודיעין","אשדוד והסביבה","דרום"]
  selectedArea:string;
  fatherCode: number;
  sendToShow: string = "send to show";
  selectedCategory: Categories;
  d:Date;
  free:string;
  fatherDetils: Categories;
  showItem: boolean = false;
  advertisementsList: Advertisement[];
  FirstList:Advertisement[];
  showItems: boolean;
  allCategory:Categories[];
  subCategoryList:Categories[];
  clicked:boolean=false;
  ifData:boolean;
  noResults:string;
  parentForm: FormGroup;
  currentDate:Date;
  @ViewChild('myForm') formValues;
  values = '';

  @Output() valueChange = new EventEmitter();

  constructor(private http: LoginService,
              private loginService: LoginService,
              private advertisementService: AdvertisementService,
              private data: DataService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog
            ) {
                this.allCategory=this.loginService.categoriesList;

    
       this.data.currentdata.subscribe(category => {this.selectedCategory = category});
             console.log("selected",this.selectedCategory);
             this.loginService.getAllCategories().subscribe(x=>{
              this.loginService.categoriesList=<Categories[]>x;
                    this.allCategory=<Categories[]>x;
                 
    this.advertisementService.showItems().subscribe(advertisements => {
      this.advertisementsList = advertisements;
      this.FirstList=advertisements;
      // alert(this.advertisementsList[0].date);
      this.advertisementService.lstAdvertisement = advertisements;
      this.setCategoryAndStatusName();
      this.advertisementsList.forEach(x=>x.newDate=new Date(x.date));
     this.currentDate=new Date();
     this.advertisementsList= this.advertisementsList.filter(x=>x.newDate.getFullYear()==this.currentDate.getFullYear() && x.newDate.getMonth()==this.currentDate.getMonth());
     this.noResults=null;

    });
 });
 
  }

  submitted = false;

  ngOnInit() {
    this.parentForm = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required]
    });

  }

  // get f1() { return this.catParentForm.controls; }

  material:string;
  kindArea:string;
  transportation:string;
  color:string;
  openDialog(adKod): void {
 
    const dialogRef = this.dialog.open(SignsComponent, {
     width: '500px',
     height:'470px',
     data: {material:this.material,
            kindArea:this.kindArea,
            transportation:this.transportation,
            color:this.color
          }
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result)
     {
      if(this.advertisementsList)  
         this.ifData=true
      else
      {
        this.ifData=false
        alert("no results");
        return;
      }
      this.material = result.material;
      this.kindArea = result.kindArea;  
      this.transportation = result.transportation;
      this.color = result.color;
      this.search();
     }
     else{
      this.ifData=false;
      this.search();
     }


   });

 }
 
 onSubmit() {
   

  this.submitted = true;
  // stop here if form is invalid
  // if (this.parentForm.invalid) {
  //   alert("יש למלא קטגוריה ותת קטגוריה")
  //   return;
  // }
}


  search() {
     this.advertisementsList = this.advertisementService.lstAdvertisement.filter(x => x.category == Number(this.selectedCategory));
     if (this.selectedArea) 
          this.advertisementsList = this.advertisementsList.filter(x => x.area == this.selectedArea);    
     if (this.d)
     {
       

    this.advertisementsList=this.advertisementsList.filter(x=> (this.d.getFullYear()==x.newDate.getFullYear() && this.d.getMonth() == x.newDate.getMonth() && x.newDate.getDate() >=this.d.getDate())|| (x.newDate.getFullYear()>this.d.getFullYear() )||(x.newDate.getFullYear() ==this.d.getFullYear() && x.newDate.getMonth()> this.d.getMonth()) );
     }   // this.advertisementsList=this.advertisementsList.filter(x=> ((this.month.split('-')[0] == x.date.split('-')[0] && x.date.split('-')[1] > this.month.split('-')[1]) || (this.month.split('-')[0] > x.date.split('-')[0])))
     if (this.material)
          this.advertisementsList=this.advertisementsList.filter(x=> x.material==this.material);
     if (this.kindArea)
          this.advertisementsList=this.advertisementsList.filter(x=> x.typeArea==this.kindArea); 
     if (this.transportation)
          this.advertisementsList=this.advertisementsList.filter(x=> x.transportation==this.transportation);
     if (this.color)
          this.advertisementsList=this.advertisementsList.filter(x=> x.color==this.color);
    
     if(this.advertisementsList.length>0)
     {     

       this.noResults=null;
     }
     else
     {

       this.ifData=false;
       this.noResults="לא נמצאו מודעות";

     }
  
          

    }
    //this.showItems = true;
   
     //adv.categoryName = this.selectedCategory.categoryName;

    //alert(this.advertisementService);
    // ShowItemsComponent.prototype.getAdvertisement.call(this.advertisementsList);
  
  setCategoryAndStatusName(){
     this.advertisementsList.forEach(adv => {
      adv.categoryName= this.allCategory.find(x=>x.categoryKod==adv.category).categoryName;
      let fatherId= this.allCategory.find(x=>x.categoryKod==adv.category).categoryParentsId;                                                          
      adv.fatherName=this.allCategory.find(x=>x.categoryKod==fatherId).categoryName;
    });

     this.advertisementsList.forEach(x=>{ 
      if(x.status==true)
        x.statusName="מציאה";
      else  
        x.statusName="אבידה";
    })

   
  
  }
 
  onKey(event: any) {     
// without type info
    this.advertisementsList=this.FirstList;
    this.values = event.target.value ;
    this.advertisementsList=this.advertisementsList.filter(x=> x.categoryName.indexOf(this.values) == 0)
    this.noResults=null;

  }




 
}

