import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MapDataService } from 'src/app/shared/services/map-data.service';
import { RoutesOverviewComponent } from '../../routes-overview/routes-overview.component';

/**
 * delete dialog component
 */
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  /**
   * True als de route gedelete wordt
   */
  public busyVlag: boolean

  /**
   * 
   * @param dialogRef 
   * @param _mapDataS 
   * @param _router 
   */
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, private _mapDataS: MapDataService, private _router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Sluit dialog
   */
  onCancel() {
    this.dialogRef.close()
  }

  /**
   * Delete de route en redirect naar route overzicht
   */
  onDelete() {
    this.busyVlag = true
    //Nog een catcherror
    this._mapDataS.deleteRoute$(RoutesOverviewComponent.selectedRoute).subscribe(response => {
      this.busyVlag = false
      this.dialogRef.close()
      this._router.navigate(["/route"])
    })
  }

}
