
import { useState, useEffect } from 'react';
import type { BusData } from '../types';
import { TerrainStability, SidewalkHeight } from '../types';

const initialBuses: BusData[] = [
  { id: 'BUS-01', route: 'Ruta 101 - Centro', distance: 15.2, speed: 45, eta: 25, terrain: TerrainStability.Stable, sidewalk: SidewalkHeight.Stable, hasRamp: true },
  { id: 'BUS-02', route: 'Ruta 203 - Norte', distance: 8.5, speed: 30, eta: 18, terrain: TerrainStability.Irregular, sidewalk: SidewalkHeight.Low, hasRamp: false },
  { id: 'BUS-03', route: 'Ruta 55 - Sur', distance: 22.1, speed: 60, eta: 35, terrain: TerrainStability.Stable, sidewalk: SidewalkHeight.Stable, hasRamp: true },
  { id: 'BUS-04', route: 'Ruta Circular C4', distance: 5.3, speed: 25, eta: 12, terrain: TerrainStability.Stable, sidewalk: SidewalkHeight.High, hasRamp: true },
  { id: 'BUS-05', route: 'Ruta 310 - Este', distance: 12.8, speed: 52, eta: 20, terrain: TerrainStability.Unstable, sidewalk: SidewalkHeight.Low, hasRamp: false },
  { id: 'BUS-06', route: 'Ruta Express E7', distance: 30.0, speed: 75, eta: 40, terrain: TerrainStability.Stable, sidewalk: SidewalkHeight.Stable, hasRamp: true },
];

const terrainOptions = Object.values(TerrainStability);
const sidewalkOptions = Object.values(SidewalkHeight);

export const useBusData = () => {
  const [buses, setBuses] = useState<BusData[]>(initialBuses);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          const speedChange = (Math.random() - 0.5) * 5;
          const newSpeed = Math.max(0, Math.min(100, bus.speed + speedChange));
          
          const distanceChange = newSpeed * (3 / 3600); // 3 seconds interval in hours
          const newDistance = Math.max(0, bus.distance - distanceChange);
          
          const newEta = newDistance > 0 ? Math.round((newDistance / (newSpeed > 0 ? newSpeed : 20)) * 60) : 0;

          // Randomly change terrain and sidewalk for simulation purposes
          const newTerrain = Math.random() > 0.95 ? terrainOptions[Math.floor(Math.random() * terrainOptions.length)] : bus.terrain;
          const newSidewalk = Math.random() > 0.95 ? sidewalkOptions[Math.floor(Math.random() * sidewalkOptions.length)] : bus.sidewalk;
          
          return {
            ...bus,
            speed: parseFloat(newSpeed.toFixed(1)),
            distance: parseFloat(newDistance.toFixed(2)),
            eta: newEta,
            terrain: newTerrain,
            sidewalk: newSidewalk,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return buses;
};
