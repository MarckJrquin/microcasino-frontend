import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setMessage } from '../redux/slices/message';

import AddressService from '../services/address.service';

import UserAddressModal from './UserAddressModal';

import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar  } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Card, CardBody, Avatar, Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

const AddressCard = ({ address, userData, refreshAddresses }) => {

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const [openAddressModal, setOpenAddressModal] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await AddressService.deleteUserAddress(userData.userId, address.id);
            toast.success('Dirección eliminada exitosamente');
            //dispatch(setMessage({ message: 'Dirección eliminada exitosamente', type: 'success' }));
            onClose();
            refreshAddresses();
        } catch (error) {
            toast.error(error.message || 'Error al eliminar la dirección');
        }
    };

    const handleSetFavorite = async () => {
        try {
            await AddressService.setFavoriteAddress(userData.userId, address.id);
            toast.success('Dirección marcada como favorita');
            //dispatch(setMessage({ message: 'Dirección marcada como favorita', type: 'success' }));
            refreshAddresses();
        } catch (error) {
            toast.error(error.message || 'Error al marcar como favorita');
        }
    };

    const handleUserAddressModal = () => {
        setOpenAddressModal(true);
    }

    const handleCloseUserAddressModal = () => {
        setOpenAddressModal(false);
    }

    const handleCountryFlag = (countryCode) => {
        return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
    };

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
                        variant={ address.isFavorite ? 'shadow' : 'ghost'}
                        onClick={handleSetFavorite}>
                            <FontAwesomeIcon icon={ address.isFavorite ? faStar : faStarRegular}/>
                        </Button>
                        <Avatar src={handleCountryFlag(address.country)} alt="Avatar" size='md'/>
                    </div>
                    <div className='w-full flex flex-col sm:flex-row justify-between gap-2'>
                        <div>
                            <div className='flex gap-2 mb-2'>
                                <h4>{address.country}</h4>
                                <p>{address.state}</p>
                                <Chip color={address.isFavorite ? 'success' : 'default'} size="sm" variant="flat">
                                    {address.isFavorite ? 'favorito' : 'No favorito'}
                                </Chip>
                            </div>
                            <p>{address.address1}, {address.address2}</p>
                            <p>{address.floorApartmentHouseNumber}, {address.reference}</p>
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <Button color="primary" onClick={handleUserAddressModal}>Editar</Button>
                                <Button color="danger" onClick={onOpen}>Eliminar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>

        <UserAddressModal
        userData={userData}
        address={address}
        open={openAddressModal}
        onClose={handleCloseUserAddressModal}
        refreshAddresses={refreshAddresses}
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
                    <ModalHeader>Eliminar Dirección</ModalHeader>
                    <ModalBody>¿Está seguro que desea eliminar esta dirección?</ModalBody>
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

export default AddressCard;
