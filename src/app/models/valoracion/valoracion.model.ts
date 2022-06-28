import { Book } from "../book/book.model";
import { Usuario } from "../usuario/usuario.model";
import { Valorar } from "../valorar/valorar.model";

export interface Valoracion {
  id:number;
  usuario: Usuario;
  libro: Book;
  valorar: Valorar;
}
