import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthService from "../services/auth.service";

import { toast } from 'sonner'
import { Input, Button, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const PasswordReset = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const { token } = useParams();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.newPassword) newErrors.newPassword = "La nueva contraseña es requerida";
        if (!formData.confirmNewPassword) newErrors.confirmNewPassword = "La confirmación de la nueva contraseña es requerida";
        if (formData.newPassword !== formData.confirmNewPassword) newErrors.confirmNewPassword = "Las contraseñas no coinciden";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setFormData({
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (formData.newPassword !== formData.confirmNewPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            toast.error('Las contraseñas no coinciden');
            return;
        }

        try {
            const user = await AuthService.resetPassword(token, formData.newPassword);
            if (user) {
                console.log(user);
                toast.success(user.message || 'Contraseña recuperada con éxito');

                setTimeout(() => {
                    clearForm();
                    navigate("/login");
                    window.location.reload();
                }, 2000);
            } else {
                setErrorMessage(error.message || 'Usuario o contraseña incorrectos');
                toast.error(error.message || 'Usuario o contraseña incorrectos');
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

                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <Input 
                            isRequired 
                            name="newPassword"
                            label="Nueva Contraseña" 
                            placeholder="Ingrese su nueva contraseña" 
                            value={formData.newPassword} 
                            onChange={handleInputChange}
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
                            isInvalid={!!errors.newPassword}
                            errorMessage={errors.newPassword}
                            />

                            <Input 
                            isRequired 
                            name="confirmNewPassword"
                            label="Confirmar contraseña" 
                            placeholder="Confirme su contraseña" 
                            value={formData.confirmNewPassword} 
                            onChange={handleInputChange}
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
                            isInvalid={!!errors.confirmNewPassword}
                            errorMessage={errors.confirmNewPassword}
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

export default PasswordReset;