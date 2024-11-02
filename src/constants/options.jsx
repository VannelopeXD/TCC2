export const SelectTravelesList=[
    {
        id: 1,
        title: 'Viajante Solo',
        desc: 'Um viajante em busca de exploração',
        icon: '✈️',
        Pessoas: '1 Pessoa'
    },
    {
        id: 2,
        title: 'Casal',
        desc: 'Dois viajantes em sintonia',
        icon: '🥂',
        Pessoas: '2 Pessoas'
    },
    {
        id: 3,
        title: 'Família',
        desc: 'Um grupo de aventureiros divertidos',
        icon: '🏡',
        Pessoas: '3 a 5 Pessoas'
    },
    {
        id: 4,
        title: 'Amigos',
        desc: 'Um grupo de buscadores de emoções',
        icon: '⛵',
        Pessoas: '5 a 10 Pessoas'
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Barato',
        desc: 'Fique atento aos custos',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderado',
        desc: 'Mantenha os custos em um nível médio',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxo',
        desc: 'Não se preocupe com os custos',
        icon: '💸',
    },
];


// export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, Place address, ticket Pricing, and Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. Respond in Portuguese.'
export const AI_PROMPT = `
Gere um plano de viagem para o local: {location}, para {totalDays} dias para {traveler}, com um orçamento de {budget}. 
Forneça uma lista de opções de até 4 hotéis com o nome do hotel, endereço, preço, URL da imagem do hotel, coordenadas geográficas, classificação, descrições 
e sugira um itinerário com o nome do local, detalhes do local, URL da imagem do local, coordenadas geográficas, endereço do local, preço dos ingressos e 
tempo de viagem entre cada um dos locais para {totalDays} dias, com o plano de cada dia incluindo o melhor horário para visita.

Responda **somente** no seguinte formato JSON abaixo, sem nenhum texto adicional, certificando-se de que todos os dias estejam dentro de um array no campo "itinerário":

{
  "hotéis": [
    {
      "nomeDoHotel": "Hotel 1",
      "endereçoDoHotel": "Endereço do Hotel 1",
      "preço": "Preço do Hotel 1",
      "urlDaImagemDoHotel": "URL da Imagem do Hotel 1",
      "coordenadasGeográficas": "Coordenadas do Hotel 1",
      "classificação": "Classificação do Hotel 1",
      "descrição": "Descrição do Hotel 1"
    }
  ],
  "itinerário": [
    {
      "dia": "Dia 1",
      "plano": [
        {
          "hora": "Hora da visita",
          "nomeDoLugar": "Nome do Lugar",
          "detalhesDoLugar": "Detalhes do Lugar",
          "urlDaImagemDoLugar": "URL da Imagem do Lugar",
          "coordenadasGeográficas": "Coordenadas do Lugar",
          "endereçoDoLugar": "Endereço do Lugar",
          "preçoDoBilhete": "Preço do Bilhete",
          "tempoDeViagem": "Tempo de Viagem"
        }
      ]
    },
    {
      "dia": "Dia 2",
      "plano": [
        {
          "hora": "Hora da visita",
          "nomeDoLugar": "Nome do Lugar",
          "detalhesDoLugar": "Detalhes do Lugar",
          "urlDaImagemDoLugar": "URL da Imagem do Lugar",
          "coordenadasGeográficas": "Coordenadas do Lugar",
          "endereçoDoLugar": "Endereço do Lugar",
          "preçoDoBilhete": "Preço do Bilhete",
          "tempoDeViagem": "Tempo de Viagem"
        }
      ]
    }
    // Continue até {totalDays} dias
  ]
}
`
