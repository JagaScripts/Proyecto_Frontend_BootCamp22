import { Rol } from "../enum/rol/rol.model";

export interface Usuario {
  id:number;
  username: string;
  email: string;
  password: string;
  role: Rol;
  edad: Date;
  url_imagen: string;
  activo: string;
}