import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const LogInScreen = ({ startPlay }) => {
  return (
    <View>
      <Text>Battleship</Text>
      <Button onPress={startPlay} title="Play" />
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
