import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BetalingBevestigdComponent } from './register-route/register-route-item/inschrijven-dialog/betaling-bevestigd/betaling-bevestigd.component';
import { RegisterRouteComponent } from './register-route/register-route.component';
import { TrackConfirmComponent } from './track-confirm/track-confirm.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'route', loadChildren: () => import('./route/route.module').then((m) => m.RouteModule)},
  { path: 'home', component: HomeComponent },
  { path: 'track', component: TrackConfirmComponent },
  { path: 'signup', component: RegisterRouteComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'betalingResult', component: BetalingBevestigdComponent },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
