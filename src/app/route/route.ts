import { analyzeAndValidateNgModules } from '@angular/compiler';

export class Route {


  constructor(public imgUrl: string,
    public name: Map<string, string>,
    public lengte: number,
    public openbaar: boolean,
    public start: Date,
    public einde: Date,
    public beschrijving: Map<string, string>,
    public id: number = null,
    public geoJson: JSON = null,
    private _prijs: number = 0.0,
    public afbeeldingen: string[] = []
  ) {
  }

  get prijs() {
    return this._prijs.toString().replace(".", ",")
  }
  set prijs(prijs) {
    this._prijs = Number(prijs)
  }


  static fromJson(json) {
    //Imgurl nog niet in db en api
    let start = new Date(json.start);
    let einde = new Date(json.einde);
    let offsetInMilliseconden = start.getTimezoneOffset() * 60 * 1000;
    start = new Date(start.valueOf() - offsetInMilliseconden);
    einde = new Date(einde.valueOf() - offsetInMilliseconden);
    var test = json.beschrijving
    return new Route("../../assets/images/dummy/dummyMap.jpg",
      json.naam != null? new Map<string, string>(Object.entries(json.naam)): null,
      json.lengte,
      json.openbaar,
      start,
      einde,
      json.beschrijving != null? new Map<string, string>(Object.entries(json.beschrijving)): null,
      json.id,
      null,
      json.prijs,
      json.afbeeldingen)
  }

  toJson() {
    const route = this
    var name = {"nl": route.name.get("nl"), "fr": route.name.get("fr")}
    var beschrijving = {"nl": route.beschrijving.get("nl"), "fr": route.beschrijving.get("fr")}
    return <any>{
      naam: name,
      imgUrl: this.imgUrl,
      geoJson: this.geoJson,
      lengte: this.lengte,
      openbaar: this.openbaar,
      start: this.start,
      einde: this.einde,
      beschrijving: beschrijving,
      prijs: this._prijs,
      id: this.id
    }
  }
}
