import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { AdvertisementService } from '../../services/advertisement.service';
import { Advertisement } from '../../classes/advertisement';
import { LoginService } from '../../services/login.service';
import { Categories } from '../../classes/categories';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { MailCompComponent } from '../mail-comp/mail-comp.component';
import { UserService } from '../../services/user.service';
import { Users } from '../../classes/users';
import { Router } from '../../../../node_modules/@angular/router';
import { Login } from '../../classes/login';
import { Mail } from '../../classes/mail';

@Component({
  selector: 'app-update-area',
  templateUrl: './update-area.component.html',
  styleUrls: ['./update-area.component.css']
})
export class UpdateAreaComponent implements OnInit {
  
@Input()
lst:Advertisement[];
allCategory:Categories[];
user:Users;
linkToAdAdd:any;
loginOK:boolean;
myLogin:Login=new Login();
  constructor(private adser:AdvertisementService,
              private login:LoginService,
              public dialog: MatDialog,
              public userService:UserService,
              public advertisementSerive:AdvertisementService,
              private router:Router,
             
            ) { 
 this.myLogin.Mail=localStorage.getItem("mail");
 this.myLogin.Password=localStorage.getItem("pass");
 var userCode=+localStorage.getItem("userCode");

 this.userService.getUserForShowDetails(<number>userCode).subscribe(x=>{this.user=x});
 this.adser.showItems().subscribe(x=>{this.adser.lstAdvertisement=<Advertisement[]>x;
this.user.mail=this.myLogin.Mail;

     this.login.getAllCategories().subscribe(x=>{
      this.login.categoriesList=<Categories[]>x;
            this.allCategory=this.login.categoriesList;
        
     this.getUserList();
   
  });
 

});


  }
  getUserList(){
    this.login.login(this.myLogin).subscribe(res=>{
      if(res==0){
        alert("שם משתמש או סיסמא שגויים")
        return;
        }
      else { 
        localStorage.setItem("userCode",<string>res); 
        localStorage.setItem("mail",this.myLogin.Mail);
        localStorage.setItem("pass",this.myLogin.Password);
        this.lst=this.adser.lstAdvertisement.filter(x=>x.userKod==res);
        this.setCategoryName();    

        }
     
    });
  }
  
//   saveUser(){
    
  
//     this.getUserList();
  
// //this.lst=this.userService.getuserByMail(this.myLogin.Mail)
//   }
  ngOnInit() {
   
   
    
  }
  showDetails(item) {
    if(item.selected)
    item.selected=false;
    else
    item.selected=true;
  
  }

  setCategoryName(){
    this.lst.forEach(adv => {
     adv.categoryName= this.allCategory.find(x=>x.categoryKod==adv.category).categoryName;
     let fatherId= this.allCategory.find(x=>x.categoryKod==adv.category).categoryParentsId;                                                          
     adv.fatherName=this.allCategory.find(x=>x.categoryKod==fatherId).categoryName;
   });

   this.lst.forEach(x=>{ 
    if(x.status==true)
      x.statusName="מציאה";
    else  
      x.statusName="אבידה";
  })
 }

 deleteAd(item){
  item.selected=false;
  var index=this.lst.findIndex(x=> x.adKod==item.adKod);
  this.advertisementSerive.deleteAd(item.adKod).subscribe(res=>console.log(res));  
  this.lst.splice(index,1);

 }

 updateAd(item){
   this.router.navigate(['area/addad',"bbb"]);
   item.selected=false;
   this.advertisementSerive.updateAd(item);
 }
}
