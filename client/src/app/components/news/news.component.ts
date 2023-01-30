import {Component, OnInit} from '@angular/core';
import Message from "../../models/Message";
import Post from "../../models/Post";
import {NewsService} from "../../services/news.service";
import {SocketService} from "../../services/socket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{

  postText:string=""
  news: Post[]=[]

  constructor(private newsService: NewsService, private socketService: SocketService, private route :ActivatedRoute) {
  }
  sendPost(): void {
    //this.messages.push({text:this.messageText,mine:true})
    this.newsService.sendPost(this.postText)
      // console.log(this.userId, this.messageText)
    this.postText=""
  }


  // ngOnInit(): void {
  //   this.socketService.login()
  //   this.route.queryParams.subscribe(params => {
  //     let id = params["id"]
  //     console.log(id)
  //     if (id) {
  //       this.userId = id
  //       this.messengerService.getMessages(id).subscribe(x => {
  //         this.messages = []
  //         this.messages.push(...x)
  //         console.log(this.messages)
  //       })
  //
  //     } else
  //       this.router.navigate(["/messages"])
  //   })
  //   this.messengerService.setMessageListener(() => {
  //     this.route.queryParams.subscribe(params=> {
  //       let id = params["id"]
  //       console.log(id)
  //       if (id) {
  //         this.userId = id
  //         this.messengerService.getMessages(id).subscribe(x => {
  //           this.messages = []
  //           this.messages.push(...x)
  //
  //           // this.socketService.getNewMessage().subscribe(x => this.messages.push({msg:x,mine:x.to.toString()===this.userId}))
  //
  //           console.log(this.messages)
  //         })
  //
  //       } else
  //         this.router.navigate(["/messages"])
  //     })
  //   })
  //   // })
  //
  //
  // }

  ngOnInit(): void {
    this.socketService.login()


    this.newsService.getNews().subscribe(x => {
      this.news = []
      this.news.push(...x)
    })

    this.newsService.setNewsListener(() => {
      this.newsService.getNews().subscribe(x => {
        this.news = []
        this.news.push(...x)
      })
    })
    // })


  }

}
