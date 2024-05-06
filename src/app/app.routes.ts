import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent,},
];
