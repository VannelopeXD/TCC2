import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

export default function InfoSection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState();
  
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const photo = resp.data.places[0]?.photos?.[4]?.name;
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', photo);
      setPhotoUrl(photoUrl);
    });
  };

  const travelerCount = trip?.userSelection?.traveler?.replace(' People', ''); // Remover 'People' da string

  return (
    <div>
      <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='h-[400px] w-full object-cover rounded-xl' />
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location || 'Localização não disponível'}</h2>
          <div className='flex flex-wrap gap-2 sm:gap-5 mt-2'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>📅{trip?.userSelection?.noOfDays} Dias</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>💲{trip?.userSelection?.budget}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>👥 Viajantes: {travelerCount}</h2>
          </div>  
        </div>
        <Button className='mt-4 sm:mt-0'><IoIosSend /></Button>
      </div>
    </div>
  );
}
