import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GameService from "../services/game.service";

import { toast } from 'sonner';
import { Button, Link, Image, Chip, Card, CardHeader, CardBody, CardFooter, Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, useDisclosure } from '@nextui-org/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { set } from "date-fns";

const SlotsGames = () => {

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const [gameTypeInfo, setGameTypeInfo] = useState([]);
    const [games, setGames] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        fetchGameTypeInfo();
        fetchSlotsGames();
        console.log(gameTypeInfo);
    }, []);

    const fetchGameTypeInfo = async () => {
        try {
            const data = await GameService.getGameType(3);
            setGameTypeInfo(data);
        } catch (error) {
            toast.error(error.message || 'Error desconocido');
        }
    }

    const fetchSlotsGames = async () => {
        try {
            const data = await GameService.getGamesByType(3); // 2 -> tipo TragaMonedas
            setGames(data);
        } catch (error) {
            toast.error(error.message || 'Error desconocido');
        }
    };

    const handleGameClick = (url) => {
        if (!isLoggedIn) {
            toast.error("Debes iniciar sesión para jugar.");
            setTimeout(() => {
                navigate('/login');
            }, 1100);
        } else {
            navigate(url);
        }
    };

    const renderCards = () => {
        return games.slice(0, 3).map((game, index) => (
            <div key={index} className="group flex items-center flex-col gap-8 w-full">
                <div className="block">
                    <Image
                        isBlurred
                        loading='lazy'
                        alt={game.name}
                        fallbackSrc="https://via.placeholder.com/300x200"
                        className="z-0 m-1 object-cover h-[275px] w-[400px] rounded-lg transition-all duration-300 group-hover:scale-105"
                        src={game.picture}
                    />
                </div>
                <div className="flex items-center justify-between max-w-[406px] lg:max-w-full w-full lg:px-0">
                    <div className="block">
                        <h4 className="text-2xl font-manrope font-semibold text-gray-900 dark:text-gray-300 mb-1">{game.name}</h4>
                        <p className="font-medium text-lg text-gray-500">{game.longDescription}</p>
                    </div>
                    <Button 
                    isIconOnly 
                    color="primary" 
                    radius="full" 
                    onClick={() => handleGameClick(game.url)}
                    >
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </Button>
                </div>
            </div>
        ));
    };

    return (
    <>
        <section className="pt-16 relative">
            <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
                <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                        <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                            <Chip color="success" variant="shadow">{gameTypeInfo.name}</Chip>
                            <h2 className="text-zinc-800 dark:text-zinc-200 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                No sabes juegar esta vaina?  Pilla!
                            </h2>
                            <p className="text-gray-500 dark:text-zinc-400 text-base font-normal leading-relaxed lg:text-start text-center">
                                Puedes ver un tutorial de cómo jugar el juego..
                            </p>
                        </div>
                        <Button color="primary" variant="shadow" size="lg" onPress={onOpen}>Reproducir</Button>
                    </div>
                    <div className="lg:mx-0 mx-auto h-full relative">
                        <img className="w-full h-full object-cover rounded-lg" src={gameTypeInfo.picture} alt="about Us image" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                                isIconOnly
                                color="primary"
                                radius="full"
                                size="lg"
                                variant="shadow"
                                onClick={onOpen}
                            >
                                <FontAwesomeIcon icon={faPlay} size="2xl" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 relative">
            <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
                <h1 className="font-manrope font-bold text-4xl text-gray-900 dark:text-gray-200 mb-10 max-md:text-center">
                    Tragamonedas
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderCards()}
                </div>
            </div>
        </section>

        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement='auto'
        scrollBehavior='inside'
        backdrop='blur'
        size="4xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Video Tutorial</ModalHeader>
                        <ModalBody className="flex justify-center items-center">
                            <video width="100%" controls className="rounded-lg">
                                <source src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={onClose}>Cerrar</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
        
    );
}

export default SlotsGames;