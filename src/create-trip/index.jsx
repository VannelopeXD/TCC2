import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { LogIn } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData); // Verificar mudanças no formData
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codResp) => GetUserProfile(codResp),  // Obter perfil após sucesso
    onError: (error) => console.log(error)
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData.noOfDays) {
      toast("Preencha todos os campos");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget); //quebrar o prompt
      

    const result = await chatSession.sendMessage(FINAL_PROMPT);
  

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    // Limpeza de qualquer texto fora do JSON (aspas triplas, blocos ```json etc.)
    let formattedTripData = TripData.trim();

    // Remover prefixos como ```json ou ``` e outros caracteres indesejados
    console.log("Antes de formatar:",formattedTripData)
    if (formattedTripData.startsWith('```json') || formattedTripData.startsWith('```')) {
      formattedTripData = formattedTripData.replace(/```json|```/g, '');
      console.log("Depois de formatar:",formattedTripData)
    }

    // Usando regex para remover qualquer coisa antes do primeiro '{' e depois do último '}'
    const jsonStart = formattedTripData.indexOf('{');
    const jsonEnd = formattedTripData.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      formattedTripData = formattedTripData.substring(jsonStart, jsonEnd + 1);
    } else {
      console.error("Formato inesperado: JSON não encontrado na resposta");
      toast.error("Erro ao salvar o roteiro. Formato inválido de JSON.");
      setLoading(false);
      return;
    }

    try {

      const parsedTripData = JSON.parse(formattedTripData);

      // Salva o objeto JSON corretamente no Firestore
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData,  // Usa o objeto JSON parseado
        userEmail: user?.email,
        id: docId
      });

      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Erro ao parsear o JSON: ", error);
      toast.error("Erro ao salvar o roteiro. Formato inválido de JSON.");
    }

    setLoading(false);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);  // Fechar diálogo após login
      onGenerateTrip();
    }).catch((error) => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Quais são as suas preferências?🚞🤔</h2>
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
              onClick={() => handleInputChange('traveler', item.Pessoas)}
              className={`p-4 border cursor-pointer rounded-lg
            hover:shadow-lg
            ${formData?.traveler == item.Pessoas && 'shadow-lg border-black'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className={loading ? 'cursor-not-allowed opacity-50' : ''}
        >
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Gerar Roteiro'
          }
        </Button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-7'>Continuar com o Google</h2>
              <p>Google Authentication</p>

              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7' />
                Entre com a sua conta Google!
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
