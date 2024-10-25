import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from 'axios';

function Header() {
  const [openDailog, setOpenDailog] = useState(false);

  // Verifica se o dado existe no localStorage antes de fazer o parse
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  // Mover o hook useGoogleLogin para dentro do componente
  const login = useGoogleLogin({
    onSuccess: (codResp) => GetUserProfile(codResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload();
    }).catch((error) => {
      console.error('Error fetching user profile:', error);
    });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' alt="Logo" />
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
             <a href='/create-trip'>
            <Button variant='outline' className='rounded-full'>Criar novo Roteiro!</Button>
            </a>
            <a href='/my-trips'>
            <Button variant='outline' className='rounded-full'>Meus Roteiros</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[40px] w-[40px] rounded-full' alt="User" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Sair</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' alt="Logo" />
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

export default Header;
