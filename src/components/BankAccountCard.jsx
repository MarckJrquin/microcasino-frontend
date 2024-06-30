import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import BillingService from "../services/billing.service";

import UserBankAccountModal from "./UserBankAccountModal";

import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar  } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Card, CardBody, Avatar, Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';


const BankAccountCard = ({ bankAccount, userData, refreshUserBankAccounts }) => {

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const [openUserBankAccountModal, setOpenUserBankAccountModal] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await BillingService.deleteUserBankAccount(bankAccount.id, userData.userId );
            toast.success('Cuenta bancaria eliminada exitosamente');
            onClose();
            refreshUserBankAccounts();
        } catch (error) {
            toast.error(error.message || 'Error al eliminar la cuenta bancaria');
        }
    };

    const handleSetFavorite = async () => {
        try {
            await BillingService.setFavoriteBankAccount(bankAccount.id, userData.userId);
            toast.success('Dirección marcada como favorita');
            refreshUserBankAccounts();
        } catch (error) {
            toast.error(error.message || 'Error al marcar como favorita');
        }
    };

    const handleUserBankAccountModal = () => {
        setOpenUserBankAccountModal(true);
    }

    const handleCloseUserBankAccountModal = () => {
        setOpenUserBankAccountModal(false);
    }

    return (
        <>
            <Card>
                <CardBody className='bg-zinc-50 dark:bg-zinc-800'>
                    <div className="flex items-start space-x-4 ">
                        <div className='flex flex-col items-center gap-2'>
                            <Button 
                            isIconOnly 
                            size='sm'
                            color="primary" 
                            variant={ bankAccount.isFavorite ? 'shadow' : 'ghost'}
                            onClick={handleSetFavorite}>
                                <FontAwesomeIcon icon={ bankAccount.isFavorite ? faStar : faStarRegular}/>
                            </Button>
                            <Avatar alt="Avatar" size='md' name={bankAccount.accountHolder}/>
                        </div>
                        <div className='w-full flex flex-col sm:flex-row justify-between gap-2'>
                            <div>
                                <div className='flex gap-2 mb-2'>
                                    <h4>{bankAccount.accountHolder}</h4>
                                    <Chip color={bankAccount.isFavorite ? 'success' : 'default'} size="sm" variant="flat">
                                        {bankAccount.isFavorite ? 'favorito' : 'No favorito'}
                                    </Chip>
                                </div>
                                <p>{bankAccount.accountHolder}</p>
                                <p>{bankAccount.accountNumber }</p>
                            </div>
                            <div>
                                <div className="flex flex-col gap-2">
                                    <Button color="primary" onClick={handleUserBankAccountModal}>Editar</Button>
                                    <Button color="danger" onClick={onOpen}>Eliminar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <UserBankAccountModal
            userData={userData}
            bankAccount={bankAccount}
            open={openUserBankAccountModal}
            onClose={handleCloseUserBankAccountModal}
            refreshUserBankAccounts={refreshUserBankAccounts}
            />

            <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement='auto'
            scrollBehavior='inside'
            backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader>Eliminar Cuenta Bancaria</ModalHeader>
                        <ModalBody>¿Está seguro que desea eliminar esta cuenta bancaria?</ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onClick={onClose}>Cancelar</Button>
                            <Button color="danger" onClick={handleDelete}>Eliminar</Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default BankAccountCard;