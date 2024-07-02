import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCreditCard, faCoins, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardHeader, CardBody, CardFooter, Image} from '@nextui-org/react';

import BillingService from '../services/billing.service';

const ProductCards = ( props ) => {

    const { product, onPurchase  } = props;

    return (
        <div key={product.id} >
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">MicroCasino</p>
                    <h4 className="text-white/90 font-medium text-xl">{product.name}</h4>
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
                        <p className="text-tiny text-white/60">
                            <FontAwesomeIcon icon={faCoins}/> {product.credits} créditos
                        </p>
                        <p className="text-tiny text-white/60">
                            <FontAwesomeIcon icon={faDollarSign}/>{product.price}
                        </p>
                    </div>
                    </div>
                    <Button 
                        radius="full" 
                        size="sm" 
                        color="success" 
                        variant='shadow' 
                        startContent={<FontAwesomeIcon icon={faCreditCard}/>}
                        onPress={() => onPurchase(product)}
                    >
                        Comprar
                    </Button>
                </CardFooter>
            </Card>
        </div> 
    );
}

export default ProductCards;