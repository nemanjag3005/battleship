import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShipBox from "../ShipBox";

const getShip = (availableShips, shipName, selectShip) => {
  let ship = availableShips.find((item) => item.name === shipName);
  let shipLength = new Array(ship.length).fill("ship");
  let allShipSquares = shipLength.map((item, index) => <View key={index} />);
  return (
    <ShipBox
      key={shipName}
      selectShip={selectShip}
      shipName={shipName}
      squares={allShipSquares}
    />
  );
};

export default getShip;

const styles = StyleSheet.create({});
