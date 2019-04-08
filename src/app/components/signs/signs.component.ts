import { Component, OnInit, Input, Inject } from '@angular/core';
import { Advertisement } from '../../classes/advertisement';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface signsData
  {
    cancel:boolean;
     material:string;
     kindArea:string;
     transportation:string;
     color:string;

  }

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.css']
})
export class SignsComponent implements OnInit {
  
  
 
  activeItemNumber:number;
  newAd:Advertisement;
  material:string[]=["בד","מתכת","פלסטיק"]
  kindArea:string[]=["איזור ישוב/עירוני","בשטח","במתחם סגור","תחבורה"];
  transportation:string[]=["אוטובוס","רכבת","טרמפ","תחנת אוטובוס","מטוס"];
  constructor( public dialogRef: MatDialogRef<SignsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: signsData  ) { }

  ngOnInit() {
    // this.newAd = new Advertisement();
      this.data.cancel=true;
  }

  onNoClick(): void {
    this.data.cancel=false;
    this.dialogRef.close();
  }

  activeColor(i)
  {
    this.activeItemNumber=i
    switch(i)
    {  case 1: this.data.color = "אדום";
    break;
  case 2: this.data.color = "ירוק";
    break;
  case 3: this.data.color = "ירוק בהיר";
    break;
  case 4: this.data.color = "כחול";
    break;
  case 5: this.data.color = "תכלת";
    break;
  case 6: this.data.color = "צהוב";
    break;
  case 7: this.data.color = "סגול"
    break;
  case 8: this.data.color = "ורוד בהיר";
    break;
  case 9: this.data.color = "פוקסיה";
    break;
  case 10: this.data.color = "כתום";
    break;
  case 11: this.data.color = "טורקיז";
    break;
  case 12: this.data.color = "חום";
    break;
  case 13: this.data.color = "אפור";
    break;
  case 14: this.data.color = "זהב";
    break;
  case 15: this.data.color = "כסף";
    break;
  case 16: this.data.color = "לבן";
    break;
  case 17: this.data.color = "שחור"
    break;
  default:
    }

  }
//   showNewAd()
//   {
// console.log(this.newAd);
// console.log(this.newAd.status);

//   }
}
