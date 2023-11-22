import { Role } from "./role";

export class Utilisateur {
    id?: number;
    nom!: string;
    email!: string;
    password!: string;
    roles!: Role[];

}