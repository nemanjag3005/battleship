import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ShipBox = ({
  shipName,
  selectShip,
  availableShips,
  isCurrentlyPlacing,
}) => {
  let ship = availableShips.find((item) => item.name === shipName);
  let shipLength = new Array(ship.length).fill("ship");
  let allShipSquares = shipLength.map((item, index) => <View key={index} />);
  return (
    <Pressable onPress={() => selectShip(shipName)}>
      <View key={`${shipName}`} ref={`${shipName}-ship`}>
        <Text>{shipName}</Text>
        <View>{allShipSquares}</View>
      </View>
    </Pressable>
  );
};

export default ShipBox;

const styles = StyleSheet.create({});
