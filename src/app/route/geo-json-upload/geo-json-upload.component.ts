import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Route } from '../route';
import { MapDataService } from 'src/app/shared/services/map-data.service';
import { RoutesOverviewComponent } from '../routes-overview/routes-overview.component';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { DateTimeAdapter } from 'ng-pick-datetime';

/**
 * GeoJson upload component
 */
@Component({
  selector: 'app-geo-json-upload',
  templateUrl: './geo-json-upload.component.html',
  styleUrls: ['./geo-json-upload.component.css']
})
export class GeoJsonUploadComponent implements OnInit {

  //TODO einddatum? 

  /**
   * Input geeft aan of de map geëdit kan worden
   */
  @Input() public editMode: boolean = false
  /**
   * True als de user zijn geojson file geupload is
   */
  public uploadDone: boolean = false
  /**
   * True als de user een nieuwe route aan het aanmaken is
   */
  public submitBusy: boolean = false
  /**
   * True als de user een nieuwe route heeft aangemaakt
   */
  public submitFinished: boolean = false
  /**
   * De geuploade geojson file
   */
  public uploadedGeoJson: JSON
  /**
   * Het id van de nieuw aangemaakte route
   */
  public routeId: number
  public routeForm: FormGroup
  public errorMessage: string = "";
  public tussenstopsUpdate: boolean = false

  constructor(
    private _mapDataS: MapDataService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private dateTimeAdapter: DateTimeAdapter<any>
  ) { }

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;

  ngOnInit(): void {
    this.routeForm = this._formBuilder.group({
      naam: ["", Validators.required],
      naamFrans: ["", Validators.required],
      start: ["", Validators.required],
      einde: ["", Validators.required],
      lengte: ["", Validators.required],
      public: ["", Validators.required],
      beschrijving: ["", Validators.required],
      beschrijvingFrans: ["", Validators.required],
      prijs: ["", [Validators.required, Validators.min(0)]]
    })
    if (this.editMode) this.isEditInit()
    this.translate.onTranslationChange.subscribe(lang => this.updateDateTimeFormat(lang));
    this.updateDateTimeFormat(this.translate.currentLang);
  }

  private updateDateTimeFormat(format: string): void{
    this.dateTimeAdapter.setLocale(format);
  }

