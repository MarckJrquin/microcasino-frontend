import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProfileService from '../services/profile.service';
import ProductService from '../services/products.service'; 
import BillingService from '../services/billing.service';

import ProductCard from '../components/ProductCards';
import Carousel from '../components/Swiper';

// UI Components - NextUI
import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCreditCard, faCoins, faDollarSign, faUser, faCircleDollarToSlot, faHandHoldingDollar, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { Button, Link, Avatar, Input, DatePicker, Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Image, Select, SelectItem, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";
import { set } from 'date-fns';


const Promotions = () => {

    const [selectedTab, setSelectedtab] = useState('deposit');
    const [profileData, setProfileData] = useState(null);
    const [products, setProducts] = useState([]);
    const [depositAmount, setDepositAmount] = useState('');
    const [creditsForDeposit, setCreditsForDeposit] = useState(0);
    const [withdrawCredits, setWithdrawCredits] = useState(0);
    const [realMoneyForWithdraw, setRealMoneyForWithdraw] = useState(0);
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
    }, []);


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
        <section className="py-24 ">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-14 text-center">
                <h2 className="text-4xl text-center font-bold text-zinc-900 dark:text-zinc-200 leading-[3.25rem] mb-6 max-w-max lg:max-w-3xl lg:mx-auto">
                    Promociones y ofertas especiales
                </h2>
                <p className="text-base font-normal text-zinc-500 dark:text-zinc-400 lg:max-w-2xl lg:mx-auto mb-8">
                    ¡Aprovecha nuestras promociones y ofertas especiales!
                </p>  
                <div className="flex flex-col justify-center md:flex-row gap-5 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">   
                    <Button color='primary' variant='shadow'size='lg' radius='full' as={Link} href='/login'>
                    Jugar ahora
                    </Button>
                    <Button color='primary' variant='flat' size='lg' radius='full' as={Link} href='/'>
                    Ver más
                    </Button>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
                <div className="relative w-full h-[305px] md:col-span-2">
                    <div className="bg-transparent rounded-2xl flex justify-between flex-row flex-wrap">
                    <Carousel />
                    </div>
                </div>
                <div className="relative w-full h-auto">
                    <div className="bg-indigo-500 rounded-2xl h-full">
                    <Card isFooterBlurred className="w-full h-[305px] col-span-12 sm:col-span-7">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                        <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                        </CardHeader>
                        <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-4.jpeg"
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="https://nextui.org/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">Get App</Button>
                        </CardFooter>
                    </Card>
                    </div>
                </div>
                <div className="relative w-full h-auto">
                    <div className="bg-violet-500 rounded-2xl h-full">
                    <Card isFooterBlurred className="w-full h-[305px] col-span-12 sm:col-span-7">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                        <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                        </CardHeader>
                        <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-2.jpeg"
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                            alt="Breathing app icon"
                            className="rounded-full w-10 h-11 bg-black"
                            src="https://nextui.org/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Breathing App</p>
                            <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">Get App</Button>
                        </CardFooter>
                    </Card>
                    </div>
                </div>   
                </div>
            </div>
        </section>   

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

        <div class="bg-white dark:bg-zinc-900 pb-24">
            <div class="mx-auto max-w-7xl  sm:px-6 lg:px-8">
                <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
                    <defs>
                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                        <stop stop-color="#7775D6" />
                        <stop offset="1" stop-color="#E935C1" />
                    </radialGradient>
                    </defs>
                </svg>
                <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Boost your productivity.<br/>Start using our app today.</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-300">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <a href="#" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a>
                    <a href="#" class="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
                    </div>
                </div>
                <div class="relative mt-16 h-80 lg:mt-8">
                    <img class="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" width="1824" height="1080"/>
                </div>
                </div>
            </div>
        </div>

        </>
    );
}

export default Promotions;