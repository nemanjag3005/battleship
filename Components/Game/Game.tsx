import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import GameView from "./GameView";
import {
  placeAllComputerShips,
  SQUARE_STATE,
  indexToCoords,
  placeEntityinLayout,
  generateEmptyLayout,
  generateRandomIndex,
  getNeighbors,
  updateSunkShips,
  coordsToIndex,
} from "./Helpers/layoutHelper";

const AVAILABLE_SHIPS = [
  {
    name: "carrier",
    length: 4,
    placed: null,
  },
  {
    name: "battleship",
    length: 3,
    placed: null,
  },
  {
    name: "submarine",
    length: 3,
    placed: null,
  },
  {
    name: "cruiser",
    length: 2,
    placed: null,
  },
  {
    name: "cruiser 2",
    length: 2,
    placed: null,
  },
  {
    name: "cruiser 3",
    length: 2,
    placed: null,
  },
  {
    name: "destroyer",
    length: 1,
    placed: null,
  },
  {
    name: "destroyer 2",
    length: 1,
    placed: null,
  },
  {
    name: "destroyer 3",
    length: 1,
    placed: null,
  },
  {
    name: "destroyer 4",
    length: 1,
    placed: null,
  },
];

const Game = () => {
  const [gameState, setGameState] = useState("placement");
  const [winner, setWinner] = useState(null);
  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  const [placedShips, setPlacedShips] = useState([]);
  const [availableShips, setAvailableShips] = useState(AVAILABLE_SHIPS);
  const [computerShips, setComputerShips] = useState([]);
  const [hitsByPlayer, setHitsByPlayer] = useState([]);
  const [hitsByComputer, setHitsByComputer] = useState([]);

  const selectShip = (shipName) => {
    let shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
    const shipToPlace = availableShips[shipIdx];

    setCurrentlyPlacing({
      ...shipToPlace,
      orientation: "horizontal",
      position: null,
    });
  };
  const placeShip = (currentlyPlacing) => {
    setPlacedShips([
      ...placedShips,
      {
        ...currentlyPlacing,
        placed: true,
      },
    ]);

    setAvailableShips((previousShips) =>
      previousShips.filter((ship) => ship.name !== currentlyPlacing.name)
    );

    setCurrentlyPlacing(null);
  };

  // const rotateShip = (event) => {
  //   if (currentlyPlacing != null && event.button === 2)
  // }
  const startTurn = () => {
    generateComputerShips();
    setGameState("player-turn");
  };
  const changeTurn = () => {
    setGameState((oldGameState) =>
      oldGameState === "player-turn" ? "computer-turn" : "player-turn"
    );
  };

  const generateComputerShips = () => {
    let placedComputerShips = placeAllComputerShips(AVAILABLE_SHIPS.slice());
    setComputerShips(placedComputerShips);
  };

  const computerFire = (index, layout) => {
    let computerHits;

    if (layout[index] === "ship") {
      computerHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
    }
    if (layout[index] === "empty") {
      computerHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
    }
    const sunkShips = updateSunkShips(computerHits, placedShips);
    setPlacedShips(sunkShips);
    setHitsByComputer(computerShips);
  };
  const handleComputerTurn = () => {
    changeTurn();
    if (checkIfGameOver()) {
      return;
    }
    let layout = placedShips.reduce(
      (prevLayout, currentShip) =>
        placeEntityinLayout(prevLayout, currentShip, SQUARE_STATE.ship),
      generateEmptyLayout()
    );
    layout = hitsByComputer.reduce(
      (prevLayout, currentHit) =>
        placeEntityinLayout(prevLayout, currentHit, currentHit.type),
      layout
    );
    layout = placedShips.reduce(
      (prevLayout, currentShip) =>
        currentShip.sunk
          ? placeEntityinLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
          : prevLayout,
      layout
    );

    let successfulComputerHits = hitsByComputer.filter(
      (hit) => hit.type === "hit"
    );

    let nonSunkComputerHits = successfulComputerHits.filter((hit) => {
      const hitIndex = coordsToIndex(hit.position);
      return layout[hitIndex] === "hit";
    });

    let potentialTargets = nonSunkComputerHits
      .flatMap((hit) => getNeighbors(hit.position))
      .filter((idx) => layout[idx] === "empty" || layout[idx] === "ship");

    if (potentialTargets.length === 0) {
      let layoutIndices = layout.map((item, idx) => idx);
      potentialTargets = layoutIndices.filter(
        (index) => layout[index] === "ship" || layout[index] === "empty"
      );
    }

    let randomIndex = generateRandomIndex(potentialTargets.length);

    let target = potentialTargets[randomIndex];

    setTimeout(() => {
      computerFire(target, layout);
      changeTurn();
    }, 300);
  };

  const checkIfGameOver = () => {
    let successfulPlayerHits = hitsByPlayer.filter(
      (hit) => hit.type === "hit"
    ).length;
    let successfulComputerHits = hitsByComputer.filter(
      (hit) => hit.type === "hit"
    ).length;

    if (successfulComputerHits === 20 || successfulPlayerHits === 20) {
      setGameState("game-over");

      if (successfulComputerHits === 20) {
        setWinner("computer");
      }
      if (successfulPlayerHits === 20) {
        setWinner("player");
      }

      return true;
    }
    return false;
  };

  const startAgain = () => {
    setGameState("placement");
    setWinner(null);
    setCurrentlyPlacing(null);
    setPlacedShips([]);
    setAvailableShips(AVAILABLE_SHIPS);
    setComputerShips([]);
    setHitsByPlayer([]);
    setHitsByComputer([]);
  };

  return (
    <GameView
      availableShips={availableShips}
      selectShip={selectShip}
      currentlyPlacing={currentlyPlacing}
      setCurrentlyPlacing={setCurrentlyPlacing}
      // rotateShip={rotateShip}
      placeShip={placeShip}
      placedShips={placedShips}
      startTurn={startTurn}
      computerShips={computerShips}
      gameState={gameState}
      changeTurn={changeTurn}
      hitsByPlayer={hitsByPlayer}
      setHitsByPlayer={setHitsByPlayer}
      hitsByComputer={hitsByComputer}
      setHitsByComputer={setHitsByComputer}
      handleComputerTurn={handleComputerTurn}
      checkIfGameOver={checkIfGameOver}
      startAgain={startAgain}
      winner={winner}
      setComputerShips={setComputerShips}
    />
  );
};

export default Game;

const styles = StyleSheet.create({});
