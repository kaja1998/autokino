import {RouterModule,Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { FilmdetailsComponent } from './filmdetails/filmdetails.component';
import { StartComponent } from './home/start.component';
import { ProgrammComponent } from "./programm/programm.component";
import {KundenkontoComponent} from "./kundenkonto/kundenkonto.component";
import {KundenkontoBearbeitenComponent} from "./kundenkonto-bearbeiten/kundenkonto-bearbeiten.component";
import { KartenkaufenComponent } from './kartenkaufen/kartenkaufen.component';
import { AdminBereichComponent } from './admin-bereich/admin-bereich.component';

export const routes: Routes = [
    {path: '', component: StartComponent,},
    {path: 'home', component: StartComponent},
    {path: 'filmdetails/:filmtitel', component: FilmdetailsComponent},
    {path: 'login', component: LoginComponent,},
    {path: 'programm', component: ProgrammComponent},
    {path: 'kundenkonto', component: KundenkontoComponent,},
    {path: 'kundenkonto/bearbeiten', component: KundenkontoBearbeitenComponent,},
    {path: 'kartenkaufen', component: KartenkaufenComponent,},
    {path: 'adminBereich', component: AdminBereichComponent}
];
