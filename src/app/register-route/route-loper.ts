export class RouteLoper {
    private _routeID: number
    private _loperID: number
    private _laatsteLocatieLan: number
    private _laatsteLocatieLon: number
  
    constructor(routeID: number, loperID : number, public tshirtMaat?: string, public zichtbaarheid?: number, laatsteLocatieLan?: number, laatsteLocatieLon?: number) {
        this._routeID = routeID;
        this._loperID = loperID;
    }
  
    get routeID(): number {
      return this._routeID;
    }

    set routeID(value: number) {
      this._routeID = value;
    }
  
    get loperID(): number {
      return this._loperID;
    }

    set loperID(value: number) {
      this._loperID = value;
    }

    get laatsteLocatieLan() {
      return this._laatsteLocatieLan;
    }
  
    get laatsteLocatieLon() {
      return this._laatsteLocatieLon;
    }

    static fromJson(json) {
      return new RouteLoper(json.routeID, json.loperID, json.laatsteLocatieLan, json.laatsteLocatieLon)
    }
  
    toJson() {
      var a = <any> {
        RouteID: this._routeID,
        LoperID: this._loperID,
        Zichtbaarheid: this.zichtbaarheid,
        TshirtMaat: this.tshirtMaat ?? ""
      }
      console.log(a)
      return a
    }
}
