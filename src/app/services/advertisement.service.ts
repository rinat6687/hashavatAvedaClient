import { Injectable } from '@angular/core';
import { Advertisement } from '../classes/advertisement';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
const URLServaer = "http://localhost:61557/api/";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
lstAdvertisement:Advertisement[];
adToUpdate:Advertisement;
  constructor(private http: HttpClient) { }

  // showItems(categoryId:number) :Observable<Advertisement[]>{
  //   return this.http.get<Advertisement[]>(URLServaer+"advertisement/"+categoryId)
  // }
  showItems() :Observable<Advertisement[]>{
       return this.http.get<Advertisement[]>(URLServaer+"advertisement/GETadvertisement");
     }
  
   public addAd(newad:Advertisement){
     console.log(newad.adKod)

  return this.http.post(URLServaer +"advertisement",{ 
   AdKod:newad.adKod,
   UserKod:newad.userKod,
   Category:newad.category,
   Date:newad.date,
   Area:newad.area,
   Color:newad.color,
   Shape:newad.shape,
   Material:newad.material,
   Status:newad.status,
   Image:newad.image,
   TypeArea:newad.typeArea
 });
} 

 howMachAds() :Observable<number>
  {
    return this.http.get<number>(URLServaer+"advertisement/getStatis")
  }

  deleteAd(adCode) :Observable<string>{

     return  this.http.get<string>(URLServaer+"advertisement/"+adCode)
  }
  updateAd(adToUpdate:Advertisement){
    this.adToUpdate=adToUpdate;
  }
  saveUpdateAd(saveUpdate:Advertisement){
    return  this.http.post(URLServaer+"forUpdateAd",{
      AdKod:saveUpdate.adKod,
      UserKod:saveUpdate.userKod,
      Category:saveUpdate.category,
      Date:saveUpdate.date,
      Area:saveUpdate.area,
      Color:saveUpdate.color,
      Shape:saveUpdate.shape,
      Material:saveUpdate.material,
      Status:saveUpdate.status,
      Image:saveUpdate.image,
      TypeArea:saveUpdate.typeArea
      
    })

  }

}
