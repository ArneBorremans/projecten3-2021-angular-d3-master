import { HttpErrorResponse } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MapDataService } from 'src/app/shared/services/map-data.service';
import { RoutesOverviewComponent } from '../routes-overview/routes-overview.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

/**
 * Route edit component
 */
@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {
  /**
   * De route die geëdit wordt
   */
  public routeId: number;
  public errorMessage: string = "";

  /**
   * 
   * @param _route 
   * @param _mapDataS 
   * @param _dialog 
   */
  constructor(
    private _route: ActivatedRoute, private _mapDataS: MapDataService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.routeId = +params['id'];
      if (this.routeToEdit == null) this._mapDataS.route$(this.routeId)
      .pipe(
        catchError(err => {
          this.showError(err);
          return EMPTY;
        })
      )
      .subscribe(response => {
        console.log(response)
        RoutesOverviewComponent.selectedRoute = response
      })
    });

  }

  /**
   * Geeft de route die geëdit moet worden terug
   */
  get routeToEdit() {
    return RoutesOverviewComponent.selectedRoute
  }

  /**
   * Opent dialog met een deleteDialogComponent in om de route te verwijderen
   */
  onDelete() {
    this._dialog.open(DeleteDialogComponent)
  }
  
  private showError(err: any) {
    if(err instanceof HttpErrorResponse){
      if(err.status >= 500){
        this.errorMessage = "Error.server error";
      } else if(err.status === 404){
        this.errorMessage = "map.niet gevonden"
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
