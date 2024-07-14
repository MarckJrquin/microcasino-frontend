import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthService from "../services/auth.service";

import VerifyEmailModal from '../components/VerifyEmailModal';

import { toast } from 'sonner'
import {Input, Button, DatePicker, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

import {parseDate, getLocalTimeZone} from "@internationalized/date";


const isValidDate = (date) => {
    if (!date) return false;
    try {
        return date.calendar && !isNaN(new Date(date.toString({ calendar: 'gregory' })).getTime());
    } catch {
        return false;
    }
};


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        identification: "",
        name: "",
        lastName: "",
        birthDate: parseDate("1999-10-30")
    });
    const [registerData, setRegisterData ] = useState(null);
    const [errors, setErrors] = useState({});
    const [openVerifyEmailModal, setOpenVerifyEmailModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleB, setIsVisibleB] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleClearInputChange = (name) => {
        setFormData({ ...formData, [name]: '' });
        setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, birthDate: date });
        if (!isValidDate(date)) {
            setErrors({ ...errors, birthDate: "Por favor, ingrese una fecha valida" });
        } else {
            setErrors({ ...errors, birthDate: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "El username es requerido";
        if (!formData.email) newErrors.email = "El correo es requerido";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El correo no tiene un formato adecuado";
        if (!formData.name) newErrors.name = "El nombre es requerido";
        if (!formData.lastName) newErrors.lastName = "El apellido es requerido";
        if (!formData.identification) newErrors.identification = "La cédula es requerida";
        if (!formData.password) newErrors.password = "La contraseña es requerida";
        if (!formData.confirmPassword) newErrors.confirmPassword = "La confirmación de la contraseña es requerida";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
        if (!isValidDate(formData.birthDate)) newErrors.birthDate = "Por favor, ingrese una fecha valida";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            identification: "",
            name: "",
            lastName: "",
            birthDate: parseDate("1999-10-30")
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formattedBirthDate = formData.birthDate.toString({ calendar: 'gregory', timeZone: getLocalTimeZone() });

        try {
            const response = await AuthService.signup({
                ...formData,
                birthDate: formattedBirthDate,
            });

            setRegisterData(response);
            handleVerifyEmailModal();
            toast.success(response.message || 'Usuario registrado correctamente');
            clearForm();
        } catch (error) {
            setErrors({ ...errors, general: error.message });
            toast.error(error.message);
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityB = () => setIsVisibleB(!isVisibleB);

    const handleVerifyEmailModal = () => {
        setOpenVerifyEmailModal(true);
    }

    const handleCloseVerifyEmailModal = () => {
        setOpenVerifyEmailModal(false);
    }

    return (
        <> 
            <div className="flex h-full">
                <div className="hidden lg:flex items-center justify-center flex-1 text-black bg-white dark:bg-gray-900">
                    <div className="h-full w-full">
                        <img className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/19045723/pexels-photo-19045723/free-photo-of-interior-of-a-casino.jpeg" alt="Imagen" />
                    </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-900 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-xl w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black dark:text-white text-center">Registro</h1>
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
                            <p>o usa tu cuenta</p>
                        </div>
                        {errors.general && <div className="text-red-500 text-center mb-4">{errors.general}</div>}
                        <form onSubmit={handleRegister} className="space-y-4">
                            <Input 
                            isRequired 
                            isClearable
                            type="text" 
                            name="username"
                            label="Username" 
                            placeholder="Ingrese su username" 
                            value={formData.username}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("username")}
                            isInvalid={!!errors.username}
                            errorMessage={errors.username}
                            />

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

                            <Input 
                            isRequired
                            isClearable
                            type="text"
                            name="name"
                            label="Nombre"
                            placeholder="Ingrese su nombre"
                            value={formData.name}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("name")}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name}
                            />

                            <Input 
                            isRequired
                            isClearable
                            type="text"
                            name="lastName"
                            label="Apellido"
                            placeholder="Ingrese su apellido"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("lastName")}
                            isInvalid={!!errors.lastName}
                            errorMessage={errors.lastName}
                            />

                            <Input 
                            isRequired
                            isClearable
                            type="text"
                            name="identification"
                            label="Cédula"
                            placeholder="Ingrese su cédula"
                            value={formData.identification}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("identification")}
                            isInvalid={!!errors.identification}
                            errorMessage={errors.identification}
                            />

                            <DatePicker 
                            isRequired 
                            showMonthAndYearPickers 
                            errorMessage={errors.birthDate}
                            formatOptions={{ year: "numeric", month: "2-digit", day: "2-digit" }} 
                            label="Fecha de Nacimiento" 
                            value={formData.birthDate} 
                            onChange={handleDateChange}
                            isInvalid={!!errors.birthDate}
                            />           
                            
                            <Input 
                            isRequired 
                            name="password"
                            label="Contraseña" 
                            placeholder="Ingrese su contraseña" 
                            value={formData.password}
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
                            isInvalid={!!errors.password}
                            errorMessage={errors.password}
                            />
                            
                            <Input 
                            isRequired 
                            name="confirmPassword"
                            label="Confirmar Contraseña" 
                            placeholder="Confirme su contraseña" 
                            value={formData.confirmPassword}
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
                            isInvalid={!!errors.confirmPassword}
                            errorMessage={errors.confirmPassword}
                            />

                            <Button 
                            type="submit" 
                            color="primary" 
                            size="lg" 
                            className="w-full" 
                            variant="shadow">
                                Registrate
                            </Button> 
                        </form>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                            <p>¿Ya tienes una cuenta?
                                <Link isBlock showAnchorIcon href="/login" color="primary" className="ml-1">
                                    Iniciar Sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <VerifyEmailModal 
            open={openVerifyEmailModal} 
            onClose={handleCloseVerifyEmailModal} 
            registerData={registerData} 
            />
        </>
    );
};
  
export default Register;