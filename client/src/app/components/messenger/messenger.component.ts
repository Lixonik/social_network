import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit{
  users: User[]
  currentUser: User

  constructor(private apiService: ApiService, private tokenService: TokenStorageService) {
    this.currentUser = tokenService.getUser()
  }


  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe({next:(data: User[]) => this.users=data});
  }

}
