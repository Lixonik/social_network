import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SocketService} from "./socket.service";
import {TokenStorageService} from "./token-storage.service";
import {Observable, Subscription} from "rxjs";
import Message from "../models/Message";
import {map} from "rxjs/operators";
import Post from "../models/Post";
import {User} from "../models/User";


const apiUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  subscriptions: Subscription[]=[]
  currentUser: User
  constructor(private http: HttpClient,private socketsService : SocketService, private tokenService: TokenStorageService) {
    // this.update$=new Subject<{dialogs: {user: User; message: Message}[]}>()
    // socketsService.message.subscribe(x=>{
    //
    // })
    this.currentUser = tokenService.getUser()
  }

  getNews():Observable<Post[]> {
    console.log("get")
    return this.http.get<any>(`${apiUrl}/news`).pipe(map(x=>x.news))
  }

  sendPost(postText: string) {
    this.socketsService.sendPost({content:postText,from: `${this.currentUser.surname} ${this.currentUser.name}`,timestamp:null,id:null})
  }

  setNewsListener(listener:Function) {
    this.subscriptions.push(this.socketsService.news$.subscribe(post=>{
      console.log('news!')
      listener(post)
    }))
  }

  destroy(){
    for(let sub of this.subscriptions)
      sub.unsubscribe()
  }
}
