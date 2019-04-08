
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../app/classes/message';
//import { NgRedux } from '@angular-redux/store';
//import { ChatsService } from '../../app/services/';
//import { CHATS } from 'src/app/app.consts';
const URLServaer = "http://localhost:61557/api/";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient//, private ngRedux: NgRedux<any>
    //, private chatsService: ChatsService
  ) { 
  }

  

  SendAnswer(message: Message) {
    return this.http.put<Message>(URLServaer + 'api/messages/SendAnswer', message);
  }

  readEmails() {
   // return new Promise<Message[]>((resolve) => {
     // this.http.get<Message[]>(URLServaer + 'api/messages/ReadMessagesFromMail').subscribe(messeges => {
        //let loadChats = this.ngRedux.getState().chatsReducer.chats;
      //  messeges.forEach(message => {
         // let chat = loadChats.find(x => x.Id == message.ChatId);
         // if (chat) {
          //  this.ngRedux.dispatch({ type: CHATS.ADD_MESSAGE, payload: message })
      //    }
     //     else {
           // this.chatsService.GetChatById(message.ChatId).subscribe(chat => {
             // this.ngRedux.dispatch({ type: CHATS.ADD_CHAT, payload: chat })
         //   })
       //   }
      //  });
      //  resolve(messeges);
    //  })
  //  });
 }


}
