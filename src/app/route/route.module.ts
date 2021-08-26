import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoJsonUploadComponent } from './geo-json-upload/geo-json-upload.component';
import { MapComponent } from './map/map.component';
import { RouteEditComponent } from './route-edit/route-edit.component';
import { RoutesOverviewComponent } from './routes-overview/routes-overview.component';
import { TrackComponent } from './track/track.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './route-edit/delete-dialog/delete-dialog.component';
import { AdminGuard } from '../user/admin-guard';
import { NbChatModule, NbLayoutColumnComponent, NbLayoutComponent, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'edit/:id', component: RouteEditComponent, canActivate: [AdminGuard]  },
  { path: 'new', component: GeoJsonUploadComponent, canActivate: [AdminGuard]  },
  { path: 'track/:code', component: TrackComponent },
  { path: 'update/:id', component: GeoJsonUploadComponent, canActivate: [AdminGuard]  },
  { path: '', pathMatch: 'full', component: RoutesOverviewComponent, canActivate: [AdminGuard]  },
];

@NgModule({
  declarations: [GeoJsonUploadComponent, MapComponent, RouteEditComponent, RoutesOverviewComponent, TrackComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NbChatModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MapComponent
  ],
  entryComponents: [DeleteDialogComponent]
})
export class RouteModule { }
