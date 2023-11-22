import { Status } from "./status";
export class Role {
  id?: number;
  nom!: Status;
  constructor(nom: Status) {
    this.nom = nom;
  }
}
