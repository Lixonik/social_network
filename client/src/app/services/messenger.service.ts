import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription, tap} from "rxjs";
import {User} from "../models/User";
import Message from "../models/Message";
import {HttpClient} from "@angular/common/http";
import {SocketService} from "./socket.service";
import {map} from "rxjs/operators";
import {TokenStorageService} from "./token-storage.service";

const apiUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  subscriptions: Subscription[]=[]
  constructor(private http: HttpClient,private socketsService : SocketService, private tokenService: TokenStorageService) {
    // this.update$=new Subject<{dialogs: {user: User; message: Message}[]}>()
    // socketsService.message.subscribe(x=>{
    //
    // })
  }


  sendMessage(recipient:string,msg: string) {
    this.socketsService.sendMessage({to:recipient,content:msg,from: "",timestamp:null,id:null})
  }

  setMessageListener(listener:Function) {
    this.subscriptions.push(this.socketsService.message$.subscribe(message=>{
      console.log('message')
      listener(message)
    }))
  }


  getMessages(id:string):Observable<Message[]> {
    console.log("get")
    return this.http.get<any>(`${apiUrl}/dialog?id=${id}`).pipe(map(x=>x.messages))
  }

  destroy(){
    for(let sub of this.subscriptions)
      sub.unsubscribe()
  }



}

