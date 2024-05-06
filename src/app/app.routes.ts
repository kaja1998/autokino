import { Routes } from '@angular/router';
import { StartComponent } from './home/start.component';

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent,},
];
