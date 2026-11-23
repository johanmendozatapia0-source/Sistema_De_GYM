export interface Rutina {
  id: number;
  titulo: string;
  duracionSemanas: number;
  nivel: string;
  imagenUrl: string | null;
  entrenadorId: number | null;
}

export interface CrearRutina {
  titulo: string;
  duracionSemanas: number;
  nivel: string;
  imagenUrl?: string;
  entrenadorId?: number;
}
