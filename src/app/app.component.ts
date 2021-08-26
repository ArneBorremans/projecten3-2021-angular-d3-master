import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * app component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularFrontEndD3';

  constructor(translate: TranslateService) {
    translate.addLangs(['nl', 'fr'])
    translate.setDefaultLang('nl');
    translate.use('nl');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/nl|fr/) ? browserLang : 'nl');
  }
}
