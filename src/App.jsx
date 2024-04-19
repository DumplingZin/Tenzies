import React, { useEffect, useState } from "react";
import Dice from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dice, setDice] = React.useState(allDice());
  const [buttonCount, setButtonCount] = React.useState(0);
  const [tenzie, setTenzie] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [darkMode, setDarkMode] = React.useState(true);

  const [isRunning, setIsRunning] = React.useState(false);
 // const [fastestTime, setFastestTime] = React.useState(null); // State to hold the fastest time
  const [newRecord, setIsNewRecord] = React.useState(); // Flag to indicate a new record
  const [winningTimes, setWinningTimes] = useState(() => {
    const storedWinningTimes = JSON.parse(localStorage.getItem("winningTimes"));
    return storedWinningTimes || [];
  });
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime((preState) => preState + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [time, isRunning]);

  // Function to update winning times in local storage
  const updateWinningTimes = (newWinningTimes) => {
    setWinningTimes(newWinningTimes);
    localStorage.setItem("winningTimes", JSON.stringify(newWinningTimes));
  };
//Importance part
  useEffect(() => {
    if (tenzie) {
      setIsRunning(false);
      const newWinningTimes = [...winningTimes, time];
      updateWinningTimes(newWinningTimes);
      const isNewRecord = time < Math.min(...winningTimes);
      if (isNewRecord) {
        setIsNewRecord(`New Record!! Fastest Time: ${time} seconds`);
      }
    }
  }, [tenzie]);

  React.useEffect(() => {
    const checkingHeld = dice.every((die) => die.isHeld);

    const firstValue = dice[0].value;

    const everyDiceValue = dice.every((die) => die.value === firstValue);
    // using local but not sure it works or not
    if (checkingHeld && everyDiceValue) {
      setTenzie(true);

      setIsRunning(false);
    }
  }, [dice]);

  function newDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function allDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(newDice());
    }
    return newArray;
  }

  const handler = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElements = dice.map((die) => {
    return (
      <Dice
        key={die.id}
        id={die.id}
        value={die.value}
        handler={() => handler(die.id)}
        isHeld={die.isHeld}
      />
    );
  });
  const rollNewGame = () => {
    setDice(allDice);
    setTenzie(false);
    setButtonCount(0);

    setTime(0);
  };
  const rollDice = () => {
    // setDice(allDice());
    setButtonCount((preState) => preState + 1);

    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld === true ? die : newDice();
      })
    );
  };

  //The way to get item from local , I was looking to get the time and shows on the screen if it is the fastest time to win the game

  const gameStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setButtonCount(0);
    }
  };
  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }
  return (
    <main className={darkMode ? "dark" : ""}>
      {tenzie && <Confetti width={"1040px"} />}
      <h1>
        T<span className="E">e</span>nzies
      </h1>
      <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider" onClick={toggleDarkMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
      <p className={darkMode ? "instructions" : "instructionsDark"}>
        Roll <span className="until">until</span> all dice are the same
      </p>
      <div className="diceContainer">{diceElements}</div>
      <div className="buttonDiv">
        {tenzie ? (
          <button className="roll-dice" onClick={rollNewGame}>
            New Game
          </button>
        ) : (
          <button className="roll-dice" onClick={rollDice}>
            Roll
          </button>
        )}
        <button className="startButton" onClick={gameStart}>
          Start
        </button>
      </div>
      <div className="countDiv">{`The Count Of Roll Dice:  ${buttonCount}`}</div>
      <div className="timeDiv">
        {winningTimes.length > 1 && <div>{newRecord}</div>}
      </div>
    </main>
  );
}
export default App;

//Error in time and localstorage
