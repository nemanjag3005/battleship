import { Button, Pressable, StyleSheet, Text, View } from "react-native";
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
      <Pressable
        key={`comp-square-${index}`}
        onPress={() => {
          if (playerCanFire && !alreadyHit(index)) {
            const newHits = fireTorpedo(index);
            const shipsWithSunkFlag = updateSunkShips(newHits, computerShips);
            setComputerShips(shipsWithSunkFlag);
            handleComputerTurn();
          }
        }}
      >
        <View
          style={
            stateToClass[square] === "empty"
              ? styles.empty
              : stateToClass[square] === "ship"
              ? styles.ship
              : stateToClass[square] === "hit"
              ? styles.hit
              : stateToClass[square] === "miss"
              ? styles.miss
              : styles.sunk
          }
        ></View>
      </Pressable>
    );
  });
  return (
    <View>
      <Text style={styles.text}>Computer</Text>
      <View style={styles.board}>{compSquares}</View>
    </View>
  );
};

export default ComputerBoard;

const styles = StyleSheet.create({
  board: {
    width: 400,
    height: 400,
    borderWidth: 1,
    margin: 1,
    borderColor: "gray",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  empty: {
    width: 39.8,
    height: 39.8,
    borderWidth: 1,
    backgroundColor: "#fafafa",
    borderColor: "lightgray",
  },
  hit: {
    width: 39.8,
    height: 39.8,
    borderWidth: 1,
    backgroundColor: "red",
    borderColor: "lightgray",
  },
  miss: {
    width: 39.8,
    height: 39.8,
    borderWidth: 1,
    backgroundColor: "gray",
    borderColor: "lightgray",
  },
  ship: {
    width: 39.8,
    height: 39.8,
    borderWidth: 1,
    backgroundColor: "#fafafa",
    borderColor: "lightgray",
  },
  sunk: {
    width: 39.8,
    height: 39.8,
    borderWidth: 1,
    backgroundColor: "darkgray",
    borderColor: "lightgray",
  },
  text: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 10,
  },
});
