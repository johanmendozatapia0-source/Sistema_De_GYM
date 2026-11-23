export interface PagoCreado {
  id: number;
  monto: number;
  fechaPago: string;
  estado: string;
  codigoSocio: string;
  membresia: string;
}

export interface CrearPago {
  socioId: number;
  membresiaId: number;
}
