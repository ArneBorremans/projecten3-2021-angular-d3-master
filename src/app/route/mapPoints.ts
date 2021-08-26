import { BooleanInput } from '@angular/cdk/coercion';

export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}

export interface IFeatureCollection{
  type: string,
  features: Array<GeoJson>
}

export interface IPoint{
  id:number,
  naam: string,
  adres: string,
  lon: number,
  lat: number,
  faciliteiten: string[]
}

export class GeoJson implements IGeoJson {
  static fromJSON(fromJSON: any): IGeoJson {
    return fromJSON;
  }
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

export class FeatureCollection implements IFeatureCollection{
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}

  public addFeature(coordinates: number[], properties?): IGeoJson{
    let newFeature = new GeoJson(coordinates, properties);
    this.features.push(newFeature);
    return newFeature;
  }

  public removeFeature(feature: IGeoJson){
    this.features.splice(this.features.findIndex(f => f === feature, 1));
  }

  public static fromJSON(features: IFeatureCollection): FeatureCollection{
    return new FeatureCollection(features.features);
  }
}

export class Point implements IPoint{

  private _color: string
  private _faciliteiten: Set<string> = new Set()

  constructor(private _naam:string, private _adres:string, private _lat:number, private _lon:number, faciliteiten:string[], private _id:number = null){
    faciliteiten.forEach(item => this.addFaciliteit(item))
  }

  get naam(): string{
    return this._naam;
  }

  set naam(value: string) {
    this._naam = value;
  }

  get adres(): string{
    return this._adres;
  }

  get lat(): number{
    return this._lat;
  }

  get lon():number{
    return this._lon;
  }
  
  get faciliteiten():string[]{
    let array = [];
    this._faciliteiten.forEach(item => array.push(item));
    return array;
  }

  get id():number{
    return this._id;
  }

  set color(value: string) {
    this._color = value;
  }

  get color(): string {
    return this._color;
  }

  addFaciliteit(faciliteit: string){
    this._faciliteiten.add(faciliteit);
  }

  removeFaciliteit(faciliteit: string){
    this._faciliteiten.delete(faciliteit);
  }

  static fromJson(json: IPoint): Point{
    return new Point(json.naam,json.adres, json.lat, json.lon, json.faciliteiten, json.id);
  }

  toJson() {

    return <any> {
      naam: this.naam,
      adres: this.adres,
      lon: this.lon,
      lat: this.lat,
      faciliteiten: this.faciliteiten,
      id: this.id
    }
  }
}