import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProfileService from '../services/profile.service';
import BillingService from '../services/billing.service';

import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Button, Link } from '@nextui-org/react';

const PaymentSuccess = () => {

    const [transactionDetails, setTransactionDetails] = useState({
        userId: null,
        username: null,
        email: null,
        productId: null,
        productName: null,    
        amount: null,
        credits: null,
        date: new Date().toLocaleDateString(), // Fecha actual
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            fetchTransactionDetails();
        }

        console.log(transactionDetails);
    }, [isLoggedIn]);

    const fetchTransactionDetails = async () => {
        try{
            const response = await BillingService.getTrasactionDetails();
            console.log(response);
            setTransactionDetails({
                ...response,
                date: new Date().toLocaleDateString(),
            });
        } catch(error){
            toast.error(error.message || 'Error desconocido');
        }
    }

    return (
        <section className="bg-white py-8 antialiased dark:bg-zinc-900 md:py-16">
            <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white sm:text-2xl mb-2">
                    Thanks for your order!
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8">
                    Your order <a href="#" className="font-medium text-zinc-900 dark:text-white hover:underline">#{transactionDetails.productId}</a> 
                    will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.
                </p>
                <div className="space-y-4 sm:space-y-2 rounded-lg border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800 mb-6 md:mb-8">
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Método de Pago</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">Tarjeta</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Producto</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">{transactionDetails.productName}</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Créditos</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">{transactionDetails.credits}</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Monto</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">${transactionDetails.amount}</dd>
                    </dl>
                </div>
                <div className="space-y-4 sm:space-y-2 rounded-lg border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800 mb-6 md:mb-8">
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Username</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">{transactionDetails.username}</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Email</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">{transactionDetails.email}</dd>
                    </dl>
                    <dl className="sm:flex items-center justify-between gap-4">
                        <dt className="font-normal mb-1 sm:mb-0 text-zinc-500 dark:text-zinc-400">Fecha</dt>
                        <dd className="font-medium text-zinc-900 dark:text-white sm:text-end">{transactionDetails.date}</dd>
                    </dl>
                </div>
                <div className="flex items-center space-x-4">
                    <Button color="primary" variant="shadow" as={Link} href='/exchange' startContent={<FontAwesomeIcon icon={faBagShopping} />}>
                        Seguir Comprando
                    </Button>
                </div>
            </div>
        </section>
    );
}
  
export default PaymentSuccess;