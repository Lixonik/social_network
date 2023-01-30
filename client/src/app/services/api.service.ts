import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, retry, tap, throwError} from 'rxjs'
import { map } from 'rxjs/operators';


const apiUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }



  getAllUsers() : Observable<User[]> {
    return this.http.get(`${apiUrl}/users`).pipe(map((data:any)=>{
      let usersList = data;
      return usersList.map(function(user: any): User {
        return user;
      });
    }));
  }

  getUserById(): Observable<User> {
    return this.http.get<User>(`${apiUrl}/users`)
  }


  getFriends() {
    return this.http.get(`${apiUrl}/friends`).pipe(map((data:any)=>{
      let usersList = data;
      return usersList.map(function(user: any): User {
        return user;
      });
    }));
  }

  getNotFriends() {
    return this.http.get(`${apiUrl}/notFriends`).pipe(map((data:any)=>{
      let usersList = data;
      return usersList.map(function(user: any): User {
        return user;
      });
    }));
  }

  addFriend(userId: string) {
    console.log('add')
    return this.http.post(`${apiUrl}/addFriend/${userId}`, {}).subscribe()

  }

  deleteFriend(friendId: string) {
    return this.http.post(`${apiUrl}/deleteFriend/${friendId}`, {}).subscribe()
  }
}
