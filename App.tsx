import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import Game from "./Components/Game/Game";
import Constants from "expo-constants";

export default function App() {
  const handleLogIn = () => {};
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
});
