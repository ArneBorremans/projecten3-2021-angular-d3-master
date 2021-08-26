import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-betaling-bevestigd',
  templateUrl: './betaling-bevestigd.component.html',
  styleUrls: ['./betaling-bevestigd.component.css']
})
export class BetalingBevestigdComponent implements OnInit {
  titel: string
  status: number = 0

  constructor(
    private _route: ActivatedRoute ,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.status = Number(this._route.snapshot.queryParams["status"])
  }

  get content() {
    switch(this.status) {
        case 9: this.titel = this.translate.instant("Betaling-bevestigd.Hartelijk dank!"); return this.translate.instant("Betaling-bevestigd.De betaling werd succesvol afgerond! U bent nu ingeschreven!")
        default: this.titel = this.translate.instant("Betaling-bevestigd.Oeps..."); return this.translate.instant("Betaling-bevestigd.Er liep iets mis bij de betaling")
    }
  }
}
