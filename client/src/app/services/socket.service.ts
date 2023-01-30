import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import Message from "../models/Message";
import {Subject} from "rxjs";

import Post from "../models/Post";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  message$ : Subject<Message>
  news$ : Subject<Post>

  connected:boolean=false;
  constructor(private socket: Socket) {
    console.log("create 1")
    this.message$=new Subject<Message>();
    this.news$=new Subject<Post>();
  }

  login() {
    if( this.message$.closed) {
      console.log("create 2")
      this.message$ = new Subject<Message>();
    }

    if( this.news$.closed) {
      console.log("create 3")
      this.news$ = new Subject<Post>();
    }

    if(this.connected) return
    this.socket.connect()
    this.connected=true;

    this.socket.on('user_message', (message: Message) =>{
      this.message$.next(message);
    });

    this.socket.on('user_news', (post: Post) =>{
      this.news$.next(post);
      console.log(post, '<---------')
    });
  }

  logout() {
    this.connected=false;
    this.socket.disconnect()
    this.message$.unsubscribe()
    this.news$.unsubscribe()
  }

  sendMessage(msg:Message) {
    // console.log(msg)
    this.socket.emit('user_message', msg);
  }

  sendPost(post: Post) {
    console.log("---->", post)
    this.socket.emit('user_news', post);
  }

  get message(){
    return this.message$
  }

  get news(){
    return this.news$
  }
}
