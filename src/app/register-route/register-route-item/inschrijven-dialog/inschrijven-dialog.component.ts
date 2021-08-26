import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoperDataService } from 'src/app/shared/services/loper-data.service';
import { Route } from 'src/app/route/route';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ReglementComponent } from '../reglement/reglement.component';
import { TranslateService } from '@ngx-translate/core';

/**
 * Inschrijven dialog component
 */
@Component({
  selector: 'app-inschrijven-dialog',
  templateUrl: './inschrijven-dialog.component.html',
  styleUrls: ['./inschrijven-dialog.component.css'],
})
export class InschrijvenDialogComponent implements OnInit {
  /**
   * Geeft volgstatus weer
   */
  public volger: number = 0;
  /**
   * Geeft weer of de user een Tshirt wenst
   */
  tshirtVlag: boolean = true;
  /**
   * Geeft de gekozen maat weer; default M
   */
  tshirtMaat: string = 'M';

  /**
   * @param data Route waarvoor user wilt inschrijven
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { route: Route },
    public dialogRef: MatDialogRef<InschrijvenDialogComponent>,
    private _loperDataService: LoperDataService,
    private _router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
  }

  /**
   * Geeft de uitleg van de users gekozen tracking manier terug
   */
  get trackingZin() {
    switch (Number(this.volger)) {
      case 1:
        return this.translate.instant('inschrijven-dialog.Hierdoor zal u op deze website door iedereen kunnen gevolgd worden.');
      case 2:
        return this.translate.instant('inschrijven-dialog.Hierdoor zal u op deze website door iedereen die uw voornaam, naam en gemeente kent, kunnen gevolgd worden.');
      case 3:
        return this.translate.instant('inschrijven-dialog.Hierdoor zal u een deelbare link ontvangen waarmee u kan gevolgd worden.');
      case 4:
        return this.translate.instant('inschrijven-dialog.Hierdoor zal niemand u kunnen volgen.');
      default:
        return '';
    }
  }

  /**
   * Geeft de users gekozen tracking manier terug
   */
  get trackingZinOverzicht() {
    switch (Number(this.volger)) {
      case 1:
        return this.translate.instant('inschrijven-dialog.Iedereen kan mij volgen.');
      case 2:
        return this.translate.instant('inschrijven-dialog.Iedereen die mijn naam, voornaam en adres kent, kan mij volgen.');
      case 3:
        return this.translate.instant('inschrijven-dialog.Alleen de mensen die ik kies kunnen mij volgen (deelbare link wordt na betaling doorgestuurd).');
      case 4:
        return this.translate.instant('inschrijven-dialog.Niemand kan mij volgen.');
      default:
        return '';
    }
  }

  /**
   * Geeft de users gekozen tshirt actie terug
   */
  get tshirtZin() {
    if (this.tshirtVlag) {
      return this.translate.instant('inschrijven-dialog.Ik wens een T-shirt van Damiaanactie maat') + this.tshirtMaat +  '(€ 15).';
    }
    this.tshirtMaat = 'GEEN';
    return this.translate.instant('inschrijven-dialog.Ik wens geen T-shirt.');
  }

  /**
   * Registreert user voor route en sluit dialog
   */
  betaalKlik() {
    this._loperDataService
      .registreerVoorRoute$(
        this.data.route.id,
        this.tshirtMaat,
        Number(this.volger)
      )
      .subscribe((response) => {
        var taal
        switch (this.translate.currentLang.trim()) {
          case "nl": taal = "nl_BE"; break;
          case "fr": taal = "fr_FR"; break;
        }
        window.location.href = response.link + '?taal=' + taal
      });
  }

  openReglement() {
    const dialogRef = this.dialog.open(ReglementComponent, {
          height: '35rem',
          width: '50rem',
    })
  }
}
