import { Component, OnInit, Input, Inject } from '@angular/core';
import { Mail } from '../../classes/mail';
import { UserService } from '../../services/user.service';
// import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  mail:string,
 
}
@Component({
  selector: 'app-mail-comp',
  templateUrl: './mail-comp.component.html',
  styleUrls: ['./mail-comp.component.css']
})
export class MailCompComponent implements OnInit {
 mail:Mail=new Mail()
 @Input() showMailComp:boolean;
  constructor(private userService:UserService,
              public dialogRef: MatDialogRef<MailCompComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
            ) { }

  ngOnInit() {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendEmail(){
    this.mail.emailAdvertiser=this.data.mail;
    this.userService.sendEmail(this.mail).subscribe(res=>{


        this.dialogRef.close();
    });
  }
  
}

