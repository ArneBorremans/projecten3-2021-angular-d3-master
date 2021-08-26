import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Subject, combineLatest, EMPTY } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { MapDataService } from 'src/app/shared/services/map-data.service';
import { environment } from 'src/environments/environment';
import { IGeoJson, Point } from '../mapPoints';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpErrorResponse } from '@angular/common/http';
import { route } from 'src/app/shared/mockdata/mock-map-data';

/**
 * Map component
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() public isEdit: Boolean;
  @Input() public routeId: number;
  @Input() public locatie$: Subject<number[]>;

  @Output() public updateStatus = new EventEmitter<boolean>();

  private static readonly PRECISION: number = 0.00005;

  public orderedPoints: Point[][] = [];
  public points: Point[] = [];
  private _geoJson;
  private _updatePoint$ = new Subject<Point>();
  public errorMessage: string = '';

  public standaardFaciliteiten = ['toilet', 'eten'];
  faciliteitenFC = new FormControl();
  separatorKeyCodes = [ENTER];
  public divId;

  public pointNaamForm: FormGroup;

  //leaflet objects
  private _map;
  private _drawnRoute;
  private _markedRoute;

  private startIcon = L.icon({
    iconUrl: '/assets/images/startIcon.png',

    iconSize: [19, 19], // size of the icon
    iconAnchor: [11, 18], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  private finishIcon = L.icon({
    iconUrl: '/assets/images/finishFlag.png',

    iconSize: [19, 19], // size of the icon
    iconAnchor: [11, 18], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  constructor(
    private _mapDataService: MapDataService,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pointNaamForm = this._fb.group({
      pointNaam: ['', Validators.required],
    });

    //Kijken of het id van de route is meegegven via de url of de @Input()
    this.route.params.subscribe((params) => {
      this.routeId = +params['id'] > 0 ? +params['id'] : this.routeId;
    });
    // Elke map uit route lijst een uniek id geven, anders wordt de map overschreven
    this.divId = this.isEdit ? 'mapEdit' : 'map' + this.routeId;
    console.log(this.divId)


    this.drawMap();
  }

  private drawMap() {
    const route$ = this._mapDataService.routeGeoJson$(this.routeId)
      .pipe(
        catchError(err => {
          this.showError(err);
          return EMPTY;
        })
      );
    const points$ = this._mapDataService.getCheckpoints$(this.routeId)
      .pipe(
        catchError(err => {
          this.showError(err);
          return EMPTY;
        })
      );
    //sync gets
    combineLatest([route$, points$])
      .pipe(
        map(([route$, points$]) => ({
          route: route$,
          points: points$,
        }))
      )
      .subscribe((vars) => {
        this._geoJson = vars.route;
        const retrievedPoints = this.routeId == 0 ? [] : vars.points;
        this.initMap();
        //draw route
        //nog een catcherror
        this._drawnRoute = L.geoJSON(this._geoJson, { weight: 5 });
        this._drawnRoute.addTo(this._map);
        //draw points
        this.points = this.points; //<- Bug?
        this.points = [];
        retrievedPoints.forEach((p) => this.addPoint(p));
        // Als je in edit modus zit kan je punten toevoegen en verwijderen
        if (this.isEdit) {
          this.turnPointAddOn();
        }

        L.marker(
          [
            this._geoJson.geometry.coordinates[
            this._geoJson.geometry.coordinates.length - 1
            ][1],
            this._geoJson.geometry.coordinates[
            this._geoJson.geometry.coordinates.length - 1
            ][0],
          ],
          { icon: this.finishIcon }
        )
          .addTo(this._map)
          .bindTooltip('Einde wandeling');
        L.marker(
          [
            this._geoJson.geometry.coordinates[0][1],
            this._geoJson.geometry.coordinates[0][0],
          ],
          { icon: this.startIcon }
        )
          .addTo(this._map)
          .bindTooltip('Start wandeling');
        if (!this.isEdit && this.locatie$ !== null)
          this.locatie$.subscribe(locatie => this.updateLocation(locatie));
      });
    //Listener for updating points to backend
    this._updatePoint$
      .pipe(
        tap((_) => console.log('Aan het opslaan')),
        map((point) =>
          this._mapDataService
            .updatePoints$(this.routeId, point)
            .subscribe((point) => {
              console.log('punt id: ' + point.id + ' : upgedate');
            })
        ),
        catchError((err) => {
          this.showError(err);
          return EMPTY;
        })
      )
      .subscribe((_) => {
        console.log('Route opgeslagen');
        //Geo-json-upload vertellen dat de map gewijzigd is
        this.updateStatus.emit(true);
      });
  }

  /*
  Berekend afstand tussen 2 punten op de oppervlakte van een bol op basis van hun lengte-en breedtegraden.
  */
  private haversine([lonA, latA], [lonB, latB]) {
    const { PI, sin, cos, atan2 } = Math,
      r = PI / 180,
      R = 6371,
      deltaLat = (latB - latA) * r,
      deltaLon = (lonB - lonA) * r,
      a =
        sin(deltaLat / 2) ** 2 +
        cos(cos(latB * r) * latA * r) * sin(deltaLon / 2) ** 2,
      c = 2 * atan2(a ** 0.5, (1 - a) ** 0.5),
      d = R * c;
    return d;
  }

  updateLocation(locatie: number[]): void {
    if (locatie[0] && locatie[1]) {
      var ref: [number, number] = [locatie[1], locatie[0]];
      var afstanden = this._geoJson.geometry.coordinates.map((r) => {
        const distance = this.haversine(r, ref);
        return distance;
      });

      var dichtste = afstanden.reduce((a, b) => Math.min(a, b));
      var index = afstanden.findIndex((a) => a == dichtste);
      var afgelegdeRoute = this._geoJson.geometry.coordinates.slice(
        0,
        index
      );
      var myLines = {
        type: 'LineString',
        coordinates: afgelegdeRoute,
      };
      if (this._markedRoute)
        this._markedRoute.remove();
      this._markedRoute = L.geoJSON(myLines, {
        weight: 8,
        color: '#ea2247',
      });
      this._markedRoute.addTo(this._map);
    }
  }

  /**
   * Voegt punt to aan de map
   * @param point toe te voegen punt
   */
  private addPoint(point: Point) {
    const route = this._geoJson.geometry.coordinates;
    point.color = this.getRandomColor();
    const plaats = this.vindLijstuk(point);
    this.orderedPoints[plaats] ? this.orderedPoints[plaats].push(point) : this.orderedPoints[plaats] = [point];
    this.orderedPoints[plaats].sort((A, B) =>
      this.berekenAfstand([A.lon, A.lat], route[plaats]) - this.berekenAfstand([B.lon, B.lat], route[plaats])
    );
    this.points = [];
    this.orderedPoints.forEach(points => {
      if (points) {
        this.points.push(...points);
      }
    });
    console.log(this.points);
    let marker = L.circle([point.lat, point.lon], {
      radius: 30,
      fillOpacity: 1,
      color: point.color,
      bubblingMouseEvents: false,
    }); /*.bindTooltip(this._i, 
    {
        permanent: true, 
        direction: 'right'
    });
    */

    // als je in edit modus zit kan je een punt verwijderen door er op te klikken
    if (this.isEdit) {
      marker.on('click', () => {
        this.orderedPoints[plaats].splice(
          this.orderedPoints[plaats].findIndex((p) => p === point),
          1
        );
        this.points.splice(
          this.points.findIndex((p) => p === point),
          1
        );
        this._mapDataService
          .deletePoint$(this.routeId, point.id)
          .subscribe((response) => {
            marker.remove();

            //Geo-json-upload vertellen dat de map gewijzigd is
            this.updateStatus.emit(true);
          });
      });
    } else {
      //configure popup
      //TODO: A next sprint?(was nice to have)
      // marker = marker.bindPopup(() => {
      //   let string = '';
      //   for (let property in point.properties) {
      //     string +=
      //       '<b>' + property + '</b>: ' + point.properties[property];
      //   }
      //   return string;
      // });
    }
    marker.addTo(this._map).bindTooltip(point.naam);
  }

  /**
   * Initialiseert de map. Tekent de map en Locatie
   */
  private initMap() {
    //initialize leaflet map object
    this._map = L.map(this.divId, {
      center: [
        this._geoJson.geometry.coordinates[0][1],
        this._geoJson.geometry.coordinates[0][0],
      ],
      zoom: 15,
    });

    //draw map
    L.tileLayer(environment.map.tileset, {
      maxZoom: 19,
      attribution: environment.map.attribution,
    }).addTo(this._map);
  }

  private turnPointAddOn(): void {
    this._drawnRoute.on('click', (e) => {
      let pointToAdd = new Point(
        'naam van punt',
        'addres is hardcoded',
        e.latlng.lat,
        e.latlng.lng,
        []
      );
      this._mapDataService
        .newPoints$(this.routeId, pointToAdd)
        .subscribe((punt) => {
          this.addPoint(punt);
          //Geo-json-upload vertellen dat de map gewijzigd is
          this.updateStatus.emit(true);
        });
    });
  }

    /**
     * Voegt een faciliteit to aan een punt 
     * @param event 
     * @param punt Het punt waar de faciliteit toegevoegt moet worden
     */
  addFaciliteit(event: MatChipInputEvent, punt: Point) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      punt.addFaciliteit(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.faciliteitenFC.setValue(null);
    this._updatePoint$.next(punt);
  }


  addFaciliteitAutocomplete(event: MatAutocompleteSelectedEvent, punt: Point) {
    punt.addFaciliteit(event.option.viewValue);
    this.faciliteitenFC.setValue(null);
    this._updatePoint$.next(punt);
  }

  /**
   * Verwijderd de meegegeven faciliteit op het meegegeven punt
   * @param faciliteit De te verwijderen faciliteit
   * @param punt Het punt waar de faciliteit verwijderd moet worden
   */
  removeFaciliteit(faciliteit: string, punt: Point) {
    punt.removeFaciliteit(faciliteit);
    this._updatePoint$.next(punt);
  }

  /**
   * @returns een random kleur
   */
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  veranderPointNaam(punt: Point) {
    punt.naam = this.pointNaamForm.value.pointNaam;
    this._updatePoint$.next(punt);
  }

  private showError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status >= 500) {
        this.errorMessage = "Error.server error"
      } else if (err.status === 404) {
        this.errorMessage = "map.niet gevonden"
      } else {
        this.errorMessage = "Error.unexpected error";
        console.error(err);
      }
    } else {
      this.errorMessage = "Error.unexpected error";
      console.error(err);
    }
  }
  private vindLijstuk(punt: Point): number {
    const route = this._geoJson.geometry.coordinates;
    const P = [punt.lon, punt.lat]
    return route.reduce((min, current, index, arr) => {
      if(index < arr.length -1){
        const next = arr[index + 1];
        //afstand begin -> einde lijnstuk
        const AB = this.berekenAfstand(current, next);
        //afstand begin lijnstuk -> punt
        const AP = this.berekenAfstand(current, P);
        //afstand punt -> eind lijnstuk
        const PB = this.berekenAfstand(P, next);
        const verschil = Math.abs(AB - (AP + PB));
        if(verschil < min[0]){
          return [verschil, index];
        }
      }
      return min
    },[Number.POSITIVE_INFINITY, -1])[1];
  }

  private berekenAfstand([x1, y1]: number[], [x2, y2]: number[]): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
