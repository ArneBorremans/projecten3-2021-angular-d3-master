import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { Route } from 'src/app/route/route';
import { FeatureCollection, IGeoJson, GeoJson, Point } from 'src/app/route/mapPoints';
import { environment } from 'src/environments/environment';
import { route, routePoints } from 'src/app/shared/mockdata/mock-map-data';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private _count: number = 0;

  constructor(private http: HttpClient) {}

  /**
   * Geef geojson terug van route met id
   * @param id id van de route
   */
  routeGeoJson$(id): Observable<GeoJson> {
    return this.http.get(`${environment.apiUrl}/route/${id}/geojson`).pipe(
      tap(console.log),
      map((response: any) => response),
      catchError(err => this.handleError(err))
    )
  }

  /**
   * Geeft route terug met id
   * @param id id van de route
   */
  route$(id): Observable<Route> {
    return this.http.get(`${environment.apiUrl}/route/${id}`).pipe(
      tap(console.log),
      map((response: any) => Route.fromJson(response)),
      catchError(err => this.handleError(err))
    )
  }

  /**
   * Geeft alle routes terug
   */
  get routes$(): Observable<Route[]> {
    return this.http.get(`${environment.apiUrl}/route/`).pipe(
      tap(console.log),
      map((response: any): Route[] => response.map(Route.fromJson)),
      catchError(err => this.handleError(err))
    )
  }

  /**
   * Geeft alle publieke routes terug
   */
  get publicRoutes$(): Observable<Route[]> {
    return this.http.get(`${environment.apiUrl}/route/public`).pipe(
      tap(console.log),
      map((response: any): Route[] => response.map(Route.fromJson)),
      catchError(err => this.handleError(err))
    )
  }

  /**
   * Stuurt een nieuwe route naar de api
   * @param route nieuwe route
   */
  newRoute$(route: Route): Observable<Route> {
    return this.http.post(`${environment.apiUrl}/route`, route.toJson()).pipe(
      tap(console.log),
      map((response: any): Route => Route.fromJson(response)),
      catchError(err => this.handleError(err))
    )
  }

  /**
   * Stuurt een gewijzigde route naar de api
   * @param route de gewijzigde route
   */
  updateRoute$(route: Route): Observable<Route> {
    return this.http.put(`${environment.apiUrl}/route/${route.id}`, route.toJson()).pipe(
      tap(console.log),
      map((response: any): Route => Route.fromJson(response)),
      catchError(err => this.handleError(err))
    )
  }

  /**
   * Verwijdert een route
   * @param route de route
   */
  deleteRoute$(route: Route) {
    return this.http.delete(`${environment.apiUrl}/route/${route.id}`).pipe(
      tap(console.log),
      map((response: any) => response),
      catchError(err => this.handleError(err))
    )
  }

  newPoints$(routeId:number, point: Point): Observable<Point>{
    console.log(point.toJson())
    return this.http.post(`${environment.apiUrl}/route/${routeId}/punten`, point.toJson()).pipe(
      tap(console.log),
      map((response: any): Point => Point.fromJson(response)),
      catchError(err => this.handleError(err))
    );
  }

  updatePoints$(routeId:number, point: Point): Observable<Point>{
    console.log(point.toJson())
    return this.http.put(`${environment.apiUrl}/route/${routeId}/punten/${point.id}`, point.toJson()).pipe(
      tap(console.log),
      catchError(err => this.handleError(err))
    );
  }

  deletePoint$(routeId:number, pointId:number){
    return this.http.delete(`${environment.apiUrl}/Route/${routeId}/punten/${pointId}`).pipe(
      tap(console.log),
      map((response: any) => response),
      catchError(err => this.handleError(err))
    );
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      if(err.status >= 400){
        return throwError(err);
      } else {
        errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
      }
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    return throwError(errorMessage);
  }

  /**
   * Geeft de tussenstops van een route terug
   * @param routeId id van de route
   * 
   * @todo Punten worden misschien beter samen opgehaald met de route zelf - Jonas
   */
  getCheckpoints$(routeId): Observable<Point[]>{
    return this.http.get(`${environment.apiUrl}/route/${routeId}/points`).pipe(
      tap(console.log),
      map((response:any):Array<Point> => response.map(Point.fromJson))
    );
  }

  get location(): IGeoJson{
    let point = route.geometry.coordinates[this._count];
    this._count = Math.min(this._count + 1, route.geometry.coordinates.length - 1);
    return new GeoJson(point);
  }

  public uploadFile(routeId: number, files: FileList): Observable<any>{
    const formData = new FormData();
    for(let i = 0; i < files.length; i++){
      formData.append("files", files.item(i));
    }
    return this.http.post(`${environment.apiUrl}/route/${routeId}/afbeeldingen`, formData, {reportProgress: true, observe: 'events',
    headers: new HttpHeaders().append('Content-Disposition', 'multipart/form-data')
  }).pipe(
    catchError(e => this.handleError(e))
  );
  }

  public deleteFile(routeId: number, fileName: string): Observable<any>{
    return this.http.delete(`${environment.apiUrl}/route/${routeId}/afbeeldingen/${fileName}`)
      .pipe(catchError(e => this.handleError(e)));
  }
}
