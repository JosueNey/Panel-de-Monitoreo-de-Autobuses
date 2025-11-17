
export enum TerrainStability {
  Stable = 'Estable',
  Unstable = 'Inestable',
  Irregular = 'Irregular',
}

export enum SidewalkHeight {
  High = 'Alta',
  Low = 'Baja',
  Stable = 'Estable',
}

export interface BusData {
  id: string;
  route: string;
  distance: number; // in km
  speed: number; // in km/h
  eta: number; // in minutes
  terrain: TerrainStability;
  sidewalk: SidewalkHeight;
  hasRamp: boolean;
}
