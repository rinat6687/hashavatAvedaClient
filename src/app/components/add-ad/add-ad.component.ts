import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { BasicComponent } from '../basic/basic.component';
//import { FormControl,Validators } from '../../../../node_modules/@angular/forms';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AdvertisementService } from '../../services/advertisement.service';
import { Advertisement } from '../../classes/advertisement';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Users } from '../../classes/users';
import { UserService } from '../../services/user.service';
import { Login } from '../../classes/login';
import { LoginService } from '../../services/login.service';
import { Categories } from '../../classes/categories';


@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {
  months: string[] = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  area: string[] = ["הגולן", "צפת והסביבה", "טבריה והסביבה", "הגליל המערבי", "עפולה והסביבה", "חיפה והסביבה", "זכרון יעקב חדרה", "נתניה והסביבה", "פתח תקווה הרצליה", "תל אביב יפו", "בני ברק והסביבה", "ירושלים בית שמש", "יהודה ושומרון", "חולון בת ים", "רחובות והסביבה", "לוד מודיעין", "אשדוד והסביבה", "דרום"]
  imageNum: number[] = [];
  sachHacol: number;
  flag: boolean;
  month: string;
  newAd: Advertisement = new Advertisement();
  activeItemNumber: number;
  picture: boolean;
  imgSrc: string;
  selectedFile: File;
  selected: string;
  selectedVal: boolean;
  loginSelected: boolean = true;
  userSelected: boolean;
  showTitel: boolean;
  bbb: boolean;
  indStatus:string;
 ad:Advertisement;
  parentForm: FormGroup;
  newUser: Users = new Users();
  loginDetails: Login = new Login();
  passwordToChaeck: string;
  
  @ViewChild('myForm') formValues;
  // activeItemNumber:number;
  material: string[] = ["בד", "מתכת", "פלסטיק"]
  kindArea: string[] = ["איזור ישוב/עירוני", "בשטח", "במתחם סגור", "תחבורה"];
  transportation: string[] = ["אוטובוס", "רכבת", "טרמפ", "תחנת אוטובוס", "מטוס"];
  nameStatus:string;
  allCategory:Categories[];
  advertisementsList:Advertisement[];
  statuses:string[]=['אבידה','מציאה'];
  constructor(private advertisementService: AdvertisementService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private active: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService,
 ) {


      this.newUser.cheackboxEmail=false;
      this.newUser.cheackboxRegulations=false;

    this.bbb = this.active.snapshot.params["bbb"];
    // this.ccc = this.active.snapshot.params["ccc"];
// && this.ccc == null
    if (this.bbb != null ) {
     this.ad = advertisementService.adToUpdate;
      if (this.ad) {
        this.newAd = this.ad;
      
        //  document.getElementsByName("area").item.
      }
    }
  }


  submitted = false;
  ngOnInit() {

    this.newAd.image = 'assets/image/addImage.png';

    this.parentForm = this.formBuilder.group({
      status: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      date: ['', Validators.required],
      areaes: ['', Validators.required],
      material: new FormControl(['']),
      area: new FormControl(['']),
      transportation: new FormControl([''])
      // colorSelect:new FormControl(['']),

    });

    // this.parentForm.valueChanges.subscribe(x=>{console.log(x)});

  }

  // convenience getter for easy access to form fields
  get f() { return this.parentForm.controls; }
  sendPassword(event) {
    this.passwordToChaeck = event.value;
  }
 
  onSubmit() {
    this.newAd.status=this.indStatus=="1"? true:false; 
    console.log(this.passwordToChaeck);
    this.submitted = true;
    // stop here if form is invalid
if (this.parentForm.invalid && !this.bbb) {
      alert("פרטי מודעה שגוי")
      return;
    }
    
    if(this.bbb!=null){
     // הגעת מאזור אישי לצורך עדכון מודעה
      this.advertisementService.saveUpdateAd(this.newAd).subscribe();


     //הוספת מודעה חדשה מאיזור  אישי
    //  var u=+localStorage.getItem("userCode");
    //  this.newAd.userKod=u;
    //  this.addAd();

    }
    else{
  // משתמש חדש
    if (this.userSelected) {

      // if (this.passwordToChaeck != this.newUser.password) {
      //   
      //   alert("אימות סיסמא שגוי")
      //   return;
      // }
      // else {
        localStorage.setItem("user", this.newUser.firstName);
        localStorage.setItem("mail", this.newUser.mail);
        localStorage.setItem("pass", this.newUser.password);

        this.userService.postUser(this.newUser).subscribe(res => {       
           this.newAd.userKod=<number>res; 

           
           this.addAd();
         })
       
      // }

    }
    //  משתמש קיים
    else {
      this.tryLogin();
    }

    }
    
  
    // this.class = "register"
  }

  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.parentForm.value))

  tryLogin() {
 
    this.loginService.login(this.loginDetails).subscribe(res => {

      if(this.bbb==null){
            if (res == 0  ) {

           alert("שם משתמש או סיסמא שגויים")
           return;
         }
            else {
           this.newAd.userKod = <number>res;
           console.log(this.newAd);
           this.addAd();
         }
      }
      else{
         console.log(this.newAd.userKod);
         this.advertisementService.addAd(this.newAd);
      }
     
      // this.userCode=<number>res;
    });
  }

  radioSelected(selected: number) {

    if (selected == 0) {
      this.showTitel = false;
      this.userSelected = true;
      this.loginSelected = false;
    }
    else {
      this.userSelected = false;
      this.loginSelected = true;

    }

  }

  activeColor(i) {
    this.activeItemNumber = i
    switch (i) {
      case 1: this.newAd.color = "אדום";
        break;
      case 2: this.newAd.color = "ירוק";
        break;
      case 3: this.newAd.color = "ירוק בהיר";
        break;
      case 4: this.newAd.color = "כחול";
        break;
      case 5: this.newAd.color = "תכלת";
        break;
      case 6: this.newAd.color = "צהוב";
        break;
      case 7: this.newAd.color = "סגול"
        break;
      case 8: this.newAd.color = "ורוד בהיר";
        break;
      case 9: this.newAd.color = "פוקסיה";
        break;
      case 10: this.newAd.color = "כתום";
        break;
      case 11: this.newAd.color = "טורקיז";
        break;
      case 12: this.newAd.color = "חום";
        break;
      case 13: this.newAd.color = "אפור";
        break;
      case 14: this.newAd.color = "זהב";
        break;
      case 15: this.newAd.color = "כסף";
        break;
      case 16: this.newAd.color = "לבן";
        break;
      case 17: this.newAd.color = "שחור"
        break;
      default:
    }

  }
  showNewAd() {
    console.log(this.newAd);
    console.log(this.newAd.status);

  }

  handleFiles(e) {   
    
   
  
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('יש להעלות תמונות בלבד');
      return;
    }
    // if(e.dataTransfer.files.length>1){
    //   alert('ניתן להוסיף תמונה אחת בלבד')
    // }
    document.getElementById("cancel").style.visibility = "visible";
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.newAd.image = reader.result;
    this.flag=true;
  }
  clear() {
    // this.parentForm.controls.files=null;
    this.formValues.resetForm();
    this.newAd.image = 'assets/image/addImage.png';
    console.log(this.newAd);
  }


  cancel() {
    this.newAd.image = 'assets/image/addImage.png';
    this.flag=false;
    this.newAd.color = null;
  }
  addAd() {
   
    console.log(this.newAd.date);
    console.log(this.indStatus);
    // console.log(this.newAd.color);
    // this.newAd.image=this.imgSrc;
    if(this.newAd.status==true&&this.flag){
      alert(" בפרסום מציאה לא ניתן להעלות תמונה") ; 
      return;
  }
 
    this.advertisementService.addAd(this.newAd).subscribe(res => alert("מודעתך פורסמה בהצלחה!"));
  }

}
