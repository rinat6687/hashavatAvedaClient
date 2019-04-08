import { Component, Input, OnInit} from '@angular/core';
import { CategoryCompComponent } from './components/category-comp/category-comp.component';
import { Router } from '../../node_modules/@angular/router';
import { FormControl ,Validators} from '@angular/forms';
import { DataService } from './services/data.service';
import { AdvertisementService } from './services/advertisement.service';
import { UserService } from './services/user.service';
import { Users } from './classes/users';
import { LoginService } from './services/login.service';
import { Categories } from './classes/categories';
import { MatDialog } from '../../node_modules/@angular/material';
import { MailCompComponent } from './components/mail-comp/mail-comp.component';
import { GetNewAdComponent } from './components/get-new-ad/get-new-ad.component';
import { AskRabbiComponent } from './components/ask-rabbi/ask-rabbi.component';

const requiredFormControl = new FormControl('', [ Validators.required]);//just required
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
navLinks: any[];
statisticArray:number[]=[];
activeLinkIndex = -1; 
categoryCode:number;
counter:number=0;
user1:string=null;
//sFormControlList = new FormControl()
   
    idFormControl = new FormControl('', [
     Validators.required,
      Validators.maxLength(9),
     ]);
     emailFormControl = new FormControl('', [
     Validators.required,
      Validators.email,
     ]);
constructor(private router: Router,
            private data: DataService,private userSer:UserService,private loginService:LoginService,
            private advertisementService:AdvertisementService,
            public dialog: MatDialog,) {

   
  this.navLinks = [ 
      {
          label: 'סגולות',
          link: './sgulot',
          index: 0
      },
      {
          label: 'שו"ת',
          link: './shoot',
          index: 1
      },
      {
          label: 'איזור אישי',
          link: './area',
          index: 2
      },
      {
          label: 'חיפוש',
          link: './search',
          index: 3
      },
       
       {
          label: 'הוסף מודעה',
          link: './addad',
          index: 4
      }, 

  ];
}

getFormControl()
{

}
    
ngOnInit(): void {
  
  this.router.events.subscribe((res) => {
  this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
});
 this.advertisementService.howMachAds().subscribe(res=>{console.log(res[2]),this.statisticArray[0]=res[0],
                                                                            this.statisticArray[1]=res[1],
                                                                            this.statisticArray[2]=res[2]});
//   this.userSer.getUserBySession().subscribe(res=>{
// this.userSer.myUser=<Users>res;
// this.user1=this.userSer.myUser;
//   });
if(localStorage.getItem("user")!=null)
this.user1=localStorage.getItem("user");

}

wontToGetMail(){

}
openDialog(adKod): void {
    const dialogRef = this.dialog.open(GetNewAdComponent, {
     width: '500px',
     height:'450px',
     data: {}
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
    //  this.animal = result;
   });
 }

 openDialogRabbi(): void {
    const dialogRef = this.dialog.open(AskRabbiComponent, {
     width: '600px',
     height:'650px',
     data: {}
   });

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
    //  this.animal = result;
   });
 }

}
