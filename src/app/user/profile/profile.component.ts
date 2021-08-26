import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Loper } from 'src/app/loper/loper.model';
import { RouteLoper } from 'src/app/register-route/route-loper';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoperDataService } from 'src/app/shared/services/loper-data.service';
import { Inschrijving, UserInfo } from './UserInfo';

/**
 * Profile component
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public errorMsg: string = "";
  public ui: UserInfo
  public inschrijvingen: Inschrijving[]
  public routeLopers: RouteLoper[]
  public zichtbaarheid: string
  public datum = Date()
  displayedColumns: string[] = ['geregistreerdOp', 'routeNaam', 'startDatumEnUur', 'eindDatumEnUur', 'zichtbaarheid'];

  constructor(private _loperDataS: LoperDataService, private _formBuilder: FormBuilder, public translate: TranslateService) { }

  ngOnInit(): void {
    this._loperDataS.loper$()
    .pipe(
      catchError(err => {
        this.showError(err);
        return EMPTY;
      })
    )
    .subscribe(l => {
      this.ui = l
      console.log(this.ui)
    })
  }

  /**
   * Update zichtbaarheid van inschrijving
   * @param inschrijving 
   * @param value 
   */
  updateZichtbaarheid(inschrijving: any, value: number) {
    console.log(value)
    var temp = new Inschrijving(value, inschrijving._geregistreerdOp, inschrijving._startDatumEnUur,
      inschrijving._eindDatumEnUur, inschrijving._routeNaam, inschrijving._loperid, inschrijving._routeid)
    this._loperDataS.updateZichtbaarheid$(temp).subscribe();
  }

  private showError(err: any){
    if(err instanceof HttpErrorResponse){
      if(err.status >= 500){
        this.errorMsg = "Error.server error";
      } else if(err.status === 404){
        this.errorMsg = "Profile.not found";
      } else{
        this.errorMsg = "Error.unexpected error";
        console.error(err);
      }
    } else{
      this.errorMsg = "Error.unexpected error";
      console.error(err);
    }
  }
}
