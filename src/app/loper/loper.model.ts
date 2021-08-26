interface LoperJson {
    id: number;
    firstName: string;
    lastName: string;
    gemeente: string;
    email: string;
    linkCode: string
  }
  
  export class Loper {
    linkCode: string
    private _id: number;
    constructor(
      private _firstName: string,
      private _lastName: string,
      private _gemeente: string,
      private _email: string,
    ) {}
  
    static fromJSON(json: LoperJson): Loper {
      const lec = new Loper(
        json.firstName,
        json.lastName,
        json.gemeente,
        json.email
      )
      lec.linkCode = json.linkCode
      lec._id = json.id;
      return lec;
    }
  
    toJSON(): LoperJson {
      return <LoperJson>{
        firstName: this.firstName,
        lastName: this.lastName,
        gemeente: this.gemeente,
        email: this.email
      };
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
  }
  