  selectFiles(event): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert(this.translate.get('Ongeldig formaat'));
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = files;
      this.routeForm.markAsTouched();
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }

  /**
   * Upload geojson file
   * @param files file van het type geojson
   */
  onUpload(files: FileList) {
    var file: File = files.item(0);
    file.text().then(geoJson => {
      this.uploadDone = true
      this.uploadedGeoJson = JSON.parse(geoJson)
    })
  }

  uploadImages(): void {
    this._mapDataS.uploadFile(this.routeToEdit.id, this.selectedFiles)
      .subscribe();
  }

  /**
   * Maakt een nieuwe route aan a.d.h.v. de ingevulde form
   */
  onNewSubmit() {
    if (this.routeForm.get("start").value > this.routeForm.get("einde").value) {
      this.openSnackBar(this.translate.get('Startdatum moet voor de eindedatum liggen!'));
      return
    }
    this.submitBusy = true
    var naam = new Map<string, string>();
    naam.set("nl", this.routeForm.get("naam").value)
    naam.set("fr", this.routeForm.get("naamFrans").value)
    var beschrijving = new Map<string, string>();
    beschrijving.set("nl", this.routeForm.get("beschrijving").value)
    beschrijving.set("fr", this.routeForm.get("beschrijvingFrans").value)
    var route = new Route("", naam, this.routeForm.get("lengte").value, this.routeForm.get("public").value, new Date(this.routeForm.get("start").value), new Date(this.routeForm.get("einde").value), beschrijving, 0, null, this.routeForm.get("prijs").value)
    route.geoJson = this.uploadedGeoJson
    console.log(route)
    //Nog een catcherror
    this._mapDataS.newRoute$(route)
      .pipe()
      .subscribe(response => {
        this.routeId = response.id
        this.submitBusy = false
        this.submitFinished = true
      })
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: 4000,
      panelClass: ['snackbar'],
    });
  }

  /**
   * Edit de route aan a.d.h.v. het gewijzigde form
   */
  onEditSubmit() {
    this.submitBusy = true
    /*
    if (this.routeForm.get("start").value > this.routeForm.get("einde").value) {
      this.openSnackBar(this.translate.get('Startdatum moet voor de eindedatum liggen!'));
      return
    }
    */
    var naam = new Map<string, string>();
    naam.set("nl", this.routeForm.get("naam").value)
    naam.set("fr", this.routeForm.get("naamFrans").value)
    this.routeToEdit.name = naam
    this.routeToEdit.lengte = this.routeForm.get("lengte").value
    this.routeToEdit.openbaar = this.routeForm.get("public").value
    this.routeToEdit.start = new Date(this.routeForm.get("start").value)
    this.routeToEdit.einde = new Date(this.routeForm.get("einde").value)
    var beschrijving = new Map<string, string>();
    beschrijving.set("nl", this.routeForm.get("beschrijving").value)
    beschrijving.set("fr", this.routeForm.get("beschrijvingFrans").value)
    this.routeToEdit.beschrijving = beschrijving;
    this.routeToEdit.prijs = this.routeForm.get("prijs").value
    this.routeToEdit.geoJson = this.uploadedGeoJson != null ? this.uploadedGeoJson : null
    //Nog een catcherror
    this._mapDataS.updateRoute$(this.routeToEdit).subscribe(response => {
      this.routeId = response.id
      this.submitBusy = false
      this.submitFinished = true
      this.uploadedGeoJson != null ? location.reload() : ""
    })
    if(this.selectedFiles){
      this.uploadImages();
    }
  }

  /**
   * Als de route geëdit wordt: vult de form met de oude route gegevens
   */
  isEditInit() {
    this.routeForm.get("naam").setValue(this.routeToEdit.name.get("nl"))
    this.routeForm.get("naamFrans").setValue(this.routeToEdit.name.get("fr"))
    //Deze attributen worden nog niet uit de db geladen
    this.routeForm.get("public").setValue(this.routeToEdit.openbaar)
    this.routeForm.get("lengte").setValue(this.routeToEdit.lengte)
    this.routeForm.get("start").setValue(this.routeToEdit.start)
    this.routeForm.get("einde").setValue(this.routeToEdit.einde)
    this.routeForm.get("beschrijving").setValue(this.routeToEdit.beschrijving.get("nl"))
    this.routeForm.get("beschrijvingFrans").setValue(this.routeToEdit.beschrijving.get("fr"))
    this.routeForm.get("prijs").setValue(this.routeToEdit.prijs)
    this.routeForm.markAsUntouched()
  }

  /**
   * True als submit button disabled moet zijn
   */
  get submitButtonDisabled() {
    if (this.editMode) {
      return !this.routeForm.touched && !this.uploadDone && !this.tussenstopsUpdate ? true : false
    } else {
      return !this.uploadDone || !this.routeForm.valid ? true : false
    }
  }

  /**
   * Geeft de route die geëdit moet worden terug
   */
  get routeToEdit() {
    return RoutesOverviewComponent.selectedRoute
  }

  private showError(err: any) {
    if (err instanceof HttpErrorResponse) {

    }
  }

  get imagesLocation() {
    return `${environment.apiUrl}/route/${this.routeToEdit.id}/afbeeldingen`
  }

  tussenStopChange(event) {
    this.tussenstopsUpdate = event;
  }

  verwijderAfbeelding(naam: string, event): void {
    let button = event.target;
    this.translate.get("geo-json-upload.verwijderen bezig").subscribe(text => button.innerText = text);
    this._mapDataS.deleteFile(this.routeToEdit.id, naam)
      .pipe(
        catchError(e => {
          this.showError(e)
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.translate.get("geo-json-upload.verwijderd").subscribe(text => button.innerText = text);
    button.disabled = true;
  }
    );
}
}
