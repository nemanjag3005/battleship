import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  SQUARE_STATE,
  stateToClass,
  generateEmptyLayout,
  placeEntityinLayout,
  indexToCoords,
  calculateOverhang,
  canBePlaced,
} from "./Helpers/layoutHelper";

const PlayerBoard = ({
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  hitsByComputer,
}) => {
  // Player ships on empty layout
  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      placeEntityinLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );
  // Hits by computer
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

  const isPlacingOverBoard =
    currentlyPlacing && currentlyPlacing.position != null;
  const canPlaceCurrentShip =
    isPlacingOverBoard && canBePlaced(currentlyPlacing, layout);

  if (isPlacingOverBoard) {
    if (canPlaceCurrentShip) {
      layout = placeEntityinLayout(layout, currentlyPlacing, SQUARE_STATE.ship);
    } else {
      let forbiddenShip = {
        ...currentlyPlacing,
        length: currentlyPlacing.length - calculateOverhang(currentlyPlacing),
      };
      layout = placeEntityinLayout(
        layout,
        forbiddenShip,
        SQUARE_STATE.forbidden
      );
    }
  }
  let squares = layout.map((square, index) => {
    return (
      <Pressable
        key={`square-${index}`}
        onPress={() => {
          if (currentlyPlacing) {
            setCurrentlyPlacing({
              ...currentlyPlacing,
              position: indexToCoords(index),
            });
          }
          if (canPlaceCurrentShip) {
            placeShip(currentlyPlacing);
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
      <Text style={styles.text}>You</Text>
      <View style={styles.board}>{squares}</View>
    </View>
  );
};

export default PlayerBoard;

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
    backgroundColor: "blue",
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
