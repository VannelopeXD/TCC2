import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1000000,
  responseMimeType: "application/json", // Força a resposta a ser formatada como JSON puro
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a JSON travel plan for Las Vegas (3 days for a couple on a budget). Provide hotel options including hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates, rating, and description. Suggest an itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, timeToTravel for each location, structured as JSON without markdown formatting.",
        },
      ],
    },
  ],
});

(async () => {
  try {
    const result = await chatSession.sendMessage("Generate the travel plan.");
    let responseText = result.response.text();

    // Remover blocos de código markdown, se existirem
    responseText = responseText.replace(/```json|```/g, '').trim();

    // Verificar e fazer o parse do JSON
    try {
      const parsedData = JSON.parse(responseText);
      console.log(parsedData);
    } catch (error) {
      console.error("Erro ao parsear o JSON: ", error);
    }
  } catch (err) {
    console.error("Erro na requisição de geração de conteúdo: ", err);
  }
})();
