import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isRegistrationFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.registration(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegistrationFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRegistrationFailed = true;
      }
    );
  }

}
