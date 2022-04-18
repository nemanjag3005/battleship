import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlayerFleet from "./PlayerFleet";
import PlayerBoard from "./PlayerBoard";
import ComputerBoard from "./ComputerBoard";
import PlayerStats from "./PlayerStats";

const GameView = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  startTurn,
  computerShips,
  gameState,
  changeTurn,
  hitByComputer,
  setHitsByPlayer,
  hitsByPlayer,
  hitsByComputer,
  handleComputerTurn,
  checkIfGameOver,
  winner,
  startAgain,
  setComputerShips,
}) => {
  return (
    <View>
      {gameState !== "placement" ? (
        <PlayerStats
          gameState={gameState}
          hitsByComputer={hitsByComputer}
          hitsByPlayer={hitsByPlayer}
          winner={winner}
          startAgain={startAgain}
        />
      ) : (
        <PlayerFleet
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
          startTurn={startTurn}
          startAgain={startAgain}
        />
      )}
      <PlayerBoard
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
        hitsByComputer={hitsByComputer}
      />
      <ComputerBoard
        computerShips={computerShips}
        changeTurn={changeTurn}
        gameState={gameState}
        hitComputer={hitByComputer}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        setComputerShips={setComputerShips}
      />
    </View>
  );
};

export default GameView;

const styles = StyleSheet.create({});
