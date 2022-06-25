import { Rol } from "../enum/rol/rol.model";

export interface Usuario {
  username: string;
  password: string;
  email: string;
  role: Rol;
  edad: Date;
  url_imagen: string;
  activo: boolean;

}
