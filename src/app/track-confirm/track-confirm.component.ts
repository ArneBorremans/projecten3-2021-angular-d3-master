import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Loper } from 'src/app/loper/loper.model';
import { LoperDataService } from 'src/app/shared/services/loper-data.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

/**
 * Track confirm component
 */
@Component({
  selector: 'app-track-confirm',
  templateUrl: './track-confirm.component.html',
  styleUrls: ['./track-confirm.component.css']
})
export class TrackConfirmComponent implements OnInit {
  lopers: Loper[]
  loading: boolean = true
  loadingMore: boolean
  private _lopersPage: number = 0

  constructor(private _loperDataS: LoperDataService, private router: Router, private _dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._loperDataS.publicLopers$(this._lopersPage).subscribe(l => {
      this.lopers = l
      console.log(l)
      this.loading = false
    });
  }

  onSearch() {
    this._dialog.open(SearchDialogComponent)
  }

  onLoadMore() {
    this.loadingMore = true
    this._lopersPage++
    this._loperDataS.publicLopers$(this._lopersPage).subscribe(l => {
      this.lopers = this.lopers.concat(l)
      this.loadingMore = false
    });
  }
}
