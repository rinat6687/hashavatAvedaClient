import { Component, OnInit, Inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { Mail } from '../../classes/mail';
import { DialogData } from '../mail-comp/mail-comp.component';

@Component({
  selector: 'app-ask-rabbi',
  templateUrl: './ask-rabbi.component.html',
  styleUrls: ['./ask-rabbi.component.css']
})
export class AskRabbiComponent implements OnInit {

  mail:Mail=new Mail()
 @Input() showMailComp:boolean;
  constructor(private userService:UserService,
              public dialogRef: MatDialogRef<AskRabbiComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
            ) { }

  ngOnInit() {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendEmail(){
    // this.mail.emailAdvertiser=this.data.mail;
    console.log(this.mail);
    this.userService.sendEmail(this.mail).subscribe(res=>{
        this.dialogRef.close();
    }
  );
  }

}
