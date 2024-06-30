import React, { useState } from "react";

import BillingService from "../services/billing.service";

import { toast } from "sonner";
import { Button, Input, DatePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, user } from '@nextui-org/react';
import { parseDate, parseZonedDateTime, parseAbsoluteToLocal} from "@internationalized/date";

const UserPaymentCardModal = (props) => {

    const { userData, paymentCard, open, onClose, refreshPaymentCards } = props;

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [formValues, setFormValues] = useState({
        userId: userData.userId,
        name: paymentCard?.name || "",
        number: paymentCard?.number || "",
        expiryDate : paymentCard?.expiryDate  || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear().toString().slice(-2)}`;
            setFormValues({ ...formValues, expiryDate: formattedDate });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsButtonDisabled(true);
    
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 1000);
    
        try {
            if (paymentCard?.id) {
                try {
                    await BillingService.updateUserPaymentCard(paymentCard.id, formValues);
                    toast.success('Dirección actualizada exitosamente');
                    (formValues);
                    setTimeout(() => {
                        onClose();
                        refreshPaymentCards();
                    }, 1000);
                } catch (error) {
                    toast.error('Error al actualizar la dirección');
                }
            } else {
                try {
                    console.log(formValues);
                    await BillingService.createUserPaymentCard(formValues);
                    toast.success('Dirección actualizada exitosamente');
                    (formValues);
                    setTimeout(() => {
                        onClose();
                        refreshPaymentCards();
                    }, 1000);
                } catch (error) {
                    toast.error(error.message || 'Error al crear la dirección');
                }
            }
        } catch (error) {
            toast.error(error.message || 'Error al guardar la dirección');
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
                        {paymentCard?.id ? 'Editar Tarjeta' : 'Agregar Tarjeta'}
                    </ModalHeader>
                    <ModalBody>
                        <form id='payment-card-form' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-5 md:m-9 md:grid-cols-2">
                            <Input 
                            size="lg" 
                            type="text" 
                            label="Titular de la Tarjeta" 
                            labelPlacement="outside" 
                            placeholder="Titular de la Tarjeta"
                            name="name"
                            value={formValues.name} 
                            onChange={handleChange}
                            isRequired={paymentCard?.id ? false : true}
                            />

                            <Input 
                            size="lg" 
                            type="text" 
                            label="Número de Tarjeta" 
                            labelPlacement="outside" 
                            placeholder="Número de Tarjeta"
                            name="number"
                            value={formValues.number} 
                            onChange={handleChange}
                            isRequired={paymentCard?.id ? false : true}
                            />

                            <DatePicker 
                            size='lg'
                            label="Fecha de Nacimiento"
                            labelPlacement='outside'
                            name="expiryDate"
                            showMonthAndYearPickers
                            isRequired={paymentCard?.id ? false : true} 
                            />    
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button form='payment-card-form' color="primary" type='submit' isDisabled={isButtonDisabled}>
                            Guardar
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserPaymentCardModal;