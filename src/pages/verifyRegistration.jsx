// src/pages/VerifyRegistration.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AuthService from '../services/auth.service';

import { toast } from 'sonner';
import { Button, Link } from '@nextui-org/react';

const VerifyRegistration = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await AuthService.verifyRegistration(token);
        setMessage(response.message);
        toast.success(response.message || 'Usuario verificado con éxito');
      } catch (error) {
        setMessage(error.message);
        toast.error(error.message || 'Error desconocido');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div>
      <section class="py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="xl:p-24 gap-32 p-12 rounded-2xl bg-gradient-to-r from-green-400 to-teal-400 flex  justify-between flex-col-reverse lg:flex-row">
            <div class="w-full lg:w-2/6 relative">
              <img src="https://pagedone.io/asset/uploads/1696241449.png" alt="CTA tailwind section" class="xl:absolute xl:bottom-0 -mb-12 mx-auto lg:-mb-12 xl:-mb-24 lg:mx-0"/>
            </div>
            <div class="w-full lg:w-2/3">
              <h2 class="font-manrope text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-7 text-center lg:text-left">
                Confirmación de Registro
              </h2>
              <p class="text-lg text-white leading-8 mb-12 text-center lg:text-left">
                {message}
              </p>
              <div class="flex items-center flex-col gap-5 md:flex-row lg:justify-start justify-center">
                <Button as={Link} href="/login" color="primary">
                  Iniciar Sesión
                </Button>
                <Button as={Link} color="default" href="/register">
                  Registrarme
                </Button> 
              </div>
            </div>
          </div>
        </div>
      </section>                                        
    </div>
  );
};

export default VerifyRegistration;
