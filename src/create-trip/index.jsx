import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { replace } from 'react-router-dom';
import { chatSession } from '@/service/AIModal';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({}); // Inicializar como objeto

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData); // Verificar mudanças no formData
  }, [formData]);

  const onGenerateTrip=async() => {
    // Correção na condição
    if (formData.noOfDays >30&&!formData?.location||!formData?.budget||!formData?.traveler) {
      toast("Preencha todos os campos")
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);

    const result =await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());

  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Qual é a suas preferências?🚞🤔</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Forneça informações básicas e seu roteiro de viagens sairá perfeito!
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Qual é o seu destino?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v.label || v);
              },
            }}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Quantos dias será a sua viagem?</h2>
        <Input
          placeholder={'Ex. 3'}
          type='number'
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Qual seria o Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer 
            rounded-lg hover:shadow-lg
            ${formData?.budget == item.title && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Como você pretende passar sua viagem?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg
            hover:shadow-lg
            ${formData?.traveler == item.people && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={onGenerateTrip}>Gerar Roteiro</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
