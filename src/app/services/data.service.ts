import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Categories } from '../classes/categories';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // category:null;
  private dataSource = new BehaviorSubject(new Categories());
  currentdata = this.dataSource.asObservable();

  constructor() { }

  getCategory(category: Categories) {
    this.dataSource.next(category)
  }


}
