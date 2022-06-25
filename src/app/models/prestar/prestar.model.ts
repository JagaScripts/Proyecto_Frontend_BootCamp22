import { Estado } from "../enum/estado/estado.model";

export interface Prestar {
  id: number;
  estado: Estado;
  fecha_inicio: Date;
  fecha_fin: Date;
}
