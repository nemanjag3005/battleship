import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const PlayerStats = ({
  gameState,
  hitsByPlayer,
  hitsByComputer,
  startAgain,
  winner,
}) => {
  let numberOfHits = hitsByPlayer.length;
  let numberOfSuccessfulHits = hitsByPlayer.filter(
    (hit) => hit.type === "hit"
  ).length;
  let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));
  let successfulComputerHits = hitsByComputer.filter(
    (hit) => hit.type === "hit"
  ).length;

  let gameOverPanel = (
    <>
      <Text>Game Over!</Text>
      <Text>{winner === "player" ? "You win! 🎉" : "You lose 😭."}</Text>
      <Button onPress={startAgain} title="Play Again?" />
    </>
  );
  let statsPanel = (
    <>
      <Text>Stats</Text>
      <View>
        <View>
          <Text>{numberOfSuccessfulHits} successful hits</Text>
          <Text>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} accuracy</Text>
        </View>
        <Text>The first to sink all 5 opponent ships wins.</Text>
        <Button onPress={startAgain} title="Restart" />
      </View>
    </>
  );
  return (
    <View>
      {numberOfSuccessfulHits === 17 || successfulComputerHits === 17
        ? gameOverPanel
        : statsPanel}
    </View>
  );
};

export default PlayerStats;

const styles = StyleSheet.create({});
