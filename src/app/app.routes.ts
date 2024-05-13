import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { FilmdetailsComponent } from './filmdetails/filmdetails.component';
import { StartComponent } from './home/start.component';
import { ProgrammComponent } from "./programm/programm.component";

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent},
    {path: 'filmdetails', component: FilmdetailsComponent},
    {path: 'login', component: LoginComponent,},
    {path: 'programm', component: ProgrammComponent},
];
