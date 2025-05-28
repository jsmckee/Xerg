import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TanksAndZombiesComponent } from './tanks-and-zombies/tanks-and-zombies.component';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
    { path: '', component: DemoComponent, pathMatch: 'full' },
    { path: 'home', component: DemoComponent, pathMatch: 'full' },
    { path: 'tanks', component: TanksAndZombiesComponent, pathMatch: 'full' },
];
