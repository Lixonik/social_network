import { Component } from '@angular/core';
import {User} from "../../models/User";
import {ApiService} from "../../services/api.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  friends: User[]
  notFriends: User[]

  currentUser: User

  constructor(private apiService: ApiService, private tokenService: TokenStorageService) {
      this.currentUser = tokenService.getUser()
  }

  ngOnInit(): void {
    this.apiService.getFriends().subscribe({next:(data: User[]) => this.friends=data});
    this.apiService.getNotFriends().subscribe({next:(data: User[]) => this.notFriends=data});
  }

  addFriend(userId: string) {
    this.apiService.addFriend(userId)
    this.reloadPage()
  }

  deleteFriend(friendId: string) {
    this.apiService.deleteFriend(friendId)
    this.reloadPage()
  }

  reloadPage() {
    window.location.reload();
  }

}
