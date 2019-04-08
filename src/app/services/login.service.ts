import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { resolve } from 'dns';
import { Categories } from '../classes/categories';
//import { Observable, observable } from '../../../node_modules/rxjs';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { map, catchError } from 'rxjs/operators';
import { reject } from 'q';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Users } from '../classes/users';
import { Advertisement } from '../classes/advertisement';
import { Login } from '../classes/login';

const URLServaer = "http://localhost:61557/api/";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
 lstPromise: Promise<string[]>;
 lst:Response;
 categoriesList:Categories[]=null;     
 results=[];
 loginDetails:Login;
 subCategoryList:Categories[];
  constructor(private http: HttpClient) { }


// showItems(categoryId:number) :Observable<Advertisement[]>{
//   console.log(categoryId);
//   return this.http.get<Advertisement[]>(URLServaer+"advertisement")
// }
 // return this.http.get<Advertisement[]>(URLServaer+"advertisement/"+categoryId):Observable<Categories[]>


getAllCategories(){
 return this.http.get<Categories[]>(URLServaer +"login");

}

 getCategories(categoryId:number) :Observable<Categories[]>{
 return this.http.get<Categories[]>(URLServaer +"login/"+categoryId)
 }


 public login(loginDetails:Login){
  let user:Users=new Users();
  user.mail=loginDetails.Mail;
  user.password=loginDetails.Password;
    // return this.http.get(URLServaer +"login/getLogin/"+loginDetails);
    return this.http.post(URLServaer+"login/postLogin",{
      Mail:user.mail,
      Password:user.password
    })
    // {params:{
    //   Mail:loginDetails.Mail,
    //   Password:loginDetails.Password
    // }})
                                                
  }


}

