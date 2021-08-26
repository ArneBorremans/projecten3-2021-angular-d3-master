import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * MainNav component
 */
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  /**
   * Huidige ingelogde user
   */
  loggedInUser$ = this._authenticationService.user$;

  /**
   *  
   * @param _router 
   * @param translate 
   * @param _authenticationService 
   */
  constructor(
    private _router: Router,
    public translate: TranslateService,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.translate.currentLang)
  }

  getPath(): string {
    return this.route.snapshot.firstChild.url[0].path != null
      ? this.route.snapshot.firstChild.url[0].path
      : '';
  }

  /**
   * Returns of de gebruiker een admin is
   */
  get isAdmin() {
    return this._authenticationService.isAdmin;
  }

  /**
   * Logs out user and redirects to login
   */
  logout() {
    this._authenticationService.logout();
    this.login();
  }

  /**
   * Redirects to login
   */
  login() {
    this._router.navigate(['login']);
  }
}
