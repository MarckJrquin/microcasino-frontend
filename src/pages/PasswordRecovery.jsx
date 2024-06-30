import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthService from "../services/auth.service";

import { Toaster, toast } from 'sonner'
import { Input, Button, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const PasswordRecovery = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const [isVisible, setIsVisible] = React.useState(false);
    const [isVisibleB, setIsVisibleB] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityB = () => setIsVisibleB(!isVisibleB);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [navigate]);

    const handleRecovery = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const user = await AuthService.forgotPassword(username, password);
            if (user) {
                toast.success('Contraseña recuperada con éxito');

                setTimeout(() => {
                    navigate("/login");
                    window.location.reload();
                }, 1000);
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
                        <Toaster richColors closeButton position="bottom-right"/>
                        <form onSubmit={handleRecovery} className="space-y-4">
                            <Input isRequired type="text" label="Username" placeholder="Ingrese su username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <Input 
                                isRequired 
                                label="Nueva Contraseña" 
                                placeholder="Ingrese su nueva contraseña" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                      {isVisible ? (
                                        <FontAwesomeIcon icon={faEyeSlash} className="text-lg text-default-400 pointer-events-none"/>
                                      ) : (
                                        <FontAwesomeIcon icon={faEye} className="text-lg text-default-400 pointer-events-none"/>
                                      )}
                                    </button>
                                  }
                                type={isVisible ? "text" : "password"}
                            />
                            <Input 
                                isRequired 
                                label="Confirmar contraseña" 
                                placeholder="Confirme su contraseña" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityB}>
                                      {isVisibleB ? (
                                        <FontAwesomeIcon icon={faEyeSlash} className="text-lg text-default-400 pointer-events-none"/>
                                      ) : (
                                        <FontAwesomeIcon icon={faEye} className="text-lg text-default-400 pointer-events-none"/>
                                      )}
                                    </button>
                                  }
                                type={isVisibleB ? "text" : "password"}
                            />
                            <Button type="submit" color="primary" size="lg" className="w-full" variant="shadow">Recuperar</Button>  
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