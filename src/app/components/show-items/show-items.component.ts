import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BasicComponent } from '../basic/basic.component';
import { Advertisement } from '../../classes/advertisement';
import { AdvertisementService } from '../../services/advertisement.service';
import { CategoryCompComponent } from '../category-comp/category-comp.component';
import { Categories } from '../../classes/categories';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { AddAdComponent } from '../add-ad/add-ad.component';
import { Users } from '../../classes/users';
import { EmailValidator } from '../../../../node_modules/@angular/forms';
import { MailCompComponent } from '../mail-comp/mail-comp.component';
// import { MatDialog } from '../../../../node_modules/@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
// import { ModelService } from '../../services/model.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.css']
})
export class ShowItemsComponent implements AfterViewInit {

  @Input() fromShow: number
  @Input()advertisements: Advertisement[];
  categoryName: string;
  categoryList: Categories[];
  user:Users[]=[];
  showDet:boolean;
  mail:EmailValidator;
  mailComp:boolean;
  statusName:string;
  @Input() statusChange:boolean;
  animal: string;
  name: string;
  itemSelected:Advertisement;
  itemImg:string;
  

  constructor(private advertisementService: AdvertisementService,
              private loginService: LoginService,
              private userService:UserService,
              public dialog: MatDialog,
              // public modalService:ModelService
              )
 { 
  
  }

  ngOnInit() {
   

  }
  showDetails(item) {
    if(item.selected)
    item.selected=false;
    else
    item.selected=true;

    this.itemImg=item.image;
    this.userService.getUserForShowDetails(item.userKod).subscribe(res=>{this.user[item.adKod]=res;console.log(this.user[item.adKod].cheackboxEmail);
});
  
    //  if(this.mailComp)
    // this.mailComp=false;
  
  }
  
  ngAfterViewInit(){
    // this.getAdvertisement();
   
  }
  showEmailComp()
  {
   
    this.mailComp=true;
   
  }


  openDialog(adKod): void {

    // if(this.user[adKod].cheackboxEmail==false){
    // //  alert("מפרסם מודעה זו אינו מעונין לקבל מיילים, תוכל ליצור קשר טלפוני");
    //   return;
    // }
     const dialogRef = this.dialog.open(MailCompComponent, {
      width: '500px',
      height:'550px',
      data: {mail:this.user[adKod].mail }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


//   openModal(id: string) {
//     this.modalService.open(id);
// }

// closeModal(id: string) {
//     this.modalService.close(id);
// }
 

}

//<app-comp2 [lst]=""></app-comp2>


