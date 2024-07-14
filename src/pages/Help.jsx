import React, { useState, useEffect } from 'react';

import HelpCenterService from '../services/helpCenter.service';

import { Card, CardHeader, CardBody, Input, Textarea, Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';

const Help = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleClearInputChange = (name) => {
        setFormData({ ...formData, [name]: '' });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "El Nombre es requerido";
        if (!formData.lastname) newErrors.lastname = "El apellido es requerido";
        if (!formData.email) newErrors.email = "El email es requerido";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo no tiene un formato adecuado";
        if (!formData.message) newErrors.message = "El mensaje es requerido";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setFormData({
            username: "",
            password: "",
        });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            console.log(formData);
            const response = await HelpCenterService.createRequest(formData);
            toast.success(response.message || 'Mensaje enviado correctamente');
            clearForm();
        } catch (error) {
            const errorMsg = error.message || 'Error desconocido';
            setErrorMessage(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <section className="px-5 md:px-8 lg:px-16 bg-white dark:bg-zinc-900">
            <div className="container px-6 md:px-16 py-12 mx-auto ">
                <div>
                    <p className="font-medium text-blue-500 dark:text-blue-400">Contáctanos</p>
                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Chatea con nuestro amigable equipo</h1>
                    <p className="mt-3 text-gray-500 dark:text-gray-400">Nos encantaría saber de usted. Por favor complete este formulario o envíenos un correo electrónico.</p>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Nuestro amigable equipo está aquí para ayudarlo.</p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">hello@world.com</p>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>
                            
                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Live chat</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Nuestro amigable equipo está aquí para ayudarlo.</p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">Iniciar un chat</p>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>
                            
                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Oficinas</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Ven a saludar a nuestra oficina central.</p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">Curundú</p>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </span>
                            
                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Teléfono</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Lun-Vie de 8am a 5pm.</p>
                            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">(507) 234-5678</p>
                        </div>
                    </div>

                    <Card className='bg-black-900'>
                        <form onSubmit={handleSendMessage}>
                            <div className='flex flex-col p-8 gap-5 lg:gap-6'>
                                <div className='flex flex-col md:flex-row gap-6'>
                                    <Input 
                                    isRequired
                                    isClearable
                                    size='lg'
                                    type='text'
                                    name='name'
                                    label="Nombre"
                                    placeholder="Nombre" 
                                    labelPlacement="outside"
                                    value={formData.name} 
                                    onChange={handleInputChange}
                                    onClear={() => handleClearInputChange("name")}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name}
                                    />

                                    <Input 
                                    isRequired
                                    isClearable
                                    size='lg'
                                    type='text'
                                    name='lastname'
                                    label="Apellido"
                                    placeholder="Apellido" 
                                    labelPlacement="outside"
                                    value={formData.lastname} 
                                    onChange={handleInputChange}
                                    onClear={() => handleClearInputChange("lastname")}
                                    isInvalid={!!errors.lastname}
                                    errorMessage={errors.lastname}
                                    />
                                </div>

                                <div>
                                    <Input 
                                    isRequired 
                                    isClearable
                                    size='lg'
                                    type='text'
                                    name='email'
                                    label="Correo"
                                    placeholder="Email" 
                                    labelPlacement="outside"
                                    value={formData.email} 
                                    onChange={handleInputChange}
                                    onClear={() => handleClearInputChange("email")}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email}
                                    />
                                </div>

                                <div>
                                    <Textarea 
                                    isRequired 
                                    isClearable
                                    size='lg'
                                    name='message'
                                    label="Mensaje"
                                    placeholder="Mensaje" 
                                    labelPlacement="outside"
                                    value={formData.message} 
                                    onChange={handleInputChange}
                                    onClear={() => handleClearInputChange("message")}
                                    isInvalid={!!errors.message}
                                    errorMessage={errors.message}
                                    />
                                </div>

                                <div>
                                    <Button
                                    type='submit'
                                    size='md'
                                    color='primary'
                                    variant='shadow'
                                    fullWidth
                                    startContent={<FontAwesomeIcon icon={faPaperPlane} />}
                                    >
                                        Enviar Mensaje
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default Help;