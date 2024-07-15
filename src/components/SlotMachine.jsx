import { useState } from "react";
import '../assets/css/slotMachine.css';

const symbols = ['🍒', '🍋', '🍉', '🍇', '🍊'];

const getRandomSymbols = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const SlotMachine = () => {
    const [reels, setReels] = useState(['🍒', '🍋', '🍉']);
    const [message, setMessage] = useState('');

    const spin = () => {
        const newReels = [getRandomSymbols(), getRandomSymbols(), getRandomSymbols()];
        setReels(newReels);

        if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
            setMessage('🎉 ¡Ganaste! 🎉');
        } else {
            setMessage('Inténtalo de nuevo');
        }
    };

    return (
        <div className="slot-machine">
            <div className="reels">
                { reels.map((symbol, index) => (
                    <span key={ index } className="reel">{ symbol }</span>
                )) }
            </div>
            <button onClick={ spin }>Girar</button>
            <p>{ message }</p>
        </div>
    );
};

export default SlotMachine;
