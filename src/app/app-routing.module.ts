import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './components/basic/basic.component';
import { ShowItemsComponent } from './components/show-items/show-items.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { UserComponent } from './components/user/user.component';
import { AreaComponent } from './components/area/area.component';
import { SgulotComponent } from './components/sgulot/sgulot.component';
import { UpdateAreaComponent } from './components/update-area/update-area.component';
import { ShootComponent } from './components/shoot/shoot.component';
import { LoginComponent } from './components/login/login.component';

const Path: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: BasicComponent },
  // { path: 'user', component: UserComponent },
  { path: 'addad', component: AddAdComponent },
  {
    path: 'area', component: AreaComponent, children: [
      { path: '', redirectTo: 'app-update-area',  pathMatch: 'full' },
      { path: 'app-update-area', component: UpdateAreaComponent },
      // { path: 'addad/:bbb:ccc', component: AddAdComponent },//מודעה חדשה מאזור אישי
      { path: 'user/:aaa', component: UserComponent },    
      { path: 'addad/:bbb', component: AddAdComponent }//מודעה לעדכון
    ]
  },
  { path: 'show-items', component: ShowItemsComponent },
  { path: 'sgulot', component: SgulotComponent },
  { path: 'shoot', component:ShootComponent}

];

@NgModule({
  // imports: [
  //   CommonModule
  // ],declarations: []
  imports: [RouterModule.forRoot(Path)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
