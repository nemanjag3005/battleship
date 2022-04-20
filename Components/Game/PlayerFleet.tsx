import { Button, StyleSheet, Text, View } from "react-native";
import ShipBox from "./ShipBox";
import React from "react";

const PlayerFleet = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  startTurn,
  startAgain,
}) => {
  let shipsLeft = availableShips.map((ship) => ship.name);
  let shipShipBoxes = shipsLeft.map((shipName) => (
    <ShipBox
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={
        currentlyPlacing && currentlyPlacing.name === shipName
      }
      shipName={shipName}
      availableShips={availableShips}
    />
  ));
  let fleet = (
    <View>
      {shipShipBoxes}
      <Button onPress={startAgain} title="Restart" />
    </View>
  );
  let playButton = (
    <View>
      <Text style={styles.text}>Ships are in formation.</Text>
      <Button onPress={startTurn} title="Start Game" />
    </View>
  );
  return (
    <View>
      <Text style={styles.text}>Your Ships</Text>
      {availableShips.length > 0 ? fleet : playButton}
    </View>
  );
};

export default PlayerFleet;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    paddingBottom: 7,
    paddingTop: 10,
  },
});
