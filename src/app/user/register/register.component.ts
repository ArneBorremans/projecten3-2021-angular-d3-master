import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMessage: string = '';
  public loading: boolean;
  public static readonly MIN_LENGTH: number = 8;

  public submitted = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        ,
        serverSideValidateUsername(this.authService.checkUserNameAvailability),
      ],
      gemeente: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(RegisterComponent.MIN_LENGTH)],
          patternValidator(/\d/, { hasNumber: true }),
          patternValidator(/[A-Z]/, { hasUpperCase: true }),
          patternValidator(/[a-z]/, { hasLowerCase: true }),
        ],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords })
    });
  }

  get minLength(){
    return RegisterComponent.MIN_LENGTH;
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'Register.required';
    } else if (errors.minlength) {
      return `Register.minlength`;
    } else if (errors.hasNumber) {
      return `Register.hasNumber`;
    } else if (errors.hasUpperCase) {
      return `Register.hasUpperCase`;
    } else if (errors.hasLowerCase) {
      return `Register.hasLowerCase`;
    } else if (errors.userAlreadyExists) {
      return `Register.userAlreadyExists`;
    } else if (errors.email) {
      return `Register.email`;
    } else if (errors.passwordsDiffer) {
      return `Register.passwordsDiffer`;
    }
  }

  onSubmit() {
    this.submitted = true;
    //TEMP
    if (/*this.user.valid*/ true) {
      this.loading = true;
      this.authService
        .register(
          this.user.value.firstname,
          this.user.value.lastname,
          this.user.value.email,
          this.user.value.gemeente,
          this.user.value.passwordGroup.password,
          this.user.value.passwordGroup.confirmPassword
        ).pipe(
          catchError(err => {
            this.showError(err);
            this.loading = false
            return EMPTY;
          })
        )
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
              this.errorMessage = `Could not login`;
            }
          }
      );
  }
}

  private showError(err: any) {
    if(err instanceof HttpErrorResponse){
      if(err.status >= 500){
        this.errorMessage = "Error.server error";
      } else if (err.status === 400){
        this.errorMessage = "Register.veld verkeerd"
      } else{
        this.errorMessage = "Error.unexpected error"
        console.error(err);
      }
    } else {
      this.errorMessage = "Error.unexpected error";
      console.error(err);
    }
  }
}

function comparePasswords(control: AbstractControl): ValidationErrors {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control.value) {
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}



