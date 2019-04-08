import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../classes/users';
import { promise } from 'protractor';
import { reject } from 'q';
import { Advertisement } from '../classes/advertisement';
import { Observable } from '../../../node_modules/rxjs';
import { Mail } from '../classes/mail';
import { url } from 'inspector';
import { Login } from '../classes/login';

const URLServaer = "http://localhost:61557/api/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

   //newUser: Users;
  
//mail:Mail;
  constructor(private http: HttpClient) { }
myUser:Users;
    
  public postUser(neww:Users){
   return this.http.post(URLServaer +"user",{ 
    UserKod :neww.userKod,
    Friend :neww.friend,
    FirstName:neww.firstName,
    LastName:neww.lastName,
    // ID:neww.ID,
    City:neww.city,
    Street:neww.street,
    House:neww.house,
    Mail:neww.mail,
    Tel1:neww.Tel1,
    Tel2:neww.Tel2,
    IsCompany:neww.isCompany,
    ConnectDb:neww.connectDb,
    Password:neww.password
  });
  //.subscribe(() => console.log('aaa'));
  //return this.http.post(URLServaer +"user",' ').toPromise();

  }

  public updateUser(neww:Users){
     return this.http.post(URLServaer +"login/postUpdate",{ 
      UserKod :neww.userKod,
      Friend :neww.friend,
      FirstName:neww.firstName,
      LastName:neww.lastName,
      // ID:neww.ID,
      City:neww.city,
      Street:neww.street,
      House:neww.house,
      Mail:neww.mail,
      Tel1:neww.Tel1,
      Tel2:neww.Tel2,
      IsCompany:neww.isCompany,
      ConnectDb:neww.connectDb,
      Password:neww.password
    });
    //.subscribe(() => console.log('aaa'));
    //return this.http.post(URLServaer +"user",' ').toPromise();
  
    }

  getUserForShowDetails(userCode:number):Observable<Users>
  {
    //  let userCode=ad.userKod;
     return  this.http.get<Users>(URLServaer+"user/"+userCode);

  }
 public sendEmail(mail:Mail) {
    let user:Users=new Users();
    user.mail=mail.email; //mail from
    user.firstName=mail.name;
    user.Tel1=mail.tel;
    user.Tel2=mail.message;
    user.street=mail.emailAdvertiser; //mail to
    user.userKod=mail.category;
    user.city=mail.askRabbi;
      console.log(user);

    return this.http.post(URLServaer+"Mail", {     
      FirstName:user.firstName,
      Mail:user.mail,
      Tel1:user.Tel1,
      Tel2:user.Tel2,
      Street:user.street,
      UserKod:user.userKod,
      City:user.city

    });
  
  }
getUserBySession(){
   return this.http.get(URLServaer+"user/getUserBySess");
  }
//   getuserByUserCode(userCode){
// //let mail=localStorage.getItem("mail");
//    return this.http.get(URLServaer+"user/getUserByPass",{
//     userKod:pass
//    });
//   }
}//(URLServaer +"user").subscribe(x=>{this.newUser=<Users>x;});
