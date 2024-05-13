import { Routes } from '@angular/router';
import { StartComponent } from './home/start.component';
import {LoginComponent} from "./login/login.component";
import { FilmdetailsComponent } from './filmdetails/filmdetails.component';

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent},
    {path: 'filmdetails', component: FilmdetailsComponent},
    {path: 'login', component: LoginComponent,},
];
