import { Estrellas } from "../enum/estrellas/estrellas.model";

export interface Valorar {
  id: number;
  fecha: Date;
  estrellas: Estrellas;
  comentario: string;//varchar 1000
}
