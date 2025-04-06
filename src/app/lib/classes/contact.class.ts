import { Language } from '@lib/enums/language.enum';

export class Contact {
  public name: string | null = null;
  public replyto: string | null = null;
  public subject: string | null = null;
  public message: string | null = null;
  public recaptcha: string | null = null;
  public _honeypot: string | null = null;
  public languageId: Language = Language.EN;

  constructor(shape: Partial<Contact>) {
      if (shape != null) {
          if (shape.name != null) {
              this.name = shape.name;
          }
          if (shape.replyto != null) {
              this.replyto = shape.replyto;
          }
          if (shape.subject != null) {
              this.subject = shape.subject;
          }
          if (shape.message != null) {
              this.message = shape.message;
          }
          if (shape.recaptcha != null) {
              this.recaptcha = shape.recaptcha;
          }
          if (shape._honeypot != null) {
              this._honeypot = shape._honeypot;
          }
          if (shape.languageId != null) {
              this.languageId = shape.languageId;
          }
      }
  }
}