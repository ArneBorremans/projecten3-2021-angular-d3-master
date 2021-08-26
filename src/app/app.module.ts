import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserModule } from './user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRouteComponent } from './register-route/register-route.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RegisterRouteItemComponent } from './register-route/register-route-item/register-route-item.component';
import { RouteModule } from './route/route.module';
import { TrackConfirmComponent } from './track-confirm/track-confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './user/interceptor.index';
import { NgImageSliderModule } from 'ng-image-slider';
import { FooterComponent } from './footer/footer.component';
import { InschrijvenDialogComponent } from './register-route/register-route-item/inschrijven-dialog/inschrijven-dialog.component';
import { LoperComponent } from './loper/loper/loper.component';
import { SearchDialogComponent } from './track-confirm/search-dialog/search-dialog.component';
import { NbChatModule, NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BetalingBevestigdComponent } from './register-route/register-route-item/inschrijven-dialog/betaling-bevestigd/betaling-bevestigd.component';
import { ReglementComponent } from './register-route/register-route-item/reglement/reglement.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MainNavComponent, PageNotFoundComponent, TrackConfirmComponent, RegisterRouteComponent, RegisterRouteItemComponent, FooterComponent, InschrijvenDialogComponent, LoperComponent, SearchDialogComponent, BetalingBevestigdComponent, ReglementComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgImageSliderModule,
    UserModule,
    FormsModule,
    NbChatModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouteModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [InschrijvenDialogComponent, SearchDialogComponent, ReglementComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}