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
        onPress={() => {
          if (canPlaceCurrentShip) {
            placeShip(currentlyPlacing);
          }
        }}
      >
        <View style={styles.square} key={`square-${index}`}></View>
      </Pressable>
    );
  });
  return (
    <View>
      <Text>You</Text>
      <View style={styles.board}>{squares}</View>
    </View>
  );
};

export default PlayerBoard;

const styles = StyleSheet.create({
  board: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "gray",
    flex: 1,
    flexWrap: "wrap",
  },
  square: {
    width: "10%",
    height: "10%",
  },
});
