import { Component, OnInit, Input } from '@angular/core';
import { Loper } from '../loper.model';

/**
 * Loper component
 */
@Component({
  selector: 'app-loper',
  templateUrl: './loper.component.html',
  styleUrls: ['./loper.component.css'],
})
export class LoperComponent implements OnInit {
  /**
   * Input weer te geven loper
   */
  @Input() public loper: Loper;
  
  constructor() {}

  ngOnInit(): void {}
}
