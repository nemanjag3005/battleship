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
  let allShipSquares = shipLength.map((item, index) => (
    <View key={index} style={styles.smallsquare} />
  ));
  return (
    <Pressable onPress={() => selectShip(shipName)}>
      <View
        key={`${shipName}`}
        style={isCurrentlyPlacing ? styles.shipplacing : styles.ship}
      >
        <Text style={styles.shiptitle}>{shipName}</Text>
        <View style={styles.shipsquares}>{allShipSquares}</View>
      </View>
    </Pressable>
  );
};

export default ShipBox;

const styles = StyleSheet.create({
  smallsquare: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "yellow",
  },
  shipplacing: {
    backgroundColor: "skyblue",
    width: 150,
    height: 35,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 3,
    padding: 5,
    marginTop: 5,
    flexDirection: "row",
  },
  ship: {
    width: 150,
    height: 35,
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-between",
    backgroundColor: "blue",
    borderRadius: 3,
    padding: 5,
    flexDirection: "row",
  },
  shiptitle: {
    fontSize: 14,
    textTransform: "capitalize",
    color: "white",
  },
  shipsquares: {
    flex: 1,
    marginLeft: 5,
    flexDirection: "row",
  },
});
