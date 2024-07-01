import React, {useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../services/auth.service";

import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

import { toast } from 'sonner'
import {Input, Button, DatePicker, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const isValidDate = (date) => {
    if (!date) return false;
    try {
        return date.calendar && !isNaN(new Date(date.toString({ calendar: 'gregory' })).getTime());
    } catch {
        return false;
    }
};


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [identification, setIdentification] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(parseDate("1999-10-30"));
    const [birthDateError, setBirthDateError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [isVisible, setIsVisible] = React.useState(false);
    const [isVisibleB, setIsVisibleB] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityB = () => setIsVisibleB(!isVisibleB);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Date formatter for yyyy-MM-dd format
    const dateFormatter = useDateFormatter({ dateStyle: "short" });


    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [navigate]);


    const handleRegister = async (e) => {
        e.preventDefault();

        const formattedBirthDate = birthDate.toString({ calendar: 'gregory', timeZone: getLocalTimeZone() });

        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (!isValidDate(birthDate)) {
            setBirthDateError("Por favor, ingrese una fecha valida");
            toast.error('Por favor, ingrese una fecha valida');
            return;
        }

        try {
            await AuthService.signup({
                username,
                email,
                password,
                name,
                lastName,
                identification,
                birthDate: formattedBirthDate,
            });

            toast.success('Usuario registrado correctamente');
            
            setTimeout(() => {
                navigate("/login");
                window.location.reload();
            }, 1000);
        } catch (error) {
            setErrorMessage(error.message);
            toast.error(error.message);
        }
    };


    const handleDateChange = (date) => {
        setBirthDate(date);
        if (!isValidDate(date)) {
            setBirthDateError("Por favor, ingrese una fecha valida");
            toast.error('Por favor, ingrese una fecha valida');
        } else {
            setBirthDateError("");
        }
    };


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
                        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
                        <form onSubmit={handleRegister} className="space-y-4">
                            <Input isRequired type="text" label="Username" placeholder="Ingrese su username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <Input isRequired type="email" label="Correo" placeholder="Ingrese su correo" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Input isRequired type="text" label="Nombre" placeholder="Ingrese su nombre" value={name} onChange={(e) => setName(e.target.value)}/>
                            <Input isRequired type="text" label="Apellido" placeholder="Ingrese su apellido" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            <Input isRequired type="text" label="Cédula" placeholder="Ingrese su cédula" value={identification} onChange={(e) => setIdentification(e.target.value)}/>
                            <DatePicker isRequired showMonthAndYearPickers errorMessage={birthDateError} formatOptions={{ year: "numeric", month: "2-digit", day: "2-digit" }} label="Fecha de Nacimiento" value={birthDate} onChange={handleDateChange}/>           
                            <Input 
                                isRequired 
                                label="Contraseña" 
                                placeholder="Ingrese su contraseña" 
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
                                label="Confirmar Contraseña" 
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
                            <Button type="submit" color="primary" size="lg" className="w-full" variant="shadow">Registrate</Button> 
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
        </>
    );
};
  
export default Register;