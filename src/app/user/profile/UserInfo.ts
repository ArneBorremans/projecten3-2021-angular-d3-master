interface UserInfoJson {
    id: number
    firstName: string
    lastName: string
    gemeente: string
    email: string
    inschrijvingen: InschrijvingJson[]
  }

interface InschrijvingJson {
  routeID: number
  loperID: number
  tshirtMaat: number
  zichtbaarheid: number
  geregistreerdOp: Date
  startDatumEnUur: Date
  eindDatumEnUur: Date
  laatsteLocatieLat: number
  laatsteLocatieLon: number
  routeNaam: Map<string, string>,
}
  
  export class UserInfo {
    linkCode: string
    private _id: number;
    constructor(
      private _firstName: string,
      private _lastName: string,
      private _gemeente: string,
      private _email: string,
      private _inschrijvingen: Inschrijving[]
    ) {}
  
    static fromJSON(json: UserInfoJson): UserInfo {
      var inschrijvingen = json.inschrijvingen.map(i => Inschrijving.fromJSON(i))
      const lec = new UserInfo(
        json.firstName,
        json.lastName,
        json.gemeente,
        json.email,
        inschrijvingen
      )
      lec._id = json.id;
      return lec;
    }
  
    get id(): number {
      return this._id;
    }
  
    get firstName(): string {
      return this._firstName;
    }
  
    get lastName(): string {
      return this._lastName;
    }
  
    get gemeente(): string {
      return this._gemeente;
    }
    
    get email(): string {
      return this._email;
    }

    get inschrijvingen(): Inschrijving[] {
      return this._inschrijvingen
    }
  }
  
  export class Inschrijving {
    constructor(
      private _zichtbaarheid: number,
      private _geregistreerdOp: Date,
      private _startDatumEnUur: Date,
      private _eindDatumEnUur: Date,
      private _routeNaam: Map<string, string>,
      private _loperid: number,
      private _routeid: number
    ) {}
  
    static fromJSON(jsonInschrijving: InschrijvingJson): Inschrijving {
      const inschr = new Inschrijving (
        jsonInschrijving.zichtbaarheid,
        jsonInschrijving.geregistreerdOp,
        jsonInschrijving.startDatumEnUur,
        jsonInschrijving.eindDatumEnUur,
        jsonInschrijving.routeNaam != null? new Map<string, string>(Object.entries(jsonInschrijving.routeNaam)): null,
        jsonInschrijving.loperID,
        jsonInschrijving.routeID
      )
      return inschr;
    }

    static getZichtbaarheid(value: number): string {
      switch (value) {
        case 1: return "Iedereen kan mij volgen."
        case 2: return "Iedereen die mijn naam, voornaam en adres kent, kan mij volgen."
        case 3: return "Alleen de mensen die ik kies kunnen mij volgen (deelbare link wordt na betaling doorgestuurd)."
        case 4: return "Niemand kan mij volgen."
        default: return ""
      }
    }

    get geregistreerdOp() {
      return this._geregistreerdOp
    }

    get startDatumEnUur() {
      return this._startDatumEnUur
    }

    get eindDatumEnUur() {
      return this._eindDatumEnUur
    }

    get zichtbaarheid() {
      return this._zichtbaarheid
    }

    get routeNaam() {
      return this._routeNaam
    }

    get loperID() {
      return this.loperID
    }

    get routeID() {
      return this.routeID
    }

    set zichtbaarheid(value: number) {
      console.log(value)
      this.zichtbaarheid = value
      
    }

    toJson() {
      var a = <any> {
        RouteID: this._routeid,
        LoperID: this._loperid,
        Zichtbaarheid: this.zichtbaarheid
      }
      console.log(a)
      return a
    }
  }