import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {ApiService} from "./services/api.service";
import {SocketService} from "./services/socket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private role: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  name: string;

  constructor(private tokenStorageService: TokenStorageService, private apiService: ApiService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      console.log(this.role)

      this.showAdminBoard = this.role.includes('Admin');

      this.name = user.name;

      this.socketService.login()
    }
    this.apiService.getAllUsers().subscribe({
      next: () => {
        // this.socketService.login()
      }
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.socketService.logout()
    window.location.reload();
  }
}
