
import React from 'react';
import { useBusData } from './hooks/useBusData';
import { BusCard } from './components/BusCard';

const App: React.FC = () => {
  const buses = useBusData();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Panel de Monitoreo de Autobuses
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Visualización en tiempo real del estado y accesibilidad de la flota.
          </p>
        </header>
        
        <main>
          {buses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buses.map(bus => (
                <BusCard key={bus.id} bus={bus} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Cargando datos de los autobuses...</p>
            </div>
          )}
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Potenciado por React y Tailwind CSS. Datos simulados para demostración.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
