import React, { useEffect, useState } from 'react';

import ProfileService from '../services/profile.service';

import { toast } from 'sonner';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, DatePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";


const isValidDate = (date) => {
    if (!date) return false;
    try {
        return date.calendar && !isNaN(new Date(date.toString({ calendar: 'gregory' })).getTime());
    } catch {
        return false;
    }
};


const UserProfileModal = ( props ) => {

    const { open, onClose, profileData, refreshProfileData } = props;

    const [formData, setFormData] = useState(profileData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleDateChange = (date) => {

        if (!isValidDate(date)) {
            toast.error('Por favor, ingrese una fecha valida');
        } 
        setFormData({ ...formData, birthDate: date.toString() });
    };
    
    const handleSubmit = async () => {
        try {
            await ProfileService.editProfile({...formData});
            toast.success("Perfil actualizado exitosamente");
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
                        Editar perfil
                    </ModalHeader>
                    <ModalBody>
                        <form class="grid grid-cols-1 gap-6 m-2 md:m-4 md:grid-cols-2">
                        <Input
                          size="lg"
                          type="email"
                          label="Email"
                          labelPlacement="outside"
                          placeholder="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <Input
                          size="lg"
                          type="text"
                          label="Username"
                          labelPlacement="outside"
                          placeholder="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        <Input
                          size="lg"
                          type="text"
                          label="Nombre"
                          labelPlacement="outside"
                          placeholder="nombre"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <Input
                          size="lg"
                          type="text"
                          label="Apellido"
                          labelPlacement="outside"
                          placeholder="apellido"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        <Input
                          size="lg"
                          type="text"
                          label="Cédula"
                          labelPlacement="outside"
                          placeholder="cédula"
                          name="identification"
                          value={formData.identification}
                          onChange={handleChange}
                        />
                        <DatePicker
                          size="lg"
                          showMonthAndYearPickers
                          label="Fecha de Nacimiento"
                          labelPlacement="outside"
                          formatOptions={{ year: "numeric", month: "2-digit", day: "2-digit" }}
                          value={parseDate(formData.birthDate)}
                          onChange={handleDateChange}
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

export default UserProfileModal;