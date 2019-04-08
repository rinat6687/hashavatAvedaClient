import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Advertisement } from '../../classes/advertisement';
import { AdvertisementService } from '../../services/advertisement.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Login } from '../../classes/login';
import { UserService } from '../../services/user.service';
import { Users } from '../../classes/users';
import { LoginService } from '../../services/login.service';
import { Categories } from '../../classes/categories';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit,AfterContentInit {
  ngAfterContentInit(): void {
  
  }
  navLinks: any[];
  activeLinkIndex = -1; 
  myLogin:Login=new Login();
  user:Users;
  checkIfUserLogin:string=null;
  userName:string=null;
  lst:Advertisement[];

  allCategory:Categories[];

  constructor(private adser:AdvertisementService,
              private router:Router,
              private userService:UserService,
              private login:LoginService
             )
               { 
   


    this.navLinks = [
    
    // ,{
    //     label: 'פירסום מודעה חדשה',
    //     link: './addad/"ccc"',
    //     index: 1
    // }
    
    { 
    
        label: 'עדכון פרטים',
        link: './user/"aaa"',
        index: 0
    },{
        label: 'עדכון ועריכת מודעות',
        link: './app-update-area',
        index: 1
    },{
    
        label: 'מודעה לעדכון',
        link: './addad/"bbb"',
        index: 2
    }

];


this.myLogin.Mail=localStorage.getItem("mail");
this.myLogin.Password=localStorage.getItem("pass");
  //  this.userService.getUserForShowDetails(1).subscribe(res=>{this.user=res;});
   this.adser.showItems().subscribe(x=>{this.adser.lstAdvertisement=<Advertisement[]>x;
// this.user.mail=this.myLogin.Mail;

    this.login.getAllCategories().subscribe(x=>{
     this.login.categoriesList=<Categories[]>x;
           this.allCategory=this.login.categoriesList;
       
  
 // alert(this.allCategory.length);
  });
 });


}

  ngOnInit() {

this.userName=localStorage.getItem("user");
    if(localStorage.getItem("pass")!=null){
         this.checkIfUserLogin=localStorage.getItem("pass");

    }

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));   

    });
    
  }

  logOut(){
        localStorage.removeItem("userCode");
        localStorage.removeItem("user");
        localStorage.removeItem("mail");
        localStorage.removeItem("pass");

        this.checkIfUserLogin=null;

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
        this.checkIfUserLogin=localStorage.getItem("pass");
        this.userService.getUserForShowDetails(<number>res).subscribe(x=>{this.user=x; this.userName=this.user.firstName;
        localStorage.setItem("user",this.userName) });
       
        this.lst=this.adser.lstAdvertisement.filter(x=>x.userKod==res);
        console.log(this.lst);
        this.setCategoryName();    
       
        }
     
    });
  }

  setCategoryName(){
    this.lst.forEach(adv => {
     adv.categoryName= this.allCategory.find(x=>x.categoryKod==adv.category).categoryName;
     let fatherId= this.allCategory.find(x=>x.categoryKod==adv.category).categoryParentsId;                                                          
     adv.fatherName=this.allCategory.find(x=>x.categoryKod==fatherId).categoryName;
    // adv.fatherName.replace(" ","");
   });

   this.lst.forEach(x=>{ 
    if(x.status==true)
      x.statusName="מציאה";
    else  
      x.statusName="אבידה";
  })
 
  this.checkIfUserLogin=localStorage.getItem("pass");
 }


adver:Advertisement[];
show:boolean=null;
func(val:string){

  if(val)
  {
    
 // this.adver=this.ser.lstAdvertisement.filter(x=>x.userKod==val);
    //שליפת רשית המוצרים לפי מייל
  //this.show=true;
}

}
  }