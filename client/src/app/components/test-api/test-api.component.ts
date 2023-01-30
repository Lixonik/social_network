import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent {
  userName: string = "";
  response: any;

  constructor(private http: HttpClient) {
  }

  search() {
    this.http.get(`http://api.github.com/users/${this.userName}`)
      .subscribe(response => {
        this.response = response
        console.log(this.response)
      })
  }
}
