import { AuthenticationService } from '../../shared/services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

/**
 * Login component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMessage: string = '';
  public loading: boolean

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true
    this.authService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        (val) => {
          if (val) {
            if (AuthenticationService.redirectUrl) {
              this.router.navigateByUrl(AuthenticationService.redirectUrl);
              AuthenticationService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            //TODO, onder welke ommstandigheden is gebeurt dit?
            this.errorMessage = `Could not login`;
          }
          this.loading = false
        },
        (err: HttpErrorResponse) => {
          this.loading = false
          if(err.status >= 500){
            this.errorMessage = "Error.server error"
          } else if(err.status === 400 || err.status === 404){
            this.errorMessage = "Login.failed login"
          } else{
            this.errorMessage = "Error.unexpected error"
          }
        }
      );
  }
}
