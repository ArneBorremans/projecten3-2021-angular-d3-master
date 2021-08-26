import { BooleanInput } from '@angular/cdk/coercion';

export interface IMessage{
  text: string,
  date: Date,
  zender: String
}

export class Message implements IMessage{

  constructor(private _text: string, private _date: Date, private _zender: String) {
  }

  static fromJson(json: IMessage): Message{
    return new Message(json.text, json.date, json.zender);
  }

  get text(): string {
      return this._text
  }

  get date(): Date {
      return this._date
  }
 
  get zender(): String {
      return this._zender
  }

  toJson() {
    return <any> {
        text: this.text,
        date: this.date,
        zender: this.zender
    }
  }
}