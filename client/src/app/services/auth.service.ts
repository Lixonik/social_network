import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:5000/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post( `${apiUrl}/login`, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  registration(form: any): Observable<any> {
    return this.http.post(`${apiUrl}/registration`, {
      email: form.email,
      password: form.password,
      surname: form.surname,
      name: form.name,
      patronimyc: form.patronimyc,
      birthday: form.birthday
    }, httpOptions);
  }

  getDialogs(){
    return
  }
}
