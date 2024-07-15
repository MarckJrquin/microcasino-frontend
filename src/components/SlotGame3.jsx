import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import BillingService from "../services/billing.service";
import ProfileService from "../services/profile.service"; // Import ProfileService

import { toast } from 'sonner';
import { Button, Input, Link, Card, Chip } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCoins, faDice } from '@fortawesome/free-solid-svg-icons';

import '../assets/css/asdasd.css';


function RepeatButton({ onClick }) {
  return (
    <button aria-label="Play again." id="repeatButton" onClick={onClick}></button>
  );
}

function WinningSound() {
  return (
    <audio autoPlay className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            userCredits: 0,
            betCredits: 0,
            potentialWinnings: 0,
            isSpinning: false, // Add spinning state
        };
        this.finishHandler = this.finishHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this._child1 = React.createRef();
        this._child2 = React.createRef();
        this._child3 = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSpinClick = this.handleSpinClick.bind(this);
    }

    componentDidMount() {
      this.fetchUserCredits();
    }

    async fetchUserCredits() {
      try {
        console.log("Fetching user profile...");
        const profileData = await ProfileService.getProfileData();
        console.log("Profile Data:", profileData);
        
        const userId = profileData.userId; // Assuming 'userId' is correct
        console.log("User ID:", userId);
        
        console.log("Fetching user credits...");
        const userCredits = await BillingService.getUserCreditsBalance(userId);
        console.log("User credits:", userCredits);
        
        // Update state with the credits value
        this.setState({ userCredits: userCredits.credits });
      } catch (error) {
        console.error("Error fetching user credits:", error);
      }
    }
    

    handleClick() {
        this.setState({ winner: null });
        this.emptyArray();
        this._child1.current.forceUpdateHandler();
        this._child2.current.forceUpdateHandler();
        this._child3.current.forceUpdateHandler();
    }

    handleInputChange(event) {
        const betCredits = parseInt(event.target.value, 10);
        this.setState({ betCredits, potentialWinnings: betCredits * 2 });
    }

    async handleSpinClick() {
      const { betCredits, userCredits } = this.state;
      if (betCredits > userCredits) {
          toast.error("No tienes suficientes créditos para apostar esta cantidad.");
          return;
      }

      try {
          // Deduct credits and register the bet
          const profileData = await ProfileService.getProfileData();
          const userId = profileData.userId;

          const response = await BillingService.recordBet(userId, betCredits);
          toast.success(response.message || "Apuesta registrada con éxito.");
          this.setState({ isSpinning: true, userCredits: userCredits - betCredits }); // Set spinning to true and deduct credits
          this.handleClick();
      } catch (error) {
          console.error("Error recording bet:", error);
          toast.error(error.message || "Ocurrió un error al registrar la apuesta");
      }
  }

    static loser = [
      'No fue suficiente',
      'Deja de apostar',
      '¡Hey, perdiste!',
      '¡Ay! Sentí eso',
      'No te castigues',
      'Adiós al fondo universitario',
      'Yo tengo un gato. Tú tienes una pérdida',
      'Eres increíble perdiendo',
      'Programar es difícil',
      'No odies al programador'
    ];

    static matches = [];

    async finishHandler(value) {
      App.matches.push(value);

      if (App.matches.length === 3) {
        const first = App.matches[0];
        let results = App.matches.every(match => match === first);
        const { betCredits, potentialWinnings } = this.state;
        if (results) {
          try {
            const profileData = await ProfileService.getProfileData();
            const userId = profileData.userId;
            
            try {
              const response = await BillingService.recordWin(userId, potentialWinnings);
              console.log("Win recorded:", response);
              toast.success(response.message || "Ganancia registrada con éxito.");
            } catch (error) {
              console.error("Error recording win:", error);
              toast.error(error.message || "Ocurrió un error al registrar la ganancia");
            }
          } catch (error) {
            console.error("Error recording win:", error);
          }
        }
        this.setState(prevState => ({
          winner: results,
          userCredits: results ? prevState.userCredits + potentialWinnings : prevState.userCredits,
          isSpinning: false, // Reset spinning state
        }));
      }
    }

    emptyArray() {
        App.matches = [];
    }

    render() {
        const { winner, userCredits, betCredits, potentialWinnings, isSpinning  } = this.state;
        const getLoser = () => {
            return App.loser[Math.floor(Math.random() * App.loser.length)];
        };
        let repeatButton = null;
        let winningSound = null;

        if (winner !== null) {
            repeatButton = <RepeatButton onClick={this.handleClick} />;
        }

        if (winner) {
            winningSound = <WinningSound />;
        }

        return (
          <div>
              {winningSound}
              <div className="header pl-3 pr-3 m-2 rounded-full bg-zinc-300 dark:bg-zinc-800">
                  <Button auto color='danger' radius='full' variant='shadow' as={Link} href="/games" startContent={<FontAwesomeIcon icon={faDice}/>}>
                      Más juegos
                  </Button>
                  <Button auto color='success' radius='full' variant='shadow' as={Link} href="/exchange" startContent={<FontAwesomeIcon icon={faBagShopping}/>}>
                      Comprar créditos
                  </Button>
                  <Button color='primary' radius='full' variant='shadow' startContent={<FontAwesomeIcon icon={faCoins}/>}>
                    Créditos: {userCredits}
                  </Button>
              </div>

              <div className={`spinner-container bg-white`}>
                  <Spinner onFinish={this.finishHandler} ref={this._child1} timer="1000" />
                  <Spinner onFinish={this.finishHandler} ref={this._child2} timer="1400" />
                  <Spinner onFinish={this.finishHandler} ref={this._child3} timer="2200" />
              </div>

              <div className="betting-controls flex flex-col w-full md:flex-row bg-zinc-300 dark:bg-zinc-700 p-3">
                  <div className='flex w-full'>
                    <Input
                        color='success'
                        type="number"
                        placeholder="Créditos a jugar"
                        onChange={this.handleInputChange}
                        disabled={isSpinning} // Disable input if spinning
                    />
                    <Card className="potential-winnings w-full items-center flex flex-row pl-3 gap-2">
                      Ganancia <Chip color='success'>{potentialWinnings}</Chip>  
                    </Card>
                  </div>
                  <div className='flex w-full items-center gap-2'>
                    <Card className='w-full p-2 items-center '>
                      <span>{winner === null ? 'En espera' : winner ? '🤑 Tas volando! 🤑' : getLoser()}</span>
                    </Card>
                    <Button auto color='warning' onClick={this.handleSpinClick} className='w-full' disabled={isSpinning}>
                        Girar
                    </Button>
                  </div>
              </div>
              
              {repeatButton}
          </div>
      );
    }
}

