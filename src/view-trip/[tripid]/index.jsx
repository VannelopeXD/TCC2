import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripid } = useParams();
    const [trip, setTrip] = useState(null); // Inicialize com null para diferenciar entre dados vazios e em carregamento

    useEffect(() => {
        if (tripid) {
            GetTripData();
        }
    }, [tripid]);

    const GetTripData = async () => {
        try {
            const docRef = doc(db, 'AITrips', tripid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const tripData = docSnap.data();

                // Assumindo que tripData já é um objeto. Se você tiver certeza que é sempre um objeto, não precisa de JSON.parse.
                console.log("Documento:", tripData);

                setTrip(tripData); // Defina o estado como o objeto completo.
            } else {
                console.log("Sem documento!");
                toast.error("Roteiro não encontrado"); // Corrigido para toast.error
            }
        } catch (error) {
            console.error("Erro ao buscar o documento:", error);
            toast.error("Erro ao buscar os dados da viagem");
        }
    };

    // Adiciona um fallback caso o trip ainda esteja carregando
    if (!trip) {
        return <p>Carregando...</p>;
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* {Informações} */}
            <InfoSection trip={trip} />
            {/* {Hotéis recomendados} */}
            <Hotels trip={trip} />

            {/* {Planos para o dia} */}
            <PlacesToVisit trip={trip}/>
            
            {/* {Footer} */}
            <Footer trip={trip}/>
        </div>
    );
}

export default Viewtrip;
