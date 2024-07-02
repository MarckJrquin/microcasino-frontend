import React, { useState, useEffect } from "react";

import BillingService from "../services/billing.service";

import { toast } from "sonner";
import { Button, Input, DatePicker, Select, Autocomplete, AutocompleteItem, AccordionItem, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, user } from '@nextui-org/react';


const UserBankAccountModal = ( props ) => {

    const { userData, bankAccount, open, onClose, refreshUserBankAccounts } = props;

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [banks, setBanks] = useState([]);
    const [bankAccountTypes, setBankAccountTypes] = useState([]);
    const [selectedBank, setSelectedBank] = useState(`${bankAccount?.bankNameID}` || "");
    const [selectedBankAccountType, setSelectedBankAccountType] = useState(`${bankAccount?.accountTypeID}` || "");

    const [formValues, setFormValues] = useState({
        accountHolder: bankAccount?.accountHolder || "",
        accountNumber: bankAccount?.accountNumber || "",
        bankNameID: bankAccount?.bankNameID || "",
        accountTypeID : bankAccount?.accountTypeID  || "",
        userId: userData.userId,
    });

    useEffect(() => {
        const fetchBanks = async () => {
          try {
            const data = await BillingService.getBanks();
            setBanks(data);
          } catch (error) {
            toast.error(error.message || 'Error al cargar los bancos');
          }
        };

        const fetchBankAccountTypes = async () => {
            try {
              const data = await BillingService.getBankAccountTypes();
              setBankAccountTypes(data);
            } catch (error) {
              toast.error(error.message || 'Error al cargar los tipos de cuenta de banco');
            }
        };
    
        fetchBanks();
        fetchBankAccountTypes();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsButtonDisabled(true);
    
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 1000);
    
        try {
            if (bankAccount?.id) {
                try {
                    await BillingService.updateUserBankAccount(bankAccount.id, formValues);
                    toast.success('Cuenta bancaria actualizada exitosamente');
                    (formValues);
                    setTimeout(() => {
                        onClose();
                        refreshUserBankAccounts();
                    }, 1000);
                } catch (error) {
                    toast.error(error.message || 'Error al actualizar la cuenta bancaria');
                }
            } else {
                try {
                    await BillingService.createUserBankAccount(formValues);
                    toast.success('Cuenta bancaria guardada exitosamente');
                    (formValues);
                    setTimeout(() => {
                        onClose();
                        refreshUserBankAccounts();
                    }, 1000);
                } catch (error) {
                    toast.error(error.message || 'Error al crear la cuenta bancaria');
                }
            }
        } catch (error) {
            toast.error(error.message || 'Error al guardar la cuenta bancaria');
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
                        {bankAccount?.id ? 'Editar cuenta Bancaria' : 'Agregar Cuenta Bancaria'}
                    </ModalHeader>
                    <ModalBody>
                        <form id='user-bank-account-form' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-5 md:m-9 md:grid-cols-2">
                            <Input 
                            size="lg" 
                            type="text" 
                            label="Titular de la cuenta" 
                            labelPlacement="outside" 
                            placeholder="NOMBRE APELLIDO"
                            name="accountHolder"
                            value={formValues.accountHolder}
                            onChange={handleChange}
                            isRequired={bankAccount?.id ? false : true}
                            />

                            <Input 
                            size="lg" 
                            type="number" 
                            label="Número de la cuenta" 
                            labelPlacement="outside" 
                            placeholder="XXXX XXXX XXXX XXXX"
                            name="accountNumber"
                            value={formValues.accountNumber}
                            onChange={handleChange}
                            isRequired={bankAccount?.id ? false : true}
                            />

                            <Select
                            size='lg'
                            label="Tipo de Cuenta"
                            labelPlacement="outside"
                            placeholder="Seleccionar tipo de cuenta"
                            name="accountTypeID"
                            isRequired={bankAccount?.id ? false : true}
                            defaultSelectedKeys={selectedBankAccountType}
                            onChange={(e) => {
                                setSelectedBankAccountType(e.target.value);
                                setFormValues({ ...formValues, accountTypeID: e.target.value });
                            }}
                            >
                                {bankAccountTypes.map((bankAccountType) => (
                                    <SelectItem 
                                        key={bankAccountType.id}
                                        value={bankAccountType.id}
                                    >
                                        {bankAccountType.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Autocomplete
                            size='lg'
                            label="Seleccionar Banco"
                            labelPlacement='outside'
                            placeholder="Seleccionar banco"
                            selectedKey={selectedBank}
                            onSelectionChange={(key) => {
                                setSelectedBank(key);
                                setFormValues({ ...formValues, bankNameID: key });
                            }}
                            isRequired={bankAccount?.id ? false : true}
                            >
                                {banks.map((bank) => (
                                    <AutocompleteItem 
                                    key={bank.id} 
                                    value={bank.name}
                                    >
                                        {bank.name}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button form='user-bank-account-form' color="primary" type='submit' isDisabled={isButtonDisabled}>
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

export default UserBankAccountModal;