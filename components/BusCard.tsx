import React from 'react';
import type { BusData } from '../types';
import { TerrainStability, SidewalkHeight } from '../types';
import { SpeedometerIcon, RoadIcon, ClockIcon, TerrainIcon, SidewalkIcon, WheelchairIcon } from './icons';

interface StatusBadgeProps {
  label: string;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, color }) => {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-300 ring-green-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 ring-yellow-500/30',
    red: 'bg-red-500/20 text-red-300 ring-red-500/30',
    blue: 'bg-blue-500/20 text-blue-300 ring-blue-500/30',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClasses[color]}`}>
      {label}
    </span>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, unit }) => (
  <div className="flex flex-col items-center justify-center p-2 text-center bg-white/5 rounded-lg">
    <div className="flex items-center gap-2 text-indigo-300">
      {icon}
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <p className="text-2xl font-semibold text-white">
      {value} <span className="text-lg font-normal text-gray-300">{unit}</span>
    </p>
  </div>
);


interface StatusItemProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-3">
            <div className="text-indigo-400">{icon}</div>
            <span className="text-gray-300 font-medium">{label}</span>
        </div>
        <div>{value}</div>
    </div>
);

// FIX: Moved lookup objects outside the component and used 'as const' to ensure
// TypeScript infers literal types for colors ('green', 'yellow', 'red') instead of 'string'.
// This resolves the type assignment errors on lines 63 and 69.
const terrainInfoMap = {
  [TerrainStability.Stable]: { label: 'Estable', color: 'green' },
  [TerrainStability.Irregular]: { label: 'Irregular', color: 'yellow' },
  [TerrainStability.Unstable]: { label: 'Inestable', color: 'red' },
} as const;

const sidewalkInfoMap = {
  [SidewalkHeight.Stable]: { label: 'Estable', color: 'green' },
  [SidewalkHeight.Low]: { label: 'Baja', color: 'yellow' },
  [SidewalkHeight.High]: { label: 'Alta', color: 'yellow' },
} as const;

export const BusCard: React.FC<{ bus: BusData }> = ({ bus }) => {
  const terrainInfo = terrainInfoMap[bus.terrain];

  const sidewalkInfo = sidewalkInfoMap[bus.sidewalk];

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="text-lg font-bold text-white tracking-wider">{bus.route}</h3>
        <p className="text-sm text-gray-400">{bus.id}</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <InfoItem icon={<RoadIcon className="w-5 h-5" />} label="Distancia" value={bus.distance} unit="km" />
          <InfoItem icon={<SpeedometerIcon className="w-5 h-5" />} label="Velocidad" value={bus.speed} unit="km/h" />
          <InfoItem icon={<ClockIcon className="w-5 h-5" />} label="ETA" value={bus.eta} unit="min" />
        </div>
        
        <div className="space-y-3">
           <StatusItem 
            icon={<TerrainIcon className="w-6 h-6" />}
            label="Terreno"
            value={<StatusBadge label={terrainInfo.label} color={terrainInfo.color} />}
          />
          <StatusItem 
            icon={<SidewalkIcon className="w-6 h-6" />}
            label="Vereda"
            value={<StatusBadge label={sidewalkInfo.label} color={sidewalkInfo.color} />}
          />
          <StatusItem 
            icon={<WheelchairIcon className="w-6 h-6" />}
            label="Rampa de Acceso"
            value={bus.hasRamp ? <StatusBadge label="Sí" color="blue" /> : <StatusBadge label="No" color="red" />}
          />
        </div>
      </div>
    </div>
  );
};