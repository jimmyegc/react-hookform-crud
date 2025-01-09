// Tipo para un elemento del array
export interface OriginItem {
  id?: string; // UUID
  order?: string; // Orden
  origin?: string; // Nombre del origen
  id_origin?: number | null; // ID del origen (puede ser nulo)
  name?: string; // Nombre del elemento
  value?: number; // Valor del elemento
}

// Tipo para el formulario completo
export interface FormValues {
  items: OriginItem[]; // Array de elementos
}
