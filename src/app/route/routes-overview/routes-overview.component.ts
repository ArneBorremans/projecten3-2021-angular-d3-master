import { Component, Inject, OnInit } from '@angular/core';
import { Route } from '../route';
import { MapDataService } from 'src/app/shared/services/map-data.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

/**
 * Routes overview component
 */
@Component({
  selector: 'app-routes-overview',
  templateUrl: './routes-overview.component.html',
  styleUrls: ['./routes-overview.component.css']
})
export class RoutesOverviewComponent implements OnInit {
  /**
   * De geselecteerde route
   */
  public static selectedRoute: Route = null
  /**
   * Alle routes
   */
  public routes: Route[]
  public errorMessage: string = "";

  constructor(private _mapDataS: MapDataService, private _router: Router, public translate: TranslateService) { }

  ngOnInit(): void {
    //Nog een handle error
    this._mapDataS.routes$
    .pipe(
      catchError(err => {
      this.showError(err);
      return EMPTY
    }))
    .subscribe(r => this.routes = r)

  }

  /**
   * @param route De geselecteerde route
   * navigeert naar edit route 
   */
  onSelect(route) {
    RoutesOverviewComponent.selectedRoute = route
    this._router.navigate([`/route/edit/${route.id}`])
  }

  onHover() {
    console.log("jow")
  }

  private showError(err: any) {
    if(err instanceof HttpErrorResponse){
      if(err.status >= 500){
        this.errorMessage = "Error.server error";
      } else{
        this.errorMessage = "Error.unexpected error";
        console.error(err);
      }
    } else{
      this.errorMessage = "Error.unexpected error";
      console.error(err);
    }
  }
}
