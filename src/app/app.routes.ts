import { Routes } from '@angular/router';
import { StartComponent } from './home/start.component';
import { ProgrammComponent } from './programm/programm.component';

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent,},
    {path: 'programm', component: ProgrammComponent},
];
