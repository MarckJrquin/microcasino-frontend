import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import GameService from '../services/game.service';

import { toast } from 'sonner';
import { Button, Link, Image, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Games = () => {
    const [gameTypes, setGameTypes] = useState([]);
    const [games, setGames] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        fetchGameTypes();
        fetchGames();
        console.log(gameTypes);
        console.log(games);
    }, []);

    const fetchGameTypes = async () => {
        try {
            const data = await GameService.getGameTypes();
            setGameTypes(data);
        } catch (error) {
            toast.error(error.message || 'Error desconocido');
        }
    };

    const fetchGames = async () => {
        try {
            const data = await GameService.getGames();
            setGames(data);
        } catch (error) {
            toast.error(error.message || 'Error desconocido');
        }
    }

    const handleGameClick = (url) => {
        if (!isLoggedIn) {
            toast.error("Debes iniciar sesión para jugar.");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            navigate(url);
        }
    };

    const renderCards = (gameType) => {
        return games
            .filter(game => game.gameTypeID === gameType)
            .slice(0, 3)
            .map((game, index) => (
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
        <section className="py-20 relative">
            <div className="w-full max-w-2xl lg:max-w-7xl px-6 lg:px-8 mx-auto">
                <h1 className="font-manrope font-bold text-4xl text-gray-900 dark:text-gray-200 mb-10 max-md:text-center">
                    Juegos de Microcasino
                </h1>
                {gameTypes.map((type, index) => (
                    <div key={index} className="mb-10">
                        <h2 className="font-manrope font-medium text-3xl text-gray-900 dark:text-gray-300 mb-5">
                            {type.name}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {renderCards(type.id)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
                                            
    );
}

export default Games;