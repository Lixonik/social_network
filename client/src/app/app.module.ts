import * as Rollbar from 'rollbar';

import {ErrorHandler, Inject, Injectable, InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PeopleComponent } from './components/people/people.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TestApiComponent } from './components/test-api/test-api.component';
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { MessengerComponent } from './components/messenger/messenger.component';
import { DialogComponent } from './components/dialog/dialog.component';

import {SocketIoModule} from "ngx-socket-io";
import {RouterOutlet} from "@angular/router";
import { NewsComponent } from './components/news/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import { UsersComponent } from './components/users/users.component';


const rollbarConfig = {
  accessToken: 'ad5ead79d3a24da9855f883a57ca970c',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err:any) : void {
    this.rollbar.error(err.originalError || err);
  }
}
export const RollbarService = new InjectionToken<Rollbar>('rollbar');

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    PeopleComponent,
    NotFoundComponent,
    RegistrationComponent,
    TestApiComponent,
    DialogComponent,
    MessengerComponent,
    NewsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot({url: 'http://localhost:3100', options: {withCredentials: true}}),
    RouterOutlet,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatLineModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
