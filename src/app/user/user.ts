export interface User {
  id: number;
  vorname: string;
  nachname: string;
  strasseUndNr: string;
  plz: number;
  stadt: string;
  geburtsdatum: Date;
  zahlungsmittel: string;
  mail: string;
  passwort: string;
}
