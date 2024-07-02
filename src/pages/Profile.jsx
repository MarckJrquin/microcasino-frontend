// Import the required libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Services
import ProfileService from '../services/profile.service';
import BillingService from '../services/billing.service';

// Components
import UserProfileModal from '../components/UserProfileModal';
import UserAddressModal from '../components/UserAddressModal';
import UserBankAccountModal from '../components/UserBankAccountModal';
import UserPaymentCardModal from '../components/UserPaymentCardModal';
import AddressCard from '../components/AddressCard';
import BankAccountCard from '../components/BankAccountCard';
import PaymentCard from '../components/PaymentCard';


// UI Components - NextUI
import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus, faBuildingColumns, faUserPen, faPenToSquare, faUser, faLocationDot, faMapLocationDot, faGamepad, faReceipt, faCalendar, faLock, faWallet, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Button, Avatar, Input, DatePicker, Tabs, Tab, Card, CardBody, Select, SelectItem, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";



// Profile Component
const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [paymentCards, setPaymentCards] = useState([]);
    const [userBankAccounts, setUserBankAccounts] = useState([]);
    const [selected, setSelected] = React.useState("personal");
    const [openUserProfileModal, setOpenUserProfileModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openPaymentCardModal, setOpenPaymentCardModal] = useState(false);
    const [openBankAccountModal, setOpenBankAccountModal] = useState(false);
    const [profileRefreshFlag, setProfileRefreshFlag] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            fetchProfileData();
        }
    }, [isLoggedIn, profileRefreshFlag]);

    useEffect(() => {
        if (profileData) {
            fetchUserBankAccounts();
        }
    }, [profileData, profileRefreshFlag]);

    const fetchProfileData = async () => {
        try {
            const data = await ProfileService.getProfileData();
            setProfileData(data);
            setAddresses(data.addresses);
        } catch (error) {
            toast.error(error.message || 'Error desconocido');
        }
    };

    const fetchUserBankAccounts = async () => {
        try {
            const data2 = await BillingService.getUserBankAccounts(profileData.userId);
            setUserBankAccounts(data2);
        } catch (error) {
            toast.error(error.message || 'Error desconocido');
        }
    };

    const refreshProfileData = () => {
        setProfileRefreshFlag(prev => !prev);
    }

    const refreshAddresses = () => {
        setProfileRefreshFlag(prev => !prev);
    };

    const refreshPaymentCards = () => {
        setProfileRefreshFlag(prev => !prev);
    }

    const refreshUserBankAccounts = () => {
        setProfileRefreshFlag(prev => !prev);
    }

    const handleEditUserModal = () => {
        setOpenUserProfileModal(true);
    };

    const handleCloseModal = () => {
        setOpenUserProfileModal(false);
    };

    const handleUserAddressModal = () => {
        setOpenAddressModal(true);
    }

    const handleCloseUserAddressModal = () => {
        setOpenAddressModal(false);
    }

    const handleUserPaymentCardsModal = () => {
        setOpenPaymentCardModal(true);
    }

    const handleCloseUserPaymentCardsModal = () => {
        setOpenPaymentCardModal(false);
    }

    const handleUserBankAccountModal = () => {
        setOpenBankAccountModal(true);
    }

    const handleCloseUserBankAccountModal = () => {
        setOpenBankAccountModal(false);
    }

    if (!profileData) {
        return <p className="text-center text-gray-500 dark:text-gray-300">Cargando perfil...</p>;
    }


    return (
        <>
            <section className="relative pt-40 pb-24 pl-3 pr-3 lg:pl-10 lg:pr-10">
                <img src="https://pagedone.io/asset/uploads/1705473908.png" alt="cover-image" className="w-full absolute top-0 left-0 z-0 h-60"/>
                <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                        <Avatar isBordered name={profileData?.name + " " + profileData?.lastName} src={profileData?.avatarUrl}  color="default" className='w-48 h-48'/>
                    </div>
                    <div className="flex items-center sm:items-start justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
                        <div className="block">
                            <h3 className="font-manrope font-bold text-4xl text-gray-900 dark:text-white mb-1 max-sm:text-center">
                                {profileData.name} {profileData.lastName}
                            </h3>
                            <p className="font-normal text-base leading-7 text-gray-500 dark:text-gray-400  max-sm:text-center">
                                <FontAwesomeIcon icon={faUser} /> @{profileData.username} <br className="hidden sm:block"/>
                                <FontAwesomeIcon icon={faCalendar} /> fecha de ingreso <br className="hidden sm:block"/>
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col">
                        <Tabs 
                        aria-label="Options"  
                        color="primary"       
                        size='md'
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        >
                            <Tab 
                            key="personal" 
                            title={
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Mi Perfil</span>
                                </div>
                            }
                            >
                                <Card>
                                    <CardBody>
                                        <div className='flex justify-between items-center ml-5 mr-5 md:ml-9 md:mr-9 mt-9 mb-1'>
                                            <h2 className='text-3xl font-bold'>
                                                Mi Perfil
                                            </h2>
                                            <Button color="primary" startContent={<FontAwesomeIcon icon={faUserPen}/>} onClick={handleEditUserModal}>
                                                Editar
                                            </Button> 
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 m-5 md:m-9 md:grid-cols-2">
                                            <Input isReadOnly size="lg" type="email" label="Email" labelPlacement="outside" placeholder="email" value={profileData.email}/>
                                            <Input isReadOnly size="lg" type="text" label="Username" labelPlacement="outside" placeholder="username" value={profileData.username}/>
                                            <Input isReadOnly size="lg" type="text" label="Nombre" labelPlacement="outside" placeholder="nombre" value={profileData.name}/>
                                            <Input isReadOnly size="lg" type="text" label="Apellido" labelPlacement="outside" placeholder="apellido" value={profileData.lastName}/>
                                            <Input isReadOnly size="lg" type="text" label="Cédula" labelPlacement="outside" placeholder="cédula" value={profileData.identification}/>
                                            <DatePicker isReadOnly size="lg" showMonthAndYearPickers label="Fecha de Nacimiento" labelPlacement="outside" formatOptions={{ year: "numeric", month: "2-digit", day: "2-digit" }} value={parseDate(profileData.birthDate)}/>
                                        </div>
                                    </CardBody>
                                </Card>  
                            </Tab>

                            <Tab 
                            key="Dirección" 
                            title={
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faMapLocationDot} />
                                    <span>Dirección</span>
                                </div>
                            }>
                                <Card>
                                    <CardBody>
                                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-0'>
                                            <h2 className='text-3xl font-bold'>
                                                Direcciones
                                            </h2>
                                            {addresses.length > 0 
                                            ? (
                                                <Button color="primary" startContent={<FontAwesomeIcon icon={faCirclePlus}/>} onClick={handleUserAddressModal} >
                                                    Agregar dirección
                                                </Button>
                                            )
                                            :( <></> )}
                                        </div>

                                        {addresses.length > 0
                                        ? (
                                            <>
                                            <div className='flex flex-col gap-3 ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-5'>
                                                {addresses.map((address, index) => (
                                                    <AddressCard 
                                                    key={index} 
                                                    address={address} 
                                                    userData={profileData}
                                                    refreshAddresses={refreshAddresses}
                                                    />
                                                ))}
                                            </div>
                                            </>
                                        ) 
                                        : ( 
                                            <>
                                            <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-500 ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-5'>
                                                <div className="p-7 bg-zinc-50 dark:bg-zinc-800">
                                                    <FontAwesomeIcon icon={faLocationDot} className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                                                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                        ¡Hola, {profileData.name}!
                                                    </h5>
                                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                                        Aún no has agregado ninguna dirección. <br/>
                                                        Por favor, agrega una dirección para poder realizar tus compras.
                                                    </p>
                                                    <Button color="primary" startContent={<FontAwesomeIcon icon={faCirclePlus}/>} onClick={handleUserAddressModal} >
                                                        Agregar Dirección
                                                    </Button>
                                                </div>
                                            </div>
                                            </>
                                        )}
                                    </CardBody>
                                </Card>  
                            </Tab>

                            <Tab 
                                key="datosBanco" 
                                title={
                                    <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faBuildingColumns} />
                                        <span>Datos Bancarios</span>
                                    </div>
                                }
                            >
                                <Card>
                                    <CardBody>
                                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-0'>
                                            <h2 className='text-3xl font-bold'>
                                                Cuentas Bancarias
                                            </h2>
                                            {userBankAccounts.length > 0
                                            ? (
                                                <Button color="primary" startContent={<FontAwesomeIcon icon={faCirclePlus}/>} onClick={handleUserBankAccountModal} >
                                                    Agregar Cuenta
                                                </Button>
                                            )
                                            :( <></> )}
                                        </div>

                                        {userBankAccounts.length > 0
                                        ? (
                                            <>
                                            <div className='flex flex-col gap-3 ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-5'>
                                                {userBankAccounts.map((bankAccount, index) => (
                                                    <BankAccountCard 
                                                    key={index} 
                                                    bankAccount={bankAccount} 
                                                    userData={profileData}
                                                    refreshUserBankAccounts={refreshUserBankAccounts}
                                                    />
                                                ))}
                                            </div>
                                            </>
                                        ) 
                                        : ( 
                                            <>
                                            <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-500 ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-5'>
                                                <div className="p-7 bg-zinc-50 dark:bg-zinc-800">
                                                    <FontAwesomeIcon icon={faLocationDot} className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                                                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                        ¡Hola, {profileData.name}!
                                                    </h5>
                                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                                        Aún no has agregado ninguna cuenta bancaria. <br/>
                                                        Por favor, agrega una tarjeta para poder realizar tus compras y hacer retiros.
                                                    </p>
                                                    <Button color="primary" startContent={<FontAwesomeIcon icon={faCirclePlus}/>} onClick={handleUserBankAccountModal} >
                                                        Agregar cuenta
                                                    </Button>
                                                </div>
                                            </div>
                                            </>
                                        )}
                                    </CardBody>
                                </Card>  
                            </Tab>          

                            {/* <Tab 
                            key="datosTarjeta" 
                            title={
                                <div className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    <span>Datos de Tarjeta</span>
                                </div>
                            }>
                                <Card>
                                    <CardBody>
                                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-0'>
                                            <h2 className='text-3xl font-bold'>
                                                Tarjetas
                                            </h2>
                                            {paymentCards.length > 0 
                                            ? (
                                                <Button color="primary" startContent={<FontAwesomeIcon icon={faCirclePlus}/>} onClick={handleUserPaymentCardsModal} >
                                                    Agregar tarjeta
                                                </Button>
                                            )
                                            :( <></> )}
                                        </div>

                                        {paymentCards.length > 0
                                        ? (
                                            <>
                                            <div className='flex flex-col gap-3 ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-5'>
                                                {paymentCards.map((paymentCard, index) => (
                                                    <PaymentCard 
                                                    key={index} 
                                                    paymentCard={paymentCard} 
                                                    userData={profileData}
                                                    refreshPaymentCards={refreshPaymentCards}
                                                    />
                                                ))}
                                            </div>
                                            </>
                                        ) 
                                        : ( 
                                            <>
                                            <div className='border-2 border-dashed rounded-lg border-zinc-300 dark:border-zinc-500 ml-5 mr-5 md:ml-9 md:mr-9 mt-5 mb-5'>
                                                <div className="p-7 bg-zinc-50 dark:bg-zinc-800">
                                                    <FontAwesomeIcon icon={faLocationDot} className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
                                                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                        ¡Hola, {profileData.name}!
                                                    </h5>
                                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                                        Aún no has agregado ninguna tarjeta. <br/>
                                                        Por favor, agrega una tarjeta para poder realizar tus compras.
                                                    </p>
                                                    <Button color="primary" startContent={<FontAwesomeIcon icon={faCirclePlus}/>} onClick={handleUserPaymentCardsModal} >
                                                        Agregar tarjeta
                                                    </Button>
                                                </div>
                                            </div>
                                            </>
                                        )}
                                    </CardBody>
                                </Card>  
                            </Tab> */}

                            {/* <Tab 
                                key="wallet" 
                                title={
                                    <div className="flex items-center space-x-2">
                                        <FontAwesomeIcon icon={faWallet} />
                                        <span>Wallet</span>
                                    </div>
                                }
                            >
                                <Card>
                                    <CardBody>
                                        <div className="m-5 md:m-9">
                                            nim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        </div>
                                    </CardBody>
                                </Card>  
                            </Tab> */}
                        </Tabs>
                    </div>  
                </div>
            </section> 

            <UserProfileModal 
                profileData={profileData}
                open={openUserProfileModal} 
                onClose={handleCloseModal}
                refreshProfileData={refreshProfileData}
            /> 

            <UserAddressModal
                userData={profileData}
                address={{}}
                open={openAddressModal}
                onClose={handleCloseUserAddressModal}
                refreshAddresses={refreshAddresses}
            />

            {/* <UserPaymentCardModal
                userData={profileData}
                paymentCard={{}}
                open={openPaymentCardModal}
                onClose={handleCloseUserPaymentCardsModal}
                refreshPaymentCards={refreshPaymentCards}
            /> */}

            <UserBankAccountModal
                userData={profileData}
                bankAccount={{}}
                open={openBankAccountModal}
                onClose={handleCloseUserBankAccountModal}
                refreshUserBankAccounts={refreshUserBankAccounts}
            />
        </>      
    );
}

export default Profile;