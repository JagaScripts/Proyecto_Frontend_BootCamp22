import { Estado } from "../enum/estado/estado.model";

export interface Intercambiar {
  id: number;
  fecha_solicitud: Date;
  fecha_estado_final?: Date;
  estado: Estado;
}
