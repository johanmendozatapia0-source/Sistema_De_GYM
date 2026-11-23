export interface Socio {
  id: number;
  codigoSocio: string;
  nombres: string;
  dni: string | null;
  telefono: string | null;
  fotoUrl: string | null;
  activo: boolean;
  fechaRegistro: string;
  membresiaHasta: string | null;
  membresiaId: number | null;
}

export interface CrearSocio {
  nombres: string;
  dni?: string;
  telefono?: string;
  fotoUrl?: string;
}