class Spinner extends React.Component {
    constructor(props) {
      super(props);
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      this.state = {
        position: this.setStartPosition(),
        timeRemaining: this.props.timer
      };
    }

    forceUpdateHandler() {
        this.reset();
    }

    reset() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.start = this.setStartPosition();

        this.setState({
            position: this.start,
            timeRemaining: this.props.timer
        });

        this.timer = setInterval(() => {
            this.tick();
        }, 100);
    }

    static iconHeight = 188;
    multiplier = Math.floor(Math.random() * (4 - 1) + 1);

    start = this.setStartPosition();
    speed = Spinner.iconHeight * this.multiplier;

    setStartPosition() {
      return ((Math.floor((Math.random() * 9))) * Spinner.iconHeight) * -1;
    }

    moveBackground() {
      this.setState({
          position: this.state.position - this.speed,
          timeRemaining: this.state.timeRemaining - 100
      });
    }

    getSymbolFromPosition() {
      const totalSymbols = 9;
      const maxPosition = (Spinner.iconHeight * (totalSymbols - 1) * -1);
      let moved = (this.props.timer / 100) * this.multiplier;
      let startPosition = this.start;
      let currentPosition = startPosition;
      for (let i = 0; i < moved; i++) {
        currentPosition -= Spinner.iconHeight;
        if (currentPosition < maxPosition) {
          currentPosition = 0;
        }
      }

      this.props.onFinish(currentPosition);
    }

    tick() {
      if (this.state.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.getSymbolFromPosition();
      } else {
        this.moveBackground();
      }
    }

    componentDidMount() {
      clearInterval(this.timer);
      this.setState({
        position: this.start,
        timeRemaining: this.props.timer
      });

      this.timer = setInterval(() => {
        this.tick();
      }, 100);
    }

    render() {
      const { position } = this.state;
      return (
        <div
          style={{ backgroundPosition: '0px ' + position + 'px' }}
          className={`icons object-scale-down`}
        />
      );
    }
}

const SlotGame3 = () => {
    useEffect(() => {
      const root = createRoot(document.getElementById('slot-root'));
      root.render(<App />);
    }, []);

    return (
      <div id="slot-root" className="pt-1 bg-zinc-200 dark:bg-zinc-900 h-max-content"></div>
    );
};

export default SlotGame3;
