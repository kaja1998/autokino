import { Routes } from '@angular/router';
import { StartComponent } from './home/start.component';
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent,},
    {path: 'login', component: LoginComponent,},
];
