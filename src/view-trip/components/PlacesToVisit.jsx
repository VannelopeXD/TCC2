import React from 'react';
import PlaceCardItem from './PlaceCardItem';

export default function PlacesToVisit({ trip }) {
  let tripData;
  try {
    // Verificar se trip.tripData é uma string ou um objeto
    if (typeof trip.tripData === 'string') {
      // Tenta encontrar o início e o fim de um JSON válido na string
      const startOfJson = trip.tripData.indexOf('{');
      const endOfJson = trip.tripData.lastIndexOf('}');
      
      // Se não encontrar chaves, lança um erro
      if (startOfJson === -1 || endOfJson === -1) {
        throw new Error("Formato inválido: JSON não encontrado.");
      }
  
      // Corta a parte da string entre a primeira chave de abertura e a última chave de fechamento
      const cleanTripData = trip.tripData.slice(startOfJson, endOfJson + 1)
        .replace(/,\s*}/g, '}')  // Remove vírgulas antes de chaves de fechamento
        .replace(/,\s*]/g, ']'); // Remove vírgulas antes de colchetes de fechamento
  
      console.log('JSON Limpo:', cleanTripData);  // Verificar o conteúdo do JSON limpo
  
      // Faz o parsing da string limpa para JSON
      tripData = JSON.parse(cleanTripData);
    } else {
      // Se trip.tripData já for um objeto JSON, usá-lo diretamente
      tripData = trip.tripData;
    }

  } catch (error) {
    console.error('Erro ao parsear tripData:', error.message);
    return <div>Erro ao carregar dados de viagem: {error.message}</div>;
  }
  
  // Se o JSON foi parseado corretamente, continue com os dados
  console.log('Dados do itinerário:', tripData?.itinerário);

  return (
    <div>
      <h2 className='font-bold text-lg'>Planejamento</h2>

      <div>
        {tripData.itinerário && Array.isArray(tripData.itinerário) ? (
          tripData.itinerário.map((itinerário, index) => (
            <div className='mt-5' key={index}>
              <h2 className='font-medium text-lg'>{itinerário.dia}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {Array.isArray(itinerário.plano) && itinerário.plano.map((plano, planIndex) => (
                  <div key={planIndex} className=''>
                    <h2 className='font-medium text-sm text-blue-600'>{plano.hora}</h2>
                    <PlaceCardItem plano={plano}/> 
                  </div>
                ))}
              </div>  
            </div>
          ))
        ) : (
          <p>No itinerary available.</p>
        )}
      </div>
    </div>
  );
}
