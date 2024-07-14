import React, { useEffect, useState } from 'react';

import ProfileService from '../services/profile.service';

import { toast } from 'sonner';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, DatePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const isValidDate = (date) => {
    if (!date) return false;
    try {
        return date.calendar && !isNaN(new Date(date.toString({ calendar: 'gregory' })).getTime());
    } catch {
        return false;
    }
};


const UserChangePasswordModal = ( props ) => {

    const { open, onClose, profileData, refreshProfileData } = props;

    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleB, setIsVisibleB] = useState(false);
    const [isVisibleC, setIsVisibleC] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.password) newErrors.password = "La contraseña es requerida";
        if (!formData.newPassword) newErrors.newPassword = "La nueva contraseña es requerida";
        if (!formData.confirmNewPassword) newErrors.confirmNewPassword = "La confirmación de la contraseña es requerida";
        if (formData.newPassword !== formData.confirmNewPassword) newErrors.confirmNewPassword = "Las contraseñas no coinciden";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityB = () => setIsVisibleB(!isVisibleB);
    const toggleVisibilityC = () => setIsVisibleC(!isVisibleC);
    
    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const response = await ProfileService.editPassword(formData);
            toast.success(response.message || "Perfil actualizado exitosamente");
            onClose();
            refreshProfileData();
        } catch (error) {
            toast.error(error.message || 'Error actualizando el perfil');
        }
    };

    return (
        <>
            <Modal 
                isOpen={open} 
                onClose={onClose}
                size='xl'
                placement='auto'
                scrollBehavior='inside'
                backdrop='blur'
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">
                        Editar Contraseña
                    </ModalHeader>
                    <ModalBody>
                        <form class="grid grid-cols-1 gap-6 m-2 md:m-4">
                        <Input 
                            isRequired 
                            name="password"
                            label="Contraseña Actual" 
                            placeholder="Ingrese su contraseña actual" 
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
                            name="newPassword"
                            label="Nueva Contraseña" 
                            placeholder="Ingrese su nueva contraseña" 
                            value={formData.newPassword}
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
                            isInvalid={!!errors.newPassword}
                            errorMessage={errors.newPassword}
                            />
                            
                            <Input 
                            isRequired 
                            name="confirmNewPassword"
                            label="Confirmar Nueva Contraseña" 
                            placeholder="Confirme su nueva contraseña" 
                            value={formData.confirmNewPassword}
                            onChange={handleInputChange}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibilityC}>
                                    {isVisibleC ? (
                                        <FontAwesomeIcon icon={faEyeSlash} className="text-lg text-default-400 pointer-events-none"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} className="text-lg text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isVisibleC ? "text" : "password"}
                            isInvalid={!!errors.confirmNewPassword}
                            errorMessage={errors.confirmNewPassword}
                            />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button color="primary" onPress={handleSubmit}>
                            Guardar
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserChangePasswordModal;