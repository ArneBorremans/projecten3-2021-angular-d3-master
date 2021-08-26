import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgImageSliderModule } from 'ng-image-slider';

/**
 * Home component
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  /**
   * Array van images voor Image slider
   */
  imageObject: Array<object> = [
    {
      thumbImage: '../../assets/images/homeImg1.jpg',
    },
    {
      thumbImage: '../../assets/images/homeImg2.jpg',
    },
  ];
}
