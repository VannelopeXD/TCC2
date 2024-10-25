import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ plano }) { 
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (plano) {
      GetPlacePhoto();
    }
  }, [plano]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: plano?.nomeDoLugar
      };

      const result = await GetPlaceDetails(data);
      
      // Check if places, photos, and the photo at index 3 exist
      const photos = result.data?.places?.[0]?.photos;
      if (photos && photos[3]?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photos[3].name);
        setPhotoUrl(photoUrl);
      } else {
        console.warn("Photo not found. Using default image.");
        setPhotoUrl('/hoteis.jpg'); // Default image if photos[3] is unavailable
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl('/hoteis.jpg'); // Set default image on error
    }
  };

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${plano?.nomeDoLugar}`} 
      target='_blank'
      className="text-current no-underline focus:outline-none hover:text-current"
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img 
          src={photoUrl || '/hoteis.jpg'}
          alt={plano?.nomeDoLugar || 'Local'}
          className='w-[130px] h-[130px] rounded-xl object-cover'
        />
        <div>
          <h2 className='font-bold text-lg'>{plano?.nomeDoLugar}</h2> 
          <p className='text-sm'>{plano?.detalhesDoLugar}</p>
          <h2 className='mt-2'>⏰ {plano?.tempoDeViagem}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
