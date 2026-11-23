export interface Entrenador {
  id: number;
  nombres: string;
  especialidad: string;
  telefono: string | null;
}

export interface CrearEntrenador {
  nombres: string;
  especialidad: string;
  telefono: string;
}
