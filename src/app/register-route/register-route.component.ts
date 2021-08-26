import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { MapDataService } from 'src/app/shared/services/map-data.service';
import { Route } from 'src/app/route/route';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * register route component
 */
@Component({
  selector: 'app-register-route',
  templateUrl: './register-route.component.html',
  styleUrls: ['./register-route.component.css'],
})
export class RegisterRouteComponent implements OnInit {
  /**
   * Bevat alle routes van alle afstanden
   */
  public routes: Route[];
  /**
   * Bevat alle routes van 1 afstand
   */
  public filteredRoutes: Route[];

  public errorMessage: string = "";
  /**
   * Houd bij welke afstanden er routes hebben
   */
  public routesExist: boolean[];


  /**
   * 
   * @param _mapDataS 
   */
  constructor(private _mapDataS: MapDataService) {}

  ngOnInit(): void {
    //Nog een handle error en een loading animatie
    this.routesExist = [false, false, false]
    this._mapDataS.publicRoutes$
    .pipe(
      catchError(err => {
        this.showError(err);
        return EMPTY;
      })
    )
    .subscribe(r => {
      this.routes = r;
      this.showRoutesS();
      this.showRoutesM();
      this.showRoutesL();
      this.routesExist[2] ? this.showRoutesL() : null;
      this.routesExist[1] ? this.showRoutesM() : null;
      this.routesExist[0] ? this.showRoutesS() : null;
    });
  }

  //Lazy oplossing (?)
  /**
   * Toont alle routes voor lengte 25
   */
  public showRoutesS() {
    this.filteredRoutes = this.routes.filter(function (item) {
      return item.lengte === 25;
    });
    this.routesExist[0] = this.filteredRoutes.length > 0 ? true : false;
  }

  /**
   * Toont alle routes voor lengte 50
   */
  public showRoutesM() {
    this.filteredRoutes = this.routes.filter(function (item) {
      return item.lengte === 50;
    });
    this.routesExist[1] = this.filteredRoutes.length > 0 ? true : false;
  }

  /**
   * Toont alle routes voor lengte 100
   */
  public showRoutesL() {
    this.filteredRoutes = this.routes.filter(function (item) {
      return item.lengte === 100;
    });
    this.routesExist[2] = this.filteredRoutes.length > 0 ? true : false;
  }
  
  private showError(err: any){
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
