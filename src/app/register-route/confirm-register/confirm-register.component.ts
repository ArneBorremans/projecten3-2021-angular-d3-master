import { Component, Input, OnInit } from '@angular/core';
import { Route } from 'src/app/route/route';

  /**
   * Confirm register component
   * Word deze klasse nog gebruikt?
   */
  @Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {
  /**
   * @ignore
   */
  @Input() route: Route

  constructor() { }

  ngOnInit(): void {
  }

}
