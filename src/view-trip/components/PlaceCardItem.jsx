import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ plano }) { 
  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    plano&&GetPlacePhoto();
  }, [plano])
  const GetPlacePhoto=async()=>{
    const data ={
      textQuery:plano?.nomeDoLugar
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);

    })  
  }
    return (
        <Link 
          to={`https://www.google.com/maps/search/?api=1&query=${plano?.nomeDoLugar}`} 
          target='_blank'
          className="text-current no-underline focus:outline-none hover:text-current"
        >
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img 
            src={photoUrl?photoUrl:'/hoteis.jpg'} // Atualizar conforme a URL correta da imagem do 'plano'
            alt={plano.nomeDoLocal}
            className='w-[130px] h-[130px] rounded-xl object-cover'
            />
            <div>
            <h2 className='font-bold text-lg'>{plano.nomeDoLugar}</h2> 
            <p className='text-sm'>{plano.detalhesDoLugar}</p>
            <h2 className='mt-2'>⏰ {plano.tempoDeViagem}</h2>
            </div>
        </div>
      </Link>
    )
}

export default PlaceCardItem;
