import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import '../assets/css/SlotGame3.css';

function RepeatButton({ onClick }) {
  return (
    <button 
      aria-label="Play again." 
      id="repeatButton" 
      onClick={onClick}>
    </button>
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
      winner: null
    };
    this.finishHandler = this.finishHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._child1 = React.createRef();
    this._child2 = React.createRef();
    this._child3 = React.createRef();
  }  

  handleClick() { 
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.current.forceUpdateHandler();
    this._child2.current.forceUpdateHandler();
    this._child3.current.forceUpdateHandler();
  }

  static loser = [
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
  ];

  static matches = [];

  finishHandler(value) {
    App.matches.push(value);  

    if (App.matches.length === 3) {
      const first = App.matches[0];
      let results = App.matches.every(match => match === first);
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    App.matches = [];
  }

  render() {
    const { winner } = this.state;
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
        <h1 style={{ color: 'white'}}>
          <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
        </h1>

        <div className={`spinner-container`}>
          <Spinner onFinish={this.finishHandler} ref={this._child1} timer="1000" />
          <Spinner onFinish={this.finishHandler} ref={this._child2} timer="1400" />
          <Spinner onFinish={this.finishHandler} ref={this._child3} timer="2200" />
          <div className="gradient-fade"></div>
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
        style={{backgroundPosition: '0px ' + position + 'px'}}
        className={`icons`}          
      />
    );
  }
}

const SlotGame3 = () => {
  useEffect(() => {
    ReactDOM.render(<App />, document.getElementById('slot-root'));
  }, []);

  return (
    <div id="slot-root" className="bg-warning h-screen"></div>
  );
};

export default SlotGame3;
