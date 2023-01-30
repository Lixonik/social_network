import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {PeopleComponent} from "./components/people/people.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MessengerComponent} from "./components/messenger/messenger.component";
import {DialogComponent} from "./components/dialog/dialog.component";
import {NewsComponent} from "./components/news/news.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'messenger', component: MessengerComponent},
  { path: 'news', component: NewsComponent},
  { path: 'users', component: UsersComponent},
  { path: 'dialog', component: DialogComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
