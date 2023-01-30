import {

  Component,
  OnChanges, OnDestroy,
  OnInit,
} from '@angular/core';
import Message from "../../models/Message";
import {MessengerService} from "../../services/messenger.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";
import {Location} from "@angular/common";

import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnChanges {
  messageText:string=""
  messages: Message[]=[]
  user: User
  userId: string | null


  constructor(private socketService: SocketService,private location: Location,private messengerService : MessengerService,private tokenService : TokenStorageService,private route: ActivatedRoute,private router :Router) {
    this.userId = null
    console.log("dialog created")
  }

  back() :void {
    this.location.back()
  }

  sendMessage(): void {
    //this.messages.push({text:this.messageText,mine:true})
    if(this.userId) {
      this.messengerService.sendMessage(this.userId, this.messageText)
      // console.log(this.userId, this.messageText)
    }
    this.messageText=""
  }


  ngOnInit(): void {
    this.socketService.login()
    this.route.queryParams.subscribe(params => {
      let id = params["id"]
      console.log(id)
      if (id) {
        this.userId = id
        this.messengerService.getMessages(id).subscribe(x => {
          this.messages = []
          this.messages.push(...x)
          console.log(this.messages)
        })

      } else
        this.router.navigate(["/messages"])
      })
      this.messengerService.setMessageListener(() => {
        this.route.queryParams.subscribe(params=> {
          let id = params["id"]
          console.log(id)
          if (id) {
            this.userId = id
            this.messengerService.getMessages(id).subscribe(x => {
              this.messages = []
              this.messages.push(...x)

              // this.socketService.getNewMessage().subscribe(x => this.messages.push({msg:x,mine:x.to.toString()===this.userId}))

              console.log(this.messages)
            })

          } else
            this.router.navigate(["/messages"])
        })
      })
  // })


  }



  ngOnChanges(): void {

  }

  ngOnDestroy(): void {
    this.messengerService.destroy()
  }
}
