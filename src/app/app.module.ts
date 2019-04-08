import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,Response } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BasicComponent } from './components/basic/basic.component';
import { LoginService } from './services/login.service';
import { RouterLink } from '../../node_modules/@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ShowItemsComponent } from './components/show-items/show-items.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { UserComponent } from './components/user/user.component';
import { CategoryCompComponent } from './components/category-comp/category-comp.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatModule} from './modules/mat/mat.module';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { SignsComponent } from './components/signs/signs.component';
import { AreaComponent } from './components/area/area.component';
import { SgulotComponent } from './components/sgulot/sgulot.component';
import { MailCompComponent } from './components/mail-comp/mail-comp.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { NgRedux } from '@angular-redux/store';
// import {MatSelectModule} from '@angular/material/select';

//import {MatInputModule} from '@angular/material/input';

import { MatPaginatorModule, MatSortModule, MatSelectModule } from '@angular/material';
import { UpdateAreaComponent } from './components/update-area/update-area.component';
import { ModelComponent } from './components/model/model.component';
import { ShootComponent } from './components/shoot/shoot.component';
import { GetNewAdComponent } from './components/get-new-ad/get-new-ad.component';
import { AskRabbiComponent } from './components/ask-rabbi/ask-rabbi.component';
//import { ChatComponent } from './components/chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ShowItemsComponent,
    AddAdComponent,
    UserComponent,
    CategoryCompComponent,
    LoginComponent,
    SearchComponent,
    SignsComponent,
    AreaComponent,
    SgulotComponent,
    MailCompComponent,
    UpdateAreaComponent,
    ModelComponent,
    ShootComponent,
    GetNewAdComponent,
    AskRabbiComponent//,
   // ChatComponent
  ],//y,RouterLink.forr
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule ,
    BrowserAnimationsModule,
    //NgRedux,
    
    //MatButtonModule,
    //MatCheckboxModule,
    HttpModule,
    //MatPaginatorModule,
   // MatSortModule,
   MatSelectModule,
   MatModule,
   //MatInputModule


  ],
  providers: [
  LoginService,
  { provide: MatDialogRef, useValue: {} },
	{ provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  entryComponents:[MailCompComponent,SignsComponent,GetNewAdComponent,AskRabbiComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
