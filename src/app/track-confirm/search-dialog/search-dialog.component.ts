import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loper } from 'src/app/loper/loper.model';
import { LoperDataService } from 'src/app/shared/services/loper-data.service';

/**
 * Search dialog component
 */
@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  public selectedLoper: Loper;
  public filteredLopers: Loper[];
  public track: FormGroup;
  loading: boolean

  constructor(private fb: FormBuilder, private _loperDataS: LoperDataService, private router: Router, private _ref: MatDialogRef<SearchDialogComponent>, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.track = this.fb.group({
      nameParticipant: [''],
      surnameParticipant: [''],
      locationParticipant: ['']
    });
  }

  onSubmit() {
    this.loading = true
    let achternaam = this.track.value.nameParticipant;
    let voornaam = this.track.value.surnameParticipant;
    let gemeente = this.track.value.locationParticipant;
    if (achternaam == "") achternaam = "empty";
    if (voornaam == "") voornaam = "empty";
    if (gemeente == "") gemeente = "empty";
    this.filteredLopers = []

    if (achternaam == "empty" || voornaam == "empty" || gemeente == "empty") {
      //nog een catcherror
      this._loperDataS.searchPublicLopers$(voornaam, achternaam, gemeente).pipe(
        catchError(err => {
          this.loading = false;
          this.showError(err);
          return EMPTY;
        })
      ).subscribe(l => {
        this.filteredLopers = l
        if(this.filteredLopers.length < 1) this.openSnackBar("{{search-dialog | translate}}")
        this.loading = false
      });
    } else {
      this._loperDataS.searchHiddenLopers$(voornaam, achternaam, gemeente).pipe(
        catchError(err => {
          this.loading = false
          this.openSnackBar("Persoon niet gevonden!")
          return EMPTY
        })
      ).subscribe(l => {
        this.filteredLopers.push(l)
        if(this.filteredLopers.length < 1) this.openSnackBar("Persoon niet gevonden!")
        this.loading = false
      });
    }
  }

  onSelect(loper: Loper): void {
    this.selectedLoper = loper
    this._ref.close()
    this.router.navigateByUrl(`/route/track/${loper.linkCode}`, {})
  }

  openSnackBar(message) {
    this._snackBar.open(message, "", {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }

  private showError(err: any) {
    if(err instanceof HttpErrorResponse){

    } else {
      this.openSnackBar("{{Error.unexpected error}}");
      console.error(err);
    }
  }
}
