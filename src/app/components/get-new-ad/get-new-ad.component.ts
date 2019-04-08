import { Component, OnInit, Input, Inject } from '@angular/core';
import { Mail } from '../../classes/mail';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MailCompComponent } from '../mail-comp/mail-comp.component';
import { LoginService } from '../../services/login.service';
import { Categories } from '../../classes/categories';

export interface DialogData {
  mail:string,
 
}
@Component({
  selector: 'app-get-new-ad',
  templateUrl: './get-new-ad.component.html',
  styleUrls: ['./get-new-ad.component.css']
})
export class GetNewAdComponent implements OnInit {
  mail:Mail=new Mail();
  fatherCode:number;
  categoryList:Categories[];
  subCategoryList:Categories[];
  @Input() showMailComp:boolean;
   constructor(private userService:UserService,
               public dialogRef: MatDialogRef<GetNewAdComponent>,
               public loginService:LoginService,

               @Inject(MAT_DIALOG_DATA) public data: DialogData
             ) { }
 
   ngOnInit() {
    this.getCategories();
   }
   onNoClick(): void {
     this.dialogRef.close();
   }
 
   sendEmail(){
    //  this.mail.emailAdvertiser=this.data.mail;
     this.userService.sendEmail(this.mail).subscribe(res=>{
         this.dialogRef.close();
     });
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
