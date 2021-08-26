import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoperDataService } from 'src/app/shared/services/loper-data.service';
import { Route } from 'src/app/route/route';
import { MatDialog } from '@angular/material/dialog';
import { InschrijvenDialogComponent } from './inschrijven-dialog/inschrijven-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

/**
 * register route item component
 */
@Component({
  selector: 'app-register-route-item',
  templateUrl: './register-route-item.component.html',
  styleUrls: ['./register-route-item.component.css'],
})
export class RegisterRouteItemComponent implements OnInit {
  
  /**
   * Route waarvoor de inschrijving getoont wordt
   */
  @Input() route: Route;

  imageObject: Array<object> = [
  ];
  
  /**
   * Geeft aan of de loper ingeschreven is of niet 
   */
  ingeschreven$ = new BehaviorSubject<Boolean>(false);

  /**
   * 
   * @param _router 
   * @param _loperData 
   * @param _authenticationService 
   * @param dialog 
   * @param _snackBar 
   */
  constructor(
    private _router: Router,
    private _loperData: LoperDataService,
    private _authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.afbeeldingen.forEach(afbeelding => this.imageObject.push({thumbImage: `${this.imagesLocation}/${afbeelding}`}))
    this._loperData.ingeschreven$(this.route.id).subscribe((response) => {
      this.ingeschreven$.next(response);
      console.log(response)
    });
  }

  /**
   * Als de user aangemeld is en nog niet ingeschreven opent de inschrijven dialog
   * Als de user aangemeld is en wel al ingeschreven schrijft het de user uit
   */
  openDialog() {
    if (!this._authenticationService.token) {
      this.openSnackBar(this.translate.instant('Register-route-item.U moet zich eerst aanmelden'));
      AuthenticationService.redirectUrl = '/signup';
      this._router.navigate(['/login']);
    } else {
      if (!this.ingeschreven$.value) {
        // inscrhijven
        const dialogRef = this.dialog.open(InschrijvenDialogComponent, {
          // height: '35rem',
          // width: '50rem',
          data: { route: this.route },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
          if (result == true) {
            this.ingeschreven$.next(true);
            this.openSnackBar(this.translate.instant('Register-route-item.U bent ingeschreven voor ') + this.route.name + '!');
          } else {
            this.openSnackBar(this.translate.instant('Register-route-item.Er is iets mis gegaan met uw registratie.'));
          }
        });
      } else {
        // uitschrijven
        this._loperData.deleteRegistratieRoute(this.route.id);
        this.ingeschreven$.next(false);
        this.openSnackBar(this.translate.instant(this.translate.instant('Register-route-item.U bent uitgeschreven voor ') + this.route.name.get(this.translate.currentLang) + '.'));
      }
    }
  }

  /**
   * Opent een sneakbar met meegegeven message
   * @param message de message die je wilt weergeven
   */
  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['snackbar'],
    });
  }

  get imagesLocation() {
    return `${environment.apiUrl}/route/${this.route.id}/afbeeldingen`
  }
}
