import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotéis, index }) {
    const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    hotéis&&GetPlacePhoto();
  }, [hotéis])
  const GetPlacePhoto=async()=>{
    const data ={
      textQuery:hotéis?.nomeDoHotel
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[4].name);

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
      setPhotoUrl(PhotoUrl);

    })  
  }

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${hotéis?.nomeDoHotel || hotéis?.hotelName},${hotéis?.endereçoDoHotel || hotéis?.hotelAddress}`} 
      target='_blank'
    >
      <div key={index} className='hover:scale-105 transition-all cursor-pointer hotel-item'>
        <img src={photoUrl?photoUrl:'/hoteis.jpg'} alt={`Hotel ${index}`} className='rounded-xl h-[200px] w-full object-cover' />
        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotéis?.nomeDoHotel || hotéis?.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📍{hotéis?.endereçoDoHotel || hotéis?.hotelAddress}</h2>
          <h2 className='text-sm'>🪙{hotéis?.preço || hotéis?.price}</h2>
          <h2 className='text-sm'>⭐{hotéis?.classificação || hotéis?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
