import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductService from '../services/products.service'; 

import ProductCard from '../components/ProductCards';

// UI Components - NextUI
import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCreditCard, faCoins, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Button, Avatar, Input, DatePicker, Tabs, Tab, Card, CardHeader, CardBody, CardFooter, Image, Select, SelectItem, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";


const Exchange = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
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
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}

export default Exchange;