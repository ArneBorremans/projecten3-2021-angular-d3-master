import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loper } from 'src/app/loper/loper.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoperDataService } from 'src/app/shared/services/loper-data.service';
import { UserInfo } from 'src/app/user/profile/UserInfo';
import { Point } from '../mapPoints';
import { Route } from '../route';
import {TranslateService} from '@ngx-translate/core';
import { Message } from './message';

/**
 * Track component
 */
@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  private static readonly UPDATE_INTERVAL: number = 10000;

  /**
   * True als user zijn route nog wordt opgehaalt 
   */
  loading: boolean = true
  public loper: Loper
  followOther: FormGroup
  public route: Route
  public routeid: number
  private _code: String
  public locatie: Subject<number[]> = new ReplaySubject(1);
  public zender: UserInfo
  public errorMessage: string = "";
  messages: Message[];
  
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private _loperDataS: LoperDataService, 
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    //Nog een catcherror
    this._route.params.subscribe((params) => {
      this._code = params['code']
      this._loperDataS.getCurrentRoute$(this._code).pipe(
        catchError(err => {
          this.loper = null
          this.showError(err);
          this.loading = false
          return EMPTY
        })
      ).subscribe(r => {
        this.loading = false
        if (r != null) {
          this.routeid = r.routeId
          this.locatie.next([r.lat, r.long]);
          //Gemeente nog meegeven
          this.loper = new Loper(r.voornaam, r.achternaam, "Gent", "")
        }
        this._loperDataS.chat$(this._code).subscribe(c => this.messages = c)
        setInterval(() => this.updateLocatie(this._loperDataS), TrackComponent.UPDATE_INTERVAL);
      });
      if (this._authenticationService.loperId) {
        this._loperDataS.loper$().subscribe(r => this.zender = r);
      }
    })
  }

  updateLocatie(service: LoperDataService){
    service.getCurrentRoute$(this._code)
    .pipe(
      catchError(err => {
        this.showError(err);
        return EMPTY;
      })
    ).subscribe(r => this.locatie.next([r.lat, r.long]));
  }

  sendMessage(event: any) {

    var naam = (this.zender) ? this.zender.firstName : "Anonymous"

    this.messages.push( new Message(event.message, new Date(), naam));

    this._loperDataS.message$(this._code, event.message, new Date(), naam)
    .pipe(
      catchError(err => {
        this.showError(err);
        return EMPTY;
      })
      )
    .subscribe(console.log);
  }

  onSubmit() {

  }



  private showError(err: any) {
    if(err instanceof HttpErrorResponse){
      if(err.status >= 500){
        this.errorMessage = "Error.server error";
      } else if(err.status === 404){
        this.errorMessage = "track.niet gevonden";
      } else{
        this.errorMessage = "Error.unexpected error";
        console.error(err);
      }
    } else{
      this.errorMessage = "Error.unexpected error";
      console.error(err);
    }
  }
}
