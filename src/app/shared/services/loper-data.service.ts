import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import { RouteLoper } from 'src/app/register-route/route-loper';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Loper } from 'src/app/loper/loper.model';
import { UserInfo } from 'src/app/user/profile/UserInfo';
import { Message } from 'src/app/route/track/message';
import { Inschrijving } from '../../user/profile/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class LoperDataService {
  /**
   * 
   * @param http 
   * @param _authenticationService 
   */
  constructor(
    private http: HttpClient,
    private _authenticationService: AuthenticationService
  ) {}

  /**
   * Geeft de publieke lopers van een meegegeven page terug
   * @param page de page
   */
  publicLopers$(page: Number): Observable<Loper[]> {
    return this.http
      .get(`${environment.apiUrl}/loper/public?page=${page}`)
      .pipe(
        tap(console.log),
        map((response: any): Loper[] => response.map(Loper.fromJSON)),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * Observable van de ingelogde loper
   */
  loper$(): Observable<UserInfo> {
    console.log(this._authenticationService.loperId);
    return this.http
      .get(
        `${environment.apiUrl}/loper/`
      )
      .pipe(
        //tap(console.log),
        map((response: any): UserInfo => UserInfo.fromJSON(response)),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * Zoekt openbare onzichtbare loper met meegegeven parameters
   * @param voornaam voornaam van de loper
   * @param naam achternaam van de loper
   * @param gemeente gemeente van de loper
   */
  searchHiddenLopers$(
    voornaam: string,
    naam: string,
    gemeente: string
  ): Observable<Loper> {
    return this.http
      .get(
        `${environment.apiUrl}/loper/searchhidden?gemeente=${gemeente}&voornaam=${voornaam}&naam=${naam}`
      )
      .pipe(
        tap(console.log),
        map((response: any): Loper => Loper.fromJSON(response)),
        catchError((err) => this.handleError(err))
      );
  }
  
  /**
   * Zoekt chat van de opgezochte loper met de code
   * @param code 
   */
  chat$(code): Observable<Message[]> {
    console.log(this._authenticationService.loperId)
    return this.http.get(`${environment.apiUrl}/loper/${code}/chat`).pipe(
      tap(console.log),
      map((response: any): Message[] => response.map(Message.fromJson)),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Stuurt een bericht in de huidige chat
   * @param code 
   * @param text 
   * @param date 
   * @param zender 
   */
  message$(code, text: string, date: Date, zender: string): Observable<Message> {
    return this.http
      .post(
        `${environment.apiUrl}/loper/${code}/chat`,
        new Message(text, date, zender).toJson()
      )
      .pipe(
        tap(console.log),
        map(
          (response: any): Message =>
            Message.fromJson(response)
        ),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * Zoekt openbare loper met meegegeven parameters
   * @param voornaam voornaam van de loper
   * @param naam achternaam van de loper
   * @param gemeente gemeente van de loper
   */
  searchPublicLopers$(
    voornaam: string,
    naam: string,
    gemeente: string
  ): Observable<Loper[]> {
    let params = new HttpParams()
    params = voornaam ? params.append("voornaam", voornaam) : params;
    params = naam ? params.append("naam", naam) : params;
    params = gemeente ? params.append("gemeente", gemeente) : params;
    return this.http
      .get(
        `${environment.apiUrl}/loper/searchpublic`,
        {params}
      )
      .pipe(
        tap(console.log),
        map((response: any): Loper[] => response.map(Loper.fromJSON)),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * Observable van de huidge locatie van een loper met code
   * @param code code van de loper
   */
  getCurrentRoute$(code): Observable<HuidigeLocatieResponse> {
    return this.http.get(`${environment.apiUrl}/loper/${code}/locatie`).pipe(
      tap(console.log),
      map(
        (response: any): HuidigeLocatieResponse =>
          HuidigeLocatieResponse.fromJson(response)
      ),
      catchError((err) => this.handleError(err))
    );
  }

  /**
   * Registreert de ingelogde loper voor een route
   * @param routeID id van de route
   * @param tshirtMaat gekozen Tshirt maat
   * @param zichtbaarheid gekozen zichtbaarheid
   */
  registreerVoorRoute$(
    routeID: number,
    tshirtMaat: string,
    zichtbaarheid: number
  ) {
    return this.http
      .post(
        `${environment.apiUrl}/betaling`,
        new RouteLoper(
          routeID,
          this._authenticationService.loperId,
          tshirtMaat,
          zichtbaarheid
        ).toJson()
      )
      .pipe(
        map((response: any) => response),
        catchError((err) => this.handleError(err))
      );
  }

  updateZichtbaarheid$(
    inschrijving: Inschrijving
  ) {
    return this.http
      .put(
        `${environment.apiUrl}/loper/routes`,
        inschrijving.toJson()
      )
      .pipe(
        tap(console.log),
        catchError((err => this.handleError(err)))
      );
  }

  /**
   * Observable boolean, true als de ingelogde user ingeschreven is voor de meegegeven route
   * @param routeID id van de route
   */
  ingeschreven$(routeID: number): Observable<boolean> {
    return this.http
      .get(
        `${environment.apiUrl}/loper/routes/${routeID}`
      )
      .pipe(
        tap(console.log),
        catchError((err) => this.handleError(err))
      );
  }

  /**
   * Schrijft de ingelogde user uit voor de meegegeven route
   * @param routeID route id
   */
  deleteRegistratieRoute(routeID: number) {
    return this.http
      .delete(
        `${environment.apiUrl}/loper/routes/${routeID}`
      )
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe();
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
}


class HuidigeLocatieResponse {
  constructor(
    public voornaam: string,
    public achternaam: string,
    public lat: number,
    public long: number,
    public routeId: number
  ) {}

  static fromJson(json) {
    return new HuidigeLocatieResponse(
      json.voornaam,
      json.achternaam,
      json.lat,
      json.lon,
      json.routeId
    );
  }
}
