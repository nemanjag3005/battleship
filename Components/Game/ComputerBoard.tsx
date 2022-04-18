import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  stateToClass,
  generateEmptyLayout,
  placeEntityinLayout,
  SQUARE_STATE,
  indexToCoords,
  updateSunkShips,
} from "./Helpers/layoutHelper";

const ComputerBoard = ({
  computerShips,
  gameState,
  hitsByPlayer,
  setHitsByPlayer,
  handleComputerTurn,
  checkIfGameOver,
  setComputerShips,
}) => {
  let compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      placeEntityinLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );
  compLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      placeEntityinLayout(prevLayout, currentHit, currentHit.type),
    compLayout
  );
  compLayout = computerShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? placeEntityinLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    compLayout
  );
  const fireTorpedo = (index) => {
    if (compLayout[index] === "ship") {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (compLayout[index] === "empty") {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss,
        },
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };
  const playerTurn = gameState === "player-turn";
  const playerCanFire = playerTurn && !checkIfGameOver();
  let alreadyHit = (index) =>
    compLayout[index] === "hit" ||
    compLayout[index] === "miss" ||
    compLayout[index] === "ship-sunk";

  let compSquares = compLayout.map((square, index) => {
    return (
      <Button
        key={`comp-square-${index}`}
        ref={`comp-square-${index}`}
        onPress={() => {
          if (playerCanFire && !alreadyHit(index)) {
            const newHits = fireTorpedo(index);
            const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
            setComputerShips(shipsWithSunkFlag);
            handleComputerTurn();
          }
        }}
      />
    );
  });
  return (
    <View>
      <Text>Computer</Text>
      <View>{compSquares}</View>
    </View>
  );
};

export default ComputerBoard;

const styles = StyleSheet.create({});
