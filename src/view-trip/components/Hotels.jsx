import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  let tripData;

  try {
    // Verificar se tripData é um objeto e não precisa de parsing
    if (typeof trip.tripData === 'string') {
      // Se for uma string, parsear para JSON
      const startOfJson = trip.tripData.indexOf('{');  // Encontrar o início do JSON real
      const endOfJson = trip.tripData.lastIndexOf('}'); // Encontrar o fim do JSON real
      const cleanTripData = trip.tripData.slice(startOfJson, endOfJson + 1)
        .replace(/,\s*}/g, '}')  // Remove vírgulas antes de chaves de fechamento
        .replace(/,\s*]/g, ']'); // Remove vírgulas antes de colchetes de fechamento

      console.log('JSON Limpo:', cleanTripData);  // Verificar o conteúdo do JSON limpo
      tripData = JSON.parse(cleanTripData); // Parse da string limpa para JSON
    } else {
      // Se já for um objeto JSON, usá-lo diretamente
      tripData = trip.tripData;
    }
  } catch (error) {
    console.error('Erro ao parsear tripData:', error);
    return <div>Erro ao carregar dados de viagem</div>;
  }

  console.log('Dados dos hotéis:', tripData.hotéis);

  return (
    <div>
      <h2 className='font-bold text-xl mt-5 gap-5'>Hotéis Recomendados</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {tripData?.hotéis?.map((hotéis, index) => (
        <HotelCardItem key={index} hotéis={hotéis} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
