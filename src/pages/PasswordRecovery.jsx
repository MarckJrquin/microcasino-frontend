import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthService from "../services/auth.service";

import { Toaster, toast } from 'sonner'
import { Input, Button, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";


const PasswordRecovery = () => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [navigate]);

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
        if (!formData.email) newErrors.email = "El correo es requerido";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo no tiene un formato adecuado";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setFormData({
            email: "",
        });
    };

    const handleRecovery = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const user = await AuthService.requestPasswordRecovery(formData.email);

            if (user) {
                toast.success(user.message || `Correo para recuperación de contraseña se ha enviado con éxito. Por favor, revise su correo ${email}`);

                setTimeout(() => {
                    clearForm();
                    navigate("/login");
                    window.location.reload();
                }, 1500);
            } else {
                setErrorMessage('Usuario o contraseña incorrectos');
                toast.error('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            setErrorMessage(error.message);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="flex h-screen">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white dark:bg-gray-900">
                    <div className="h-full w-full">
                        <img className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/14355782/pexels-photo-14355782.jpeg" alt="Imagen" />
                    </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-900 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-xl w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black dark:text-white text-center">Recuperación de Contraseña</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 dark:text-gray-300 text-center">¡Únete al mejor casino online y gana!</h1>
                        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                            <div className="w-full flex gap-4 items-center">
                                <Button className="bg-red-600 text-white w-full mb-2 lg:mb-0" startContent={<FontAwesomeIcon icon={faGoogle} />}>
                                    Iniciar Sesión con Google
                                </Button>    
                                <Button className="bg-blue-600 text-white w-full mb-2 lg:mb-0" startContent={<FontAwesomeIcon icon={faFacebook} />}>
                                    Iniciar Sesión con Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 mb-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                            <p>ingresar datos</p>
                        </div>
                        
                        {errorMessage && <p className="text-red-600 text-cente mb-4r">{errorMessage}</p>}

                        <form onSubmit={handleRecovery} className="space-y-4">
                            <Input 
                            isRequired 
                            isClearable
                            type="text" 
                            name="email"
                            label="Correo" 
                            placeholder="Ingrese su correo" 
                            value={formData.email}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("email")}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email}
                            />

                            <Button 
                            type="submit"
                            color="primary" 
                            size="lg" 
                            className="w-full" 
                            variant="shadow">
                                Recuperar
                            </Button>  
                        </form>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                            <p>¿Todo bien, todo correcto?
                                <Link isBlock showAnchorIcon href="/login" color="primary" className="ml-1">
                                    Inicia Sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PasswordRecovery;