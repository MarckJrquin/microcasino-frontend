import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProfileService from '../services/profile.service';
import ProductService from '../services/products.service'; 
import BillingService from '../services/billing.service';

import ProductCard from '../components/ProductCards';

// UI Components - NextUI
import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCreditCard, faCoins, faDollarSign, faUser, faCircleDollarToSlot, faHandHoldingDollar, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Button, Avatar, Input, DatePicker, Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Image, Select, SelectItem, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";
import { set } from 'date-fns';


const Exchange = () => {

    const [selectedTab, setSelectedtab] = useState('deposit');
    const [profileData, setProfileData] = useState(null);
    const [products, setProducts] = useState([]);
    const [depositAmount, setDepositAmount] = useState('');
    const [creditsForDeposit, setCreditsForDeposit] = useState(0);
    const [withdrawCredits, setWithdrawCredits] = useState(0);
    const [realMoneyForWithdraw, setRealMoneyForWithdraw] = useState(0);
    const [profileRefreshFlag, setProfileRefreshFlag] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {

        const fetchProfileData = async () => {
            try {
                const data = await ProfileService.getProfileData();
                setProfileData(data);
            } catch (error) {
                setError(error.message);
            }
        }

        const fetchProducts = async () => {
            try {
                const data = await ProductService.getAllProducts();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if(isLoggedIn){
            fetchProfileData();
        }
 
        fetchProducts();
    }, [profileRefreshFlag]);


    const handlePurchaseProduct = async (product) => {
        if (!isLoggedIn) {
            toast.warning("Necesitas iniciar sesión para realizar una compra.");
            setTimeout(() => navigate('/login'), 2500);
            return;
        }

        try {
            const response = await BillingService.createCheckoutSessionForProducts(product, profileData.userId);

            console.log(response.session.url);
            if (response.session.url) {
                window.location.assign(response.session.url);
            }
        } catch (error) {
            toast.error(error.message || "Error processing the purchase");
        }

        setProfileRefreshFlag(prev => !prev);
    };


    const handlePurchaseCredits = async (amount) => {
        if (!isLoggedIn) {
            toast.warning("Necesitas iniciar sesión para comprar créditos.");
            setTimeout(() => navigate('/login'), 2500);
            return;
        }

        if (amount <= 0) {
            toast.error("El monto de depósito debe ser mayor que cero.");
            return;
        }

        try {
            const response = await BillingService.createCheckoutSessionForCredits(amount , profileData.userId);
            if (response.session.url) {
                window.location.assign(response.session.url);
            }
        } catch (error) {
            toast.error(error.message || "Error processing the purchase");
        }

        setProfileRefreshFlag(prev => !prev);
    };


    const handleWithdraw = async (credits) => {
        if (!isLoggedIn) {
            toast.warning("Necesitas iniciar sesión para retirar créditos.");
            setTimeout(() => navigate('/login'), 2500);
            return;
        }

        if (credits <= 0) {
            toast.error("La cantidad de créditos debe ser mayor que cero.");
            return;
        }

        try {
            const response = await BillingService.withdrawCredits(credits , profileData.userId);
            toast.success(response.message || 'Solicitud de retiro realizada con éxito');
        } catch (error) {
            toast.error(error.message || "Error processing the withdraw");
        }

        setProfileRefreshFlag(prev => !prev);
    };


    const handleDepositChange = (e) => {
        const value = e.target.value;
        setDepositAmount(value);
        setCreditsForDeposit(Math.floor(value / 0.25));
    };

    const handleWithdrawChange = (e) => {
        const value = e.target.value;
        setWithdrawCredits(value);
        setRealMoneyForWithdraw(value * 0.25);
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        {isLoggedIn 
        ? (
            <section class="py-24 bg-white dark:bg-zinc-900">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center flex-col lg:flex-row md:mt-20 gap-3 lg:gap-16">
                        <div class="w-full lg:w-1/2">
                            <h2 class="font-manrope text-5xl text-zinc-800 dark:text-zinc-200 font-bold leading-[4rem] mb-7 text-center lg:text-left">
                                Deposita y retira tus créditos
                            </h2>
                            <p class="text-lg text-zinc-600 dark:text-zinc-400 mb-16 text-center lg:text-left">
                                Deposita y retira tus créditos de manera segura y rápida. Disfruta de la experiencia de jugar en nuestro casino online.
                            </p>
                            <div isBlurred className='w-full pl-5 pr-2 pt-2 pb-2 flex flex-row gap-16 justify-between items-center border-white/20 rounded-full border-1 shadow-small bg-gradient-to-r from-green-400 to-teal-400'>
                                <p className='font-bold text-zinc-800'>Tus creditos</p>
                                <Button isReadOnly className="font-bold text-white bg-black/20" variant="flat" color="default" radius="full" size="md">
                                    {profileData?.credits || 0}
                                </Button>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl">
                            <Card className='p-3 lg:p-5 h-[320px] lg:h-[365px]'>
                                <Tabs
                                fullWidth
                                aria-label="options"
                                color="primary"       
                                size='lg'
                                selectedKey={selectedTab}
                                onSelectionChange={setSelectedtab}
                                >
                                    <Tab 
                                    key="deposit" 
                                    className="h-[45px]"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <FontAwesomeIcon icon={faCircleDollarToSlot} />
                                            <span>Deposito</span>
                                        </div>
                                    }
                                    >
                                        <Card className='p-3 lg:p-5'>
                                            <form className='flex flex-col gap-3 lg:gap-5'>
                                                <Input
                                                    size='lg'
                                                    type='number'
                                                    isRequired
                                                    name='depositAmount'
                                                    label="Deposito"
                                                    placeholder='Ingrese el monto a depositar'
                                                    value={depositAmount}
                                                    onChange={handleDepositChange}
                                                    startContent={<FontAwesomeIcon icon={faMoneyBill} className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                />
                                                <Input
                                                    isReadOnly
                                                    size='lg'
                                                    type='number'
                                                    name='creditsForDeposit'
                                                    label="Creditos"
                                                    placeholder='Creditos a recibir'
                                                    value={creditsForDeposit}
                                                    startContent={<FontAwesomeIcon icon={faCoins} className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                />
                                                <Button
                                                    size='lg'
                                                    color='success'
                                                    startContent={<FontAwesomeIcon icon={faDollarSign} />}
                                                    onClick={() => handlePurchaseCredits(depositAmount)}
                                                >
                                                    Depositar
                                                </Button>
                                            </form>
                                        </Card>
                                    </Tab>

                                    <Tab 
                                    key="withdraw" 
                                    className="h-[45px]"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <FontAwesomeIcon icon={faHandHoldingDollar} />
                                            <span>Retiro</span>
                                        </div>
                                    }
                                    >
                                        <Card className='p-3 lg:p-5'>
                                            <form className='flex flex-col gap-3 lg:gap-5'>
                                                <Input
                                                    size='lg'
                                                    type='number'
                                                    isRequired
                                                    name='withdrawCredits'
                                                    label="Creditos a retirar"
                                                    placeholder='Cantidad de créditos'
                                                    value={withdrawCredits}
                                                    onChange={handleWithdrawChange}
                                                    startContent={<FontAwesomeIcon icon={faCoins} className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                />
                                                <Input
                                                    isReadOnly
                                                    size='lg'
                                                    type='number'
                                                    name='realMoneyForWithdraw'
                                                    label="Monto a retirar"
                                                    placeholder='Monto a retirar'
                                                    value={realMoneyForWithdraw}
                                                    startContent={<FontAwesomeIcon icon={faDollarSign} className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
                                                />
                                                <Button
                                                    size='lg'
                                                    color='success'
                                                    startContent={<FontAwesomeIcon icon={faDollarSign} />}
                                                    onClick={() => handleWithdraw(withdrawCredits)}
                                                >
                                                    Retirar
                                                </Button>
                                            </form>
                                        </Card>
                                    </Tab>

                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        ) : (
            <>
            <div class="bg-zinc-50 dark:bg-zinc-800 xl:py-28 md:py-20 py-10 xl:px-0 px-10">
                <span class="w-fit mx-auto flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full text-emerald-600 dark:text-emerald-400 text-center text-sm font-medium leading-5 px-3 py-1 mb-5">
                    Inicia Sesion 
                </span>
                <h1 class="text-zinc-800 dark:text-zinc-200 text-center font-manrope lg:text-5xl text-4xl font-bold leading-tight mb-8">
                    Inicia sesión para comprar créditos
                </h1>
                <p class="text-zinc-500 dark:text-zinc-400 text-center text-lg font-normal leading-7">
                    Compra, juega y gana y disfruta de la experiencia de jugar en nuestro casino online.
                </p>
            </div>
            </>
        )}

        <section className="bg-white dark:bg-zinc-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-zinc-900 dark:text-white">
                        Necesitas créditos para jugar?
                    </h2>
                    <p className="mb-5 font-light text-zinc-500 sm:text-xl dark:text-zinc-400">
                        Compra créditos para jugar en nuestros juegos y disfruta de la experiencia.
                    </p>
                </div>
                <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard 
                        product={product} 
                        key={product.id} 
                        onPurchase={handlePurchaseProduct}
                        />
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}

export default Exchange;