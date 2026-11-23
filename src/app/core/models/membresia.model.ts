export interface Membresia {
  id: number;
  nombre: string;
  duracionDias: number;
  precio: number;
  activa: boolean;
}

export interface CrearMembresia {
  nombre: string;
  duracionDias: number;
  precio: number;
}